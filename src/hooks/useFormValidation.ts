
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface FieldConfig {
  [fieldName: string]: ValidationRule;
}

interface ValidationError {
  field: string;
  message: string;
}

export const useFormValidation = (fieldConfigs: FieldConfig) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((fieldName: string, value: string): string | null => {
    const config = fieldConfigs[fieldName];
    if (!config) return null;

    if (config.required && (!value || value.trim() === '')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    if (config.minLength && value.length < config.minLength) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${config.minLength} characters`;
    }

    if (config.maxLength && value.length > config.maxLength) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be no more than ${config.maxLength} characters`;
    }

    if (config.pattern && !config.pattern.test(value)) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} format is invalid`;
    }

    if (config.custom && !config.custom(value)) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is invalid`;
    }

    return null;
  }, [fieldConfigs]);

  const handleBlur = useCallback((fieldName: string, value: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error || ''
    }));
  }, [validateField]);

  const handleChange = useCallback((fieldName: string, value: string) => {
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  }, [errors]);

  const validateForm = useCallback((formData: Record<string, string>): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(fieldConfigs).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(fieldConfigs).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    return isValid;
  }, [fieldConfigs, validateField]);

  const showSuccessToast = useCallback((message: string = 'Saved successfully') => {
    toast({
      title: "Success",
      description: message,
      duration: 3000,
    });
  }, []);

  const showErrorToast = useCallback((message: string = 'Please fix the errors and try again') => {
    toast({
      title: "Validation Error",
      description: message,
      variant: "destructive",
      duration: 4000,
    });
  }, []);

  const getFieldProps = useCallback((fieldName: string) => ({
    hasError: touched[fieldName] && !!errors[fieldName],
    errorMessage: touched[fieldName] ? errors[fieldName] : '',
    onBlur: (value: string) => handleBlur(fieldName, value),
    onChange: (value: string) => handleChange(fieldName, value),
  }), [errors, touched, handleBlur, handleChange]);

  return {
    errors,
    touched,
    validateForm,
    getFieldProps,
    showSuccessToast,
    showErrorToast,
    hasErrors: Object.values(errors).some(error => error !== '')
  };
};

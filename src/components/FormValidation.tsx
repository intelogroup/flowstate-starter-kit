
import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  strongPassword?: boolean;
  custom?: (value: string) => string | null;
}

export interface FieldConfig {
  label: string;
  type: string;
  placeholder?: string;
  rules: ValidationRule;
}

export interface FormConfig<T> {
  [K in keyof T]: FieldConfig;
}

export const validators = {
  required: (value: string) => 
    !value || value.trim() === '' ? 'This field is required' : null,

  email: (value: string) => 
    value && !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email address' : null,

  minLength: (min: number) => (value: string) =>
    value && value.length < min ? `Must be at least ${min} characters long` : null,

  maxLength: (max: number) => (value: string) =>
    value && value.length > max ? `Must not exceed ${max} characters` : null,

  pattern: (pattern: RegExp, message: string) => (value: string) =>
    value && !pattern.test(value) ? message : null,

  strongPassword: (value: string) => {
    if (!value) return null;
    if (value.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
    return null;
  },

  confirmPassword: (originalPassword: string) => (value: string) =>
    value !== originalPassword ? 'Passwords do not match' : null,
};

export const useFormValidation = <T extends Record<string, string>>(
  config: FormConfig<T>,
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((fieldName: keyof T, value: string): string | null => {
    const fieldConfig = config[fieldName];
    const rules = fieldConfig.rules;

    // Required validation
    if (rules.required) {
      const error = validators.required(value);
      if (error) return error;
    }

    // Skip other validations if empty and not required
    if (!value) return null;

    // Email validation
    if (rules.email) {
      const error = validators.email(value);
      if (error) return error;
    }

    // Length validations
    if (rules.minLength) {
      const error = validators.minLength(rules.minLength)(value);
      if (error) return error;
    }

    if (rules.maxLength) {
      const error = validators.maxLength(rules.maxLength)(value);
      if (error) return error;
    }

    // Pattern validation
    if (rules.pattern) {
      const error = validators.pattern(rules.pattern, `Invalid ${fieldConfig.label.toLowerCase()}`)(value);
      if (error) return error;
    }

    // Strong password validation
    if (rules.strongPassword) {
      const error = validators.strongPassword(value);
      if (error) return error;
    }

    // Custom validation
    if (rules.custom) {
      const error = rules.custom(value);
      if (error) return error;
    }

    return null;
  }, [config]);

  const setValue = useCallback((fieldName: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((fieldName: keyof T) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate field on blur
    const error = validateField(fieldName, values[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error || undefined }));
  }, [validateField, values]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(config).forEach(fieldName => {
      const error = validateField(fieldName as keyof T, values[fieldName as keyof T]);
      if (error) {
        newErrors[fieldName as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(config).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return isValid;
  }, [config, validateField, values]);

  const handleSubmit = useCallback(
    async (
      onSubmit: (values: T) => Promise<void>,
      onSuccess?: () => void,
      onError?: (error: Error) => void
    ) => {
      if (isSubmitting) return;

      setIsSubmitting(true);
      
      try {
        const isValid = validateForm();
        if (!isValid) {
          setIsSubmitting(false);
          return;
        }

        await onSubmit(values);
        onSuccess?.();
      } catch (error) {
        onError?.(error as Error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, validateForm, values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateForm,
    handleSubmit,
    reset,
  };
};

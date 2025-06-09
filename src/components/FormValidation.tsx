
import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
  email?: boolean;
  strongPassword?: boolean;
}

interface FieldConfig {
  label: string;
  type?: string;
  placeholder?: string;
  rules?: ValidationRule;
}

interface FormFieldProps {
  name: string;
  config: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  showValidation?: boolean;
}

export const ValidatedFormField = ({
  name,
  config,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  showValidation = true
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = config.type === 'password';
  const hasError = !!error;
  const isValid = showValidation && !hasError && value.length > 0;

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={name}
        className={cn(
          "text-sm font-medium",
          hasError && "text-destructive",
          config.rules?.required && "after:content-['*'] after:ml-0.5 after:text-destructive"
        )}
      >
        {config.label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          type={isPassword ? (showPassword ? 'text' : 'password') : config.type || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          placeholder={config.placeholder}
          disabled={disabled}
          className={cn(
            "transition-colors",
            hasError && "border-destructive bg-destructive/5 focus:border-destructive focus-visible:ring-destructive",
            isValid && "border-green-500 bg-green-50 dark:bg-green-950/20",
            isFocused && !hasError && "border-primary focus-visible:ring-primary"
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
        
        {/* Password visibility toggle */}
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </Button>
        )}
        
        {/* Validation indicator */}
        {showValidation && value.length > 0 && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {hasError ? (
              <AlertTriangle className="h-4 w-4 text-destructive" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {hasError && (
        <div id={`${name}-error`} className="flex items-center gap-2 text-sm text-destructive">
          <AlertTriangle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Validation utility functions
export const validators = {
  required: (value: string) => 
    value.trim() ? null : 'This field is required',
    
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },
  
  minLength: (min: number) => (value: string) =>
    value.length >= min ? null : `Must be at least ${min} characters`,
    
  strongPassword: (value: string) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
    if (!/\d/.test(value)) return 'Password must contain a number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain a special character';
    return null;
  },
  
  confirmPassword: (password: string) => (value: string) =>
    value === password ? null : 'Passwords do not match'
};

// Form validation hook
export const useFormValidation = <T extends Record<string, any>>(
  fields: Record<keyof T, FieldConfig>,
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: keyof T, value: string): string | null => {
    const rules = fields[name]?.rules;
    if (!rules) return null;

    if (rules.required && validators.required(value)) {
      return validators.required(value);
    }

    if (rules.email && value && validators.email(value)) {
      return validators.email(value);
    }

    if (rules.minLength && value && validators.minLength(rules.minLength)(value)) {
      return validators.minLength(rules.minLength)(value);
    }

    if (rules.strongPassword && value && validators.strongPassword(value)) {
      return validators.strongPassword(value);
    }

    if (rules.custom && value) {
      return rules.custom(value);
    }

    return null;
  }, [fields]);

  const setValue = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error || undefined }));
  }, [validateField, values]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(fields).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return isValid;
  }, [fields, validateField, values]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void,
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) => {
    setIsSubmitting(true);
    
    try {
      if (validateForm()) {
        await onSubmit(values);
        onSuccess?.();
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateForm,
    handleSubmit,
    hasErrors: Object.values(errors).some(error => !!error)
  };
};

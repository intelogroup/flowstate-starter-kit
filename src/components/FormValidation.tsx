
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Field configuration types
export interface FieldConfig {
  label: string;
  type: string;
  placeholder?: string;
  rules: ValidationRules;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  strongPassword?: boolean;
  custom?: (value: string) => string | null;
}

// Validation helper functions
export const validators = {
  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },

  strongPassword: (value: string): string | null => {
    if (value.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
    return null;
  },

  confirmPassword: (originalPassword: string) => (value: string): string | null => {
    return value === originalPassword ? null : 'Passwords do not match';
  }
};

// Form validation hook
export const useFormValidation = <T extends Record<string, any>>(
  fieldConfigs: Record<keyof T, FieldConfig>,
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((fieldName: keyof T, value: string): string | null => {
    const config = fieldConfigs[fieldName];
    if (!config) return null;

    const { rules } = config;

    if (rules.required && (!value || value.trim() === '')) {
      return `${config.label} is required`;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `${config.label} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${config.label} must be no more than ${rules.maxLength} characters`;
    }

    if (rules.email && value) {
      return validators.email(value);
    }

    if (rules.strongPassword && value) {
      return validators.strongPassword(value);
    }

    if (rules.custom && value) {
      return rules.custom(value);
    }

    return null;
  }, [fieldConfigs]);

  const setValue = useCallback((fieldName: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((fieldName: keyof T) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, values[fieldName] || '');
    setErrors(prev => ({ ...prev, [fieldName]: error || undefined }));
  }, [validateField, values]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(fieldConfigs).forEach(fieldName => {
      const error = validateField(fieldName as keyof T, values[fieldName as keyof T] || '');
      if (error) {
        newErrors[fieldName as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(fieldConfigs).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    return isValid;
  }, [fieldConfigs, validateField, values]);

  const handleSubmit = useCallback(
    async (
      onSubmit: (data: T) => Promise<void>,
      onSuccess?: () => void,
      onError?: (error: Error) => void
    ) => {
      if (isSubmitting) return;

      setIsSubmitting(true);

      try {
        const isValid = validateForm();
        
        if (!isValid) {
          toast({
            title: "Validation Error",
            description: "Please fix the errors and try again",
            variant: "destructive",
            duration: 4000,
          });
          return;
        }

        await onSubmit(values);
        
        toast({
          title: "Success",
          description: "Form submitted successfully",
          duration: 3000,
        });
        
        onSuccess?.();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
          duration: 5000,
        });
        
        onError?.(error instanceof Error ? error : new Error(errorMessage));
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, validateForm, values]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    validateForm
  };
};

// Original FormValidation demo component
const FormValidation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast({
        title: "Success",
        description: "Form submitted successfully",
        duration: 3000,
      });
      console.log('Form submitted successfully');
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Form Validation Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormValidation;

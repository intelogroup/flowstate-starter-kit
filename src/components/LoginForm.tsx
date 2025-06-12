import { useState } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessibleFormField } from './AccessibleFormField';
import { useEnhancedAlerts, supabaseAlertHelpers } from './EnhancedAlertSystem';
import { secureAuthService } from '@/shared/services/secureAuthService';
import { secureValidation } from '@/shared/utils/secureValidation';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: (user: any) => void;
  onForgotPassword?: () => void;
  onSignUpRedirect?: () => void;
}

export const LoginForm = ({ 
  onSuccess, 
  onForgotPassword, 
  onSignUpRedirect 
}: LoginFormProps) => {
  const { addAlert } = useEnhancedAlerts();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LoginFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldConfigs = {
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email address',
      rules: { required: true, email: true }
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      rules: { required: true, minLength: 6 }
    }
  };

  const validateField = (fieldName: keyof LoginFormData, value: string) => {
    let validation;
    
    switch (fieldName) {
      case 'email':
        validation = secureValidation.validateEmail(value);
        break;
      case 'password':
        validation = secureValidation.validateRequired(value, 'Password');
        break;
      default:
        return null;
    }

    return validation.isValid ? null : validation.errors[0];
  };

  const handleFieldChange = (fieldName: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleFieldBlur = (fieldName: keyof LoginFormData) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, formData[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error || undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof LoginFormData>).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Rate limiting check
    if (!secureValidation.checkRateLimit('login', formData.email, 5, 15 * 60 * 1000)) {
      addAlert({
        type: 'error',
        title: 'Too Many Attempts',
        message: 'Too many login attempts. Please try again in 15 minutes.',
        source: 'validation'
      });
      return;
    }

    if (!validateForm()) {
      addAlert({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the errors and try again',
        source: 'validation'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await secureAuthService.login({
        email: formData.email,
        password: formData.password
      });

      addAlert(supabaseAlertHelpers.authSuccess('Login'));
      onSuccess?.(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      addAlert(supabaseAlertHelpers.authError('Login', errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-semibold text-center tracking-tight">
          Welcome back
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Enter your credentials to access your account
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <AccessibleFormField
            name="email"
            config={fieldConfigs.email}
            value={formData.email}
            onChange={(value) => handleFieldChange('email', value)}
            onBlur={() => handleFieldBlur('email')}
            error={touched.email ? errors.email : undefined}
            disabled={isSubmitting}
          />

          <AccessibleFormField
            name="password"
            config={fieldConfigs.password}
            value={formData.password}
            onChange={(value) => handleFieldChange('password', value)}
            onBlur={() => handleFieldBlur('password')}
            error={touched.password ? errors.password : undefined}
            disabled={isSubmitting}
          />

          <div className="flex items-center justify-between pt-2">
            <EnhancedButton
              type="button"
              variant="link"
              size="sm"
              onClick={onForgotPassword}
              className="px-0 text-sm h-auto"
              disabled={isSubmitting}
            >
              Forgot password?
            </EnhancedButton>
          </div>

          <EnhancedButton
            type="submit"
            className="w-full"
            loading={isSubmitting}
            loadingText="Signing in..."
            disabled={isSubmitting}
          >
            Sign in
          </EnhancedButton>

          <div className="text-center pt-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground">
              Don't have an account?{' '}
            </span>
            <EnhancedButton
              type="button"
              variant="link"
              size="sm"
              onClick={onSignUpRedirect}
              className="px-0 text-sm h-auto"
              disabled={isSubmitting}
            >
              Sign up
            </EnhancedButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

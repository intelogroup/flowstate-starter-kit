import { useState } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessibleFormField } from './AccessibleFormField';
import { GoogleSignInButton } from './GoogleSignInButton';
import { useEnhancedAlerts, supabaseAlertHelpers } from './EnhancedAlertSystem';
import { supabaseAuthService } from '@/shared/services/supabaseAuthService';
import { secureValidation } from '@/shared/utils/secureValidation';

interface RegistrationFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationFormProps {
  onSuccess?: (user: any) => void;
  onLoginRedirect?: () => void;
}

export const RegistrationForm = ({ 
  onSuccess, 
  onLoginRedirect 
}: RegistrationFormProps) => {
  const { addAlert } = useEnhancedAlerts();
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegistrationFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; feedback: string }>({ score: 0, feedback: '' });

  const fieldConfigs = {
    fullName: {
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      rules: { required: true, minLength: 2 }
    },
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email address',
      rules: { required: true, email: true }
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Create a strong password (min 12 characters)',
      rules: { required: true, strongPassword: true }
    },
    confirmPassword: {
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      rules: { required: true }
    }
  };

  const calculatePasswordStrength = (password: string): { score: number; feedback: string } => {
    if (!password) return { score: 0, feedback: '' };

    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    else feedback.push('Use at least 12 characters');

    // Character variety
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Add numbers');

    if (/[!@#$%^&*(),.?":{}|<>[\]\\\/`~_+=\-]/.test(password)) score += 1;
    else feedback.push('Add special characters');

    // Avoid common patterns
    if (!/(.)\1{2,}/.test(password)) score += 1;
    else feedback.push('Avoid repeated characters');

    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthLabel = strengthLabels[Math.min(score, 5)] || 'Very Weak';

    return {
      score,
      feedback: feedback.length > 0 ? `${strengthLabel}: ${feedback.join(', ')}` : `${strengthLabel}`
    };
  };

  const validateField = (fieldName: keyof RegistrationFormData, value: string) => {
    let validation;
    
    switch (fieldName) {
      case 'fullName':
        validation = secureValidation.validateName(value);
        break;
      case 'email':
        validation = secureValidation.validateEmail(value);
        break;
      case 'password':
        validation = secureValidation.validatePassword(value);
        if (validation.isValid) {
          const strength = calculatePasswordStrength(value);
          setPasswordStrength(strength);
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          validation = { isValid: false, errors: ['Passwords do not match'] };
        } else {
          validation = { isValid: true, errors: [] };
        }
        break;
      default:
        return null;
    }

    return validation.isValid ? null : validation.errors[0];
  };

  const handleFieldChange = (fieldName: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Update password strength in real-time
    if (fieldName === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
    
    // Re-validate confirm password if password changes
    if (fieldName === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError || undefined }));
    }
  };

  const handleFieldBlur = (fieldName: keyof RegistrationFormData) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, formData[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error || undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationFormData> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof RegistrationFormData>).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    console.log('TEST-001: Registration form submitted with:', { email: formData.email, fullName: formData.fullName });

    // Rate limiting check
    if (!secureValidation.checkRateLimit('signup', formData.email, 3, 60 * 60 * 1000)) {
      addAlert({
        type: 'error',
        title: 'Too Many Attempts',
        message: 'Too many signup attempts. Please try again in 1 hour.',
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
      console.log('TEST-001: Attempting Supabase signup...');
      const user = await supabaseAuthService.signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.fullName.split(' ')[0],
        lastName: formData.fullName.split(' ').slice(1).join(' ')
      });

      console.log('TEST-001: Signup successful:', user);
      addAlert(supabaseAlertHelpers.authSuccess('Registration'));
      onSuccess?.(user);
    } catch (error) {
      console.error('TEST-001: Signup error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      addAlert(supabaseAlertHelpers.authError('Registration', errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = (score: number): string => {
    if (score <= 1) return 'text-red-600';
    if (score <= 2) return 'text-orange-600';
    if (score <= 3) return 'text-yellow-600';
    if (score <= 4) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-semibold text-center tracking-tight">
          Create your account
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Enter your information to get started
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <GoogleSignInButton 
          text="Sign up with Google" 
          disabled={isSubmitting} 
        />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <AccessibleFormField
            name="fullName"
            config={fieldConfigs.fullName}
            value={formData.fullName}
            onChange={(value) => handleFieldChange('fullName', value)}
            onBlur={() => handleFieldBlur('fullName')}
            error={touched.fullName ? errors.fullName : undefined}
            disabled={isSubmitting}
          />

          <AccessibleFormField
            name="email"
            config={fieldConfigs.email}
            value={formData.email}
            onChange={(value) => handleFieldChange('email', value)}
            onBlur={() => handleFieldBlur('email')}
            error={touched.email ? errors.email : undefined}
            disabled={isSubmitting}
          />

          <div className="space-y-2">
            <AccessibleFormField
              name="password"
              config={fieldConfigs.password}
              value={formData.password}
              onChange={(value) => handleFieldChange('password', value)}
              onBlur={() => handleFieldBlur('password')}
              error={touched.password ? errors.password : undefined}
              disabled={isSubmitting}
            />
            {formData.password && (
              <div className={`text-xs ${getPasswordStrengthColor(passwordStrength.score)}`}>
                {passwordStrength.feedback}
              </div>
            )}
          </div>

          <AccessibleFormField
            name="confirmPassword"
            config={fieldConfigs.confirmPassword}
            value={formData.confirmPassword}
            onChange={(value) => handleFieldChange('confirmPassword', value)}
            onBlur={() => handleFieldBlur('confirmPassword')}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            disabled={isSubmitting}
          />

          <EnhancedButton
            type="submit"
            className="w-full"
            loading={isSubmitting}
            loadingText="Creating account..."
            disabled={isSubmitting}
          >
            Create account
          </EnhancedButton>

          <div className="text-center pt-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground">
              Already have an account?{' '}
            </span>
            <EnhancedButton
              type="button"
              variant="link"
              size="sm"
              onClick={onLoginRedirect}
              className="px-0 text-sm h-auto"
              disabled={isSubmitting}
            >
              Sign in
            </EnhancedButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

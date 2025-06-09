
import { useState } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessibleFormField } from './AccessibleFormField';
import { useFormValidation, validators } from './FormValidation';
import { useEnhancedAlerts, supabaseAlertHelpers } from './EnhancedAlertSystem';

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

  const fieldConfigs = {
    fullName: {
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      rules: {
        required: true,
        minLength: 2
      }
    },
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email address',
      rules: {
        required: true,
        email: true
      }
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Create a strong password',
      rules: {
        required: true,
        strongPassword: true
      }
    },
    confirmPassword: {
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      rules: {
        required: true,
        custom: (value: string) => 
          validators.confirmPassword(values.password)(value)
      }
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit
  } = useFormValidation<RegistrationFormData>(fieldConfigs, {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegistration = async (formData: RegistrationFormData) => {
    // This will be connected to Supabase auth
    console.log('Registration attempt with:', { 
      fullName: formData.fullName,
      email: formData.email 
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success for demo
    addAlert(supabaseAlertHelpers.authSuccess('Registration'));
    onSuccess?.({ 
      email: formData.email, 
      fullName: formData.fullName 
    });
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              handleRegistration,
              () => console.log('Registration successful'),
              (error) => console.error('Registration failed:', error)
            );
          }}
          className="space-y-5"
          noValidate
        >
          <AccessibleFormField
            name="fullName"
            config={fieldConfigs.fullName}
            value={values.fullName}
            onChange={(value) => setValue('fullName', value)}
            onBlur={() => setFieldTouched('fullName')}
            error={touched.fullName ? errors.fullName : undefined}
            disabled={isSubmitting}
          />

          <AccessibleFormField
            name="email"
            config={fieldConfigs.email}
            value={values.email}
            onChange={(value) => setValue('email', value)}
            onBlur={() => setFieldTouched('email')}
            error={touched.email ? errors.email : undefined}
            disabled={isSubmitting}
          />

          <AccessibleFormField
            name="password"
            config={fieldConfigs.password}
            value={values.password}
            onChange={(value) => setValue('password', value)}
            onBlur={() => setFieldTouched('password')}
            error={touched.password ? errors.password : undefined}
            disabled={isSubmitting}
          />

          <AccessibleFormField
            name="confirmPassword"
            config={fieldConfigs.confirmPassword}
            value={values.confirmPassword}
            onChange={(value) => setValue('confirmPassword', value)}
            onBlur={() => setFieldTouched('confirmPassword')}
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

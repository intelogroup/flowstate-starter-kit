
import { useState } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessibleFormField } from './AccessibleFormField';
import { useFormValidation, validators } from './FormValidation';
import { useEnhancedAlerts, supabaseAlertHelpers } from './EnhancedAlertSystem';

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

  const fieldConfigs = {
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
      placeholder: 'Enter your password',
      rules: {
        required: true,
        minLength: 6
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
  } = useFormValidation<LoginFormData>(fieldConfigs, {
    email: '',
    password: ''
  });

  const handleLogin = async (formData: LoginFormData) => {
    // This will be connected to Supabase auth
    console.log('Login attempt with:', { email: formData.email });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success/error for demo
    if (formData.email === 'demo@example.com' && formData.password === 'password') {
      addAlert(supabaseAlertHelpers.authSuccess('Login'));
      onSuccess?.({ email: formData.email });
    } else {
      addAlert(supabaseAlertHelpers.authError('Login', 'Invalid email or password'));
      throw new Error('Invalid credentials');
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              handleLogin,
              () => console.log('Login successful'),
              (error) => console.error('Login failed:', error)
            );
          }}
          className="space-y-5"
          noValidate
        >
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

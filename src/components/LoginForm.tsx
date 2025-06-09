
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ValidatedFormField, useFormValidation, validators } from './FormValidation';
import { useEnhancedAlerts, supabaseAlertHelpers } from './EnhancedAlertSystem';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">
          Welcome back
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Enter your credentials to access your account
        </p>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              handleLogin,
              () => console.log('Login successful'),
              (error) => console.error('Login failed:', error)
            );
          }}
          className="space-y-4"
        >
          <ValidatedFormField
            name="email"
            config={fieldConfigs.email}
            value={values.email}
            onChange={(value) => setValue('email', value)}
            onBlur={() => setFieldTouched('email')}
            error={touched.email ? errors.email : undefined}
            disabled={isSubmitting}
          />

          <ValidatedFormField
            name="password"
            config={fieldConfigs.password}
            value={values.password}
            onChange={(value) => setValue('password', value)}
            onBlur={() => setFieldTouched('password')}
            error={touched.password ? errors.password : undefined}
            disabled={isSubmitting}
          />

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={onForgotPassword}
              className="px-0 text-sm"
              disabled={isSubmitting}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Don't have an account?{' '}
            </span>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={onSignUpRedirect}
              className="px-0 text-sm"
              disabled={isSubmitting}
            >
              Sign up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

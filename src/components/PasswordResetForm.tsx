
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ValidatedFormField, useFormValidation } from './FormValidation';
import { useEnhancedAlerts, supabaseAlertHelpers } from './EnhancedAlertSystem';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

interface PasswordResetFormData {
  email: string;
}

interface PasswordResetFormProps {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}

export const PasswordResetForm = ({ 
  onSuccess, 
  onBackToLogin 
}: PasswordResetFormProps) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
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
  } = useFormValidation<PasswordResetFormData>(fieldConfigs, {
    email: ''
  });

  const handlePasswordReset = async (formData: PasswordResetFormData) => {
    // This will be connected to Supabase auth
    console.log('Password reset request for:', formData.email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsEmailSent(true);
    addAlert({
      type: 'success',
      title: 'Reset Email Sent',
      message: 'Check your email for password reset instructions',
      source: 'supabase',
      duration: 5000
    });
    
    onSuccess?.();
  };

  if (isEmailSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Check your email
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            We've sent password reset instructions to {values.email}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onBackToLogin}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Button>
          
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => setIsEmailSent(false)}
              className="text-sm"
            >
              Didn't receive the email? Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">
          Reset your password
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              handlePasswordReset,
              () => console.log('Password reset email sent'),
              (error) => console.error('Password reset failed:', error)
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

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onBackToLogin}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

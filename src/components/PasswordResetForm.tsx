
import { useState } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessibleFormField } from './AccessibleFormField';
import { useFormValidation } from './FormValidation';
import { useEnhancedAlerts, supabaseAlertHelpers } from './EnhancedAlertSystem';
import { ArrowLeft, CheckCircle } from 'lucide-react';

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
      <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Check your email
          </CardTitle>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We've sent password reset instructions to{' '}
            <span className="font-medium text-foreground">{values.email}</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <EnhancedButton
            type="button"
            variant="outline"
            className="w-full"
            onClick={onBackToLogin}
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to login
          </EnhancedButton>
          
          <div className="text-center pt-2">
            <EnhancedButton
              type="button"
              variant="link"
              size="sm"
              onClick={() => setIsEmailSent(false)}
              className="text-sm h-auto"
            >
              Didn't receive the email? Try again
            </EnhancedButton>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-semibold text-center tracking-tight">
          Reset your password
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              handlePasswordReset,
              () => console.log('Password reset email sent'),
              (error) => console.error('Password reset failed:', error)
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

          <EnhancedButton
            type="submit"
            className="w-full"
            loading={isSubmitting}
            loadingText="Sending..."
            disabled={isSubmitting}
          >
            Send reset link
          </EnhancedButton>

          <EnhancedButton
            type="button"
            variant="outline"
            className="w-full"
            onClick={onBackToLogin}
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to login
          </EnhancedButton>
        </form>
      </CardContent>
    </Card>
  );
};

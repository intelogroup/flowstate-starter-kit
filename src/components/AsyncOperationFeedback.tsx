
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Loader, RefreshCw, Save, Send, Upload, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

// Enhanced Button with async states
interface AsyncButtonProps {
  children: React.ReactNode;
  onClick: () => Promise<void> | void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  className?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  icon?: React.ReactNode;
  showSuccessState?: boolean;
}

export const AsyncButton = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  disabled = false,
  className,
  loadingText = 'Processing...',
  successText = 'Success!',
  errorText = 'Try Again',
  icon,
  showSuccessState = true
}: AsyncButtonProps) => {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    setState('loading');
    try {
      await onClick();
      if (showSuccessState) {
        setState('success');
        setTimeout(() => setState('idle'), 2000);
      } else {
        setState('idle');
      }
    } catch (error) {
      setState('error');
      setTimeout(() => setState('idle'), 3000);
    }
  };

  const getContent = () => {
    switch (state) {
      case 'loading':
        return (
          <>
            <Loader className="w-4 h-4 animate-spin mr-2" />
            {loadingText}
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            {successText}
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
            {errorText}
          </>
        );
      default:
        return (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        );
    }
  };

  return (
    <Button
      variant={state === 'error' ? 'destructive' : variant}
      size={size}
      onClick={handleClick}
      disabled={disabled || state === 'loading'}
      className={cn(
        "transition-all duration-200",
        state === 'success' && "bg-green-600 hover:bg-green-700",
        className
      )}
    >
      {getContent()}
    </Button>
  );
};

// Form with async submission feedback
interface AsyncFormProps {
  title: string;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  children: React.ReactNode;
  submitText?: string;
  className?: string;
}

export const AsyncForm = ({
  title,
  onSubmit,
  children,
  submitText = 'Submit',
  className
}: AsyncFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState('idle');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      await onSubmit(data);
      setSubmitState('success');
    } catch (error) {
      setSubmitState('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          {submitState === 'success' && (
            <Badge variant="default" className="bg-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Saved
            </Badge>
          )}
          {submitState === 'error' && (
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
              Error
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={cn(
            "space-y-4 transition-opacity duration-200",
            isSubmitting && "opacity-50 pointer-events-none"
          )}>
            {children}
          </div>
          
          <div className="flex gap-2 pt-4">
            <AsyncButton
              type="submit"
              className="flex-1"
              loadingText="Saving..."
              successText="Saved!"
              icon={<Save className="w-4 h-4" />}
              onClick={async () => {}} // handled by form onSubmit
            >
              {submitText}
            </AsyncButton>
            
            {submitState === 'error' && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setSubmitState('idle')}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Demo component showcasing different async operations
export const AsyncOperationDemo = () => {
  const simulateAsyncOperation = (delay: number = 2000) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure
        if (Math.random() > 0.3) {
          resolve();
        } else {
          reject(new Error('Operation failed'));
        }
      }, delay);
    });
  };

  const handleFormSubmit = async (data: Record<string, string>) => {
    console.log('Form data:', data);
    await simulateAsyncOperation(1500);
  };

  return (
    <div className="p-6 space-y-8 bg-background">
      <div>
        <h2 className="text-2xl font-bold mb-4">Async Operation Feedback Demo</h2>
        <p className="text-muted-foreground mb-6">
          Examples of how async operations will behave with Supabase integration
        </p>
      </div>

      {/* Different Button States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button States</h3>
        <div className="flex flex-wrap gap-3">
          <AsyncButton
            onClick={() => simulateAsyncOperation(1000)}
            icon={<Save className="w-4 h-4" />}
          >
            Save Data
          </AsyncButton>
          
          <AsyncButton
            onClick={() => simulateAsyncOperation(2000)}
            variant="outline"
            icon={<Send className="w-4 h-4" />}
            loadingText="Sending..."
            successText="Sent!"
          >
            Send Email
          </AsyncButton>
          
          <AsyncButton
            onClick={() => simulateAsyncOperation(1500)}
            variant="secondary"
            icon={<Upload className="w-4 h-4" />}
            loadingText="Uploading..."
            successText="Uploaded!"
          >
            Upload File
          </AsyncButton>
          
          <AsyncButton
            onClick={() => simulateAsyncOperation(1000)}
            variant="outline"
            icon={<Download className="w-4 h-4" />}
            loadingText="Downloading..."
            successText="Downloaded!"
            showSuccessState={false}
          >
            Download Report
          </AsyncButton>
        </div>
      </div>

      {/* Form with Async Submission */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Form with Async Feedback</h3>
        <AsyncForm
          title="Create New Automation"
          onSubmit={handleFormSubmit}
          submitText="Create Automation"
          className="max-w-lg"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Automation Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter automation name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe what this automation does"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trigger">Trigger Event</Label>
            <Input
              id="trigger"
              name="trigger"
              placeholder="When should this automation run?"
              required
            />
          </div>
        </AsyncForm>
      </div>
    </div>
  );
};

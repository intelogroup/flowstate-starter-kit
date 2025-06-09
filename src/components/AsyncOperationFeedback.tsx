
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle, Upload, Download, Trash2 } from 'lucide-react';

interface AsyncButtonProps {
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  icon?: React.ReactNode;
  onClick: () => Promise<void>;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const AsyncButton = ({ 
  children, 
  className = '', 
  loadingText = 'Loading...', 
  successText = 'Success!',
  errorText = 'Error occurred',
  icon,
  onClick,
  variant = 'default'
}: AsyncButtonProps) => {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    setState('loading');
    try {
      await onClick();
      setState('success');
      setTimeout(() => setState('idle'), 2000);
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
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
      variant={variant}
      className={className}
      onClick={handleClick}
      disabled={state === 'loading'}
    >
      {getContent()}
    </Button>
  );
};

// Simulated async operations
const simulateUpload = () => new Promise(resolve => setTimeout(resolve, 2000));
const simulateDownload = () => new Promise(resolve => setTimeout(resolve, 1500));
const simulateDelete = () => new Promise((resolve, reject) => 
  setTimeout(() => Math.random() > 0.3 ? resolve(undefined) : reject(new Error('Failed')), 1000)
);

export const AsyncOperationDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Async Button States Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AsyncButton
            onClick={simulateUpload}
            loadingText="Uploading..."
            successText="Uploaded!"
            icon={<Upload className="w-4 h-4" />}
          >
            Upload File
          </AsyncButton>

          <AsyncButton
            onClick={simulateDownload}
            loadingText="Downloading..."
            successText="Downloaded!"
            variant="outline"
            icon={<Download className="w-4 h-4" />}
          >
            Download Data
          </AsyncButton>

          <AsyncButton
            onClick={simulateDelete}
            loadingText="Deleting..."
            successText="Deleted!"
            errorText="Delete failed"
            variant="destructive"
            icon={<Trash2 className="w-4 h-4" />}
          >
            Delete Item
          </AsyncButton>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Button State Management
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• <strong>Idle:</strong> Default state with original content</li>
            <li>• <strong>Loading:</strong> Shows spinner and loading text, button disabled</li>
            <li>• <strong>Success:</strong> Shows checkmark and success message for 2 seconds</li>
            <li>• <strong>Error:</strong> Shows error icon and message for 3 seconds</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

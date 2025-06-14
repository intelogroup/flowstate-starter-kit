
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmailToDriveForm from '@/components/EmailToDriveForm';
import EmailToDriveSteps from '@/components/EmailToDrive/EmailToDriveSteps';
import EmailToDriveConnect from '@/components/EmailToDrive/EmailToDriveConnect';
import EmailToDriveComplete from '@/components/EmailToDrive/EmailToDriveComplete';
import { useGoogleServices } from '@/hooks/useGoogleServices';
import { useEmailToDriveFlow } from '@/hooks/useEmailToDriveFlow';

interface EmailToDriveFormData {
  flowName: string;
  description: string;
  senderFilter: string;
  subjectFilter: string;
  folderPath: string;
  schedule: string;
  fileTypes: string[];
  enabled: boolean;
  duplicateHandling: string;
  maxFileSize: number;
}

const EmailToDrivePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'config' | 'connect' | 'complete'>('config');
  const [flowConfig, setFlowConfig] = useState<EmailToDriveFormData | null>(null);
  
  const { serviceStatus, isConnecting, connectGoogle, isLoading } = useGoogleServices();
  const { executeFlow, isExecuting } = useEmailToDriveFlow();

  const handleFormSubmit = (data: EmailToDriveFormData) => {
    console.log('Flow configuration:', data);
    setFlowConfig(data);
    setCurrentStep('connect');
  };

  const handleConnect = async () => {
    await connectGoogle();
    // In a real app, we'd wait for actual connection status
    setTimeout(() => {
      setCurrentStep('complete');
    }, 3000);
  };

  const handleComplete = async () => {
    if (flowConfig) {
      try {
        // Execute a test run
        await executeFlow('test-flow-id');
        navigate('/flows', { 
          state: { 
            newFlow: {
              name: flowConfig.flowName,
              type: 'email-to-drive',
              status: 'active'
            }
          }
        });
      } catch (error) {
        console.error('Failed to activate flow:', error);
      }
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'config':
        return (
          <div className="max-w-4xl mx-auto">
            <EmailToDriveForm
              onSubmit={handleFormSubmit}
              onCancel={() => navigate(-1)}
              isLoading={false}
            />
          </div>
        );

      case 'connect':
        return flowConfig ? (
          <EmailToDriveConnect
            flowConfig={flowConfig}
            isConnecting={isConnecting}
            isLoading={isLoading}
            onConnect={handleConnect}
          />
        ) : null;

      case 'complete':
        return (
          <EmailToDriveComplete
            isExecuting={isExecuting}
            onComplete={handleComplete}
            onDashboard={handleDashboard}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Email to Google Drive</h1>
          <p className="text-muted-foreground">
            Automatically save email attachments to your Google Drive
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <EmailToDriveSteps currentStep={currentStep} />

      {/* Step Content */}
      {renderStepContent()}
    </div>
  );
};

export default EmailToDrivePage;

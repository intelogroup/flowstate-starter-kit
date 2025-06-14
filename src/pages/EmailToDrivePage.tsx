
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmailToDriveForm from '@/components/EmailToDriveForm';
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
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connect Google Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <Settings className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Almost Ready!</h3>
                    <p className="text-muted-foreground">
                      Connect your Google account to enable Gmail and Drive access
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-left">
                    <h4 className="font-medium mb-2">Your Configuration:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Flow: {flowConfig?.flowName}</li>
                      <li>• File Types: {flowConfig?.fileTypes.join(', ').toUpperCase()}</li>
                      <li>• Schedule: {flowConfig?.schedule}</li>
                      {flowConfig?.senderFilter && <li>• Sender Filter: {flowConfig.senderFilter}</li>}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={handleConnect}
                      disabled={isConnecting || isLoading}
                      className="w-full"
                      size="lg"
                    >
                      {isConnecting ? 'Connecting...' : 'Connect Google Account'}
                    </Button>
                    
                    <div className="text-xs text-muted-foreground">
                      <p>We'll request access to:</p>
                      <ul className="mt-1">
                        <li>• Read your Gmail messages and attachments</li>
                        <li>• Create folders and upload files to Google Drive</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'complete':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Flow Created Successfully!</h3>
                    <p className="text-muted-foreground">
                      Your Email to Drive flow is now active and monitoring your inbox
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      What happens next?
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 text-left space-y-1">
                      <li>✓ Your flow will monitor incoming emails</li>
                      <li>✓ Attachments matching your criteria will be saved</li>
                      <li>✓ Files will be organized in your specified Drive folder</li>
                      <li>✓ You'll receive notifications about processed emails</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleComplete} className="flex-1" disabled={isExecuting}>
                      {isExecuting ? 'Testing Flow...' : 'View My Flows'}
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
      <div className="flex items-center justify-center max-w-md mx-auto mb-8">
        <div className="flex items-center w-full">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 'config' ? 'bg-primary text-primary-foreground' : 'bg-green-500 text-white'
          }`}>
            {currentStep === 'config' ? '1' : <CheckCircle className="w-4 h-4" />}
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${
            ['connect', 'complete'].includes(currentStep) ? 'bg-green-500' : 'bg-border'
          }`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 'connect' ? 'bg-primary text-primary-foreground' : 
            currentStep === 'complete' ? 'bg-green-500 text-white' : 'bg-border text-muted-foreground'
          }`}>
            {currentStep === 'complete' ? <CheckCircle className="w-4 h-4" /> : '2'}
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${
            currentStep === 'complete' ? 'bg-green-500' : 'bg-border'
          }`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 'complete' ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}
    </div>
  );
};

export default EmailToDrivePage;

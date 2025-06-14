
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface EmailToDriveConnectProps {
  flowConfig: EmailToDriveFormData;
  isConnecting: boolean;
  isLoading: boolean;
  onConnect: () => void;
}

const EmailToDriveConnect = ({ 
  flowConfig, 
  isConnecting, 
  isLoading, 
  onConnect 
}: EmailToDriveConnectProps) => {
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
                <li>• Flow: {flowConfig.flowName}</li>
                <li>• File Types: {flowConfig.fileTypes.join(', ').toUpperCase()}</li>
                <li>• Schedule: {flowConfig.schedule}</li>
                {flowConfig.senderFilter && <li>• Sender Filter: {flowConfig.senderFilter}</li>}
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={onConnect}
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
};

export default EmailToDriveConnect;


import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmailToDriveCompleteProps {
  isExecuting: boolean;
  onComplete: () => void;
  onDashboard: () => void;
}

const EmailToDriveComplete = ({ 
  isExecuting, 
  onComplete, 
  onDashboard 
}: EmailToDriveCompleteProps) => {
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
              <Button onClick={onComplete} className="flex-1" disabled={isExecuting}>
                {isExecuting ? 'Testing Flow...' : 'View My Flows'}
              </Button>
              <Button variant="outline" onClick={onDashboard}>
                Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailToDriveComplete;

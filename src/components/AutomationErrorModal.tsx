
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, RefreshCw, ExternalLink, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Automation {
  id: number;
  name: string;
  status: string;
  errorMessage?: string;
  trigger: string;
}

interface AutomationErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  automation: Automation | null;
  onRetry: (automationId: number) => void;
}

const AutomationErrorModal = ({ isOpen, onClose, automation, onRetry }: AutomationErrorModalProps) => {
  if (!automation) return null;

  const handleCopyError = () => {
    if (automation.errorMessage) {
      navigator.clipboard.writeText(automation.errorMessage);
      toast({
        title: "Error copied",
        description: "Error message has been copied to clipboard",
      });
    }
  };

  const getTroubleshootingSteps = (errorMessage?: string) => {
    if (!errorMessage) return [];
    
    if (errorMessage.includes('Authentication')) {
      return [
        'Check if your authentication tokens are still valid',
        'Reconnect the service in your integrations settings',
        'Verify that the service permissions are properly configured'
      ];
    }
    
    if (errorMessage.includes('API')) {
      return [
        'Check if the external service is currently available',
        'Verify your API rate limits haven\'t been exceeded',
        'Review the service\'s status page for any ongoing issues'
      ];
    }
    
    return [
      'Review the automation configuration for any changes needed',
      'Check if all required fields are properly set',
      'Try running the automation manually to isolate the issue'
    ];
  };

  const troubleshootingSteps = getTroubleshootingSteps(automation.errorMessage);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Automation Error
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">{automation.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-red-600 border-red-200">
                Error
              </Badge>
              <Badge variant="outline" className="text-xs">
                {automation.trigger}
              </Badge>
            </div>
          </div>

          {automation.errorMessage && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Error Details</span>
                <Button variant="ghost" size="sm" onClick={handleCopyError}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{automation.errorMessage}</p>
              </div>
            </div>
          )}

          {troubleshootingSteps.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-foreground">Troubleshooting Steps</span>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {troubleshootingSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-xs mt-1">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
            <Button 
              onClick={() => onRetry(automation.id)}
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>

          <div className="pt-2 border-t">
            <Button variant="ghost" size="sm" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutomationErrorModal;

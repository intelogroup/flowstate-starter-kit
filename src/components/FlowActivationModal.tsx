
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FlowActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  flowName: string;
  action: 'activate' | 'deactivate';
}

interface ActivationStep {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'success' | 'error';
  message?: string;
}

const FlowActivationModal = ({ isOpen, onClose, flowName, action }: FlowActivationModalProps) => {
  const [steps, setSteps] = useState<ActivationStep[]>([
    { id: 'validate', label: 'Validating configuration', status: 'pending' },
    { id: 'connect', label: 'Testing connections', status: 'pending' },
    { id: 'deploy', label: action === 'activate' ? 'Activating flow' : 'Deactivating flow', status: 'pending' },
    { id: 'verify', label: 'Verifying status', status: 'pending' }
  ]);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        
        // Update current step to loading
        setSteps(prev => prev.map((step, idx) => 
          idx === i ? { ...step, status: 'loading' } : step
        ));

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Randomly simulate success or error (mostly success)
        const success = Math.random() > 0.15;
        
        if (success) {
          setSteps(prev => prev.map((step, idx) => 
            idx === i ? { ...step, status: 'success' } : step
          ));
        } else {
          setSteps(prev => prev.map((step, idx) => 
            idx === i ? { 
              ...step, 
              status: 'error',
              message: 'Connection timeout - please check your network'
            } : step
          ));
          setHasError(true);
          break;
        }
      }

      if (!hasError) {
        setIsComplete(true);
      }
    };

    processSteps();
  }, [isOpen]);

  const progress = ((currentStep + (steps[currentStep]?.status === 'success' ? 1 : 0)) / steps.length) * 100;

  const getStepIcon = (step: ActivationStep) => {
    switch (step.status) {
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {action === 'activate' ? 'Activating' : 'Deactivating'} Flow
            {isComplete && !hasError && <CheckCircle className="w-5 h-5 text-green-600" />}
            {hasError && <AlertTriangle className="w-5 h-5 text-red-600" />}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">{flowName}</h3>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {Math.round(progress)}% complete
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                {getStepIcon(step)}
                <div className="flex-1">
                  <span className={`text-sm ${
                    step.status === 'success' ? 'text-green-600' :
                    step.status === 'error' ? 'text-red-600' :
                    step.status === 'loading' ? 'text-blue-600' :
                    'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                  {step.message && (
                    <p className="text-xs text-red-600 mt-1">{step.message}</p>
                  )}
                </div>
                {step.status === 'success' && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Done
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {(isComplete || hasError) && (
            <div className="flex gap-2 pt-4">
              <Button onClick={onClose} className="flex-1">
                {hasError ? 'Close' : 'Done'}
              </Button>
              {hasError && (
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlowActivationModal;

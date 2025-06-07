
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
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
  estimatedTime?: number;
}

const FlowActivationModal = ({ isOpen, onClose, flowName, action }: FlowActivationModalProps) => {
  const [steps, setSteps] = useState<ActivationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      const initialSteps = [
        { id: 'validate', label: 'Validating configuration', status: 'pending' as const, estimatedTime: 2 },
        { id: 'connect', label: 'Testing connections', status: 'pending' as const, estimatedTime: 3 },
        { id: 'deploy', label: action === 'activate' ? 'Activating flow' : 'Deactivating flow', status: 'pending' as const, estimatedTime: 2 },
        { id: 'verify', label: 'Verifying status', status: 'pending' as const, estimatedTime: 1 }
      ];
      
      setSteps(initialSteps);
      setCurrentStep(0);
      setIsComplete(false);
      setHasError(false);
      setIsProcessing(false);
    }
  }, [isOpen, action]);

  // Start processing when modal opens
  useEffect(() => {
    if (isOpen && !isProcessing && steps.length > 0) {
      setIsProcessing(true);
      processSteps();
    }
  }, [isOpen, isProcessing, steps.length]);

  const processSteps = async () => {
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Update current step to loading
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'loading' } : step
      ));

      // Simulate processing time based on step
      const processingTime = steps[i].estimatedTime ? steps[i].estimatedTime! * 1000 : 2000;
      await new Promise(resolve => setTimeout(resolve, processingTime));

      // Simulate success/failure (85% success rate)
      const success = Math.random() > 0.15;
      
      if (success) {
        setSteps(prev => prev.map((step, idx) => 
          idx === i ? { ...step, status: 'success' } : step
        ));
      } else {
        // Random error types for realistic placeholder experience
        const errorMessages = [
          'API rate limit exceeded - please try again in a few minutes',
          'Network timeout - check your connection and retry',
          'Authentication failed - please reauthorize the service',
          'Service temporarily unavailable - our team has been notified'
        ];
        
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        
        setSteps(prev => prev.map((step, idx) => 
          idx === i ? { 
            ...step, 
            status: 'error',
            message: randomError
          } : step
        ));
        setHasError(true);
        setIsProcessing(false);
        return;
      }
    }

    setIsComplete(true);
    setIsProcessing(false);
  };

  const handleRetry = () => {
    setSteps(prev => prev.map(step => ({ 
      ...step, 
      status: 'pending' as const, 
      message: undefined 
    })));
    setCurrentStep(0);
    setIsComplete(false);
    setHasError(false);
    setIsProcessing(true);
    processSteps();
  };

  const handleClose = () => {
    // Only allow closing if not currently processing
    if (!isProcessing) {
      onClose();
    }
  };

  const progress = steps.length > 0 ? 
    ((currentStep + (steps[currentStep]?.status === 'success' ? 1 : 0)) / steps.length) * 100 : 0;

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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {action === 'activate' ? 'Activating' : 'Deactivating'} Flow
            {isComplete && !hasError && <CheckCircle className="w-5 h-5 text-green-600" />}
            {hasError && <AlertTriangle className="w-5 h-5 text-red-600" />}
            {isProcessing && <Loader2 className="w-5 h-5 animate-spin text-blue-600" />}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">{flowName}</h3>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {Math.round(progress)}% complete
              {isProcessing && steps[currentStep] && (
                <span className="ml-2">
                  (Est. {steps[currentStep].estimatedTime}s remaining)
                </span>
              )}
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
                {step.status === 'loading' && (
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    Processing
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          {(isComplete || hasError) && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleClose} className="flex-1" disabled={isProcessing}>
                {hasError ? 'Close' : 'Done'}
              </Button>
              {hasError && (
                <Button variant="outline" onClick={handleRetry} disabled={isProcessing}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              )}
            </div>
          )}

          {/* Cancel button during processing */}
          {isProcessing && (
            <div className="pt-4">
              <Button variant="outline" onClick={handleClose} className="w-full">
                Cancel
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlowActivationModal;

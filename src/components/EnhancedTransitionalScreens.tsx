
import { useState, useEffect } from "react";
import { Loader2, Zap, CheckCircle, AlertTriangle, WifiOff, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface FlowStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message?: string;
  duration?: number;
}

interface EnhancedFlowExecutingScreenProps {
  flowName: string;
  steps?: FlowStep[];
  currentStepIndex?: number;
  totalSteps?: number;
  autoProgress?: boolean;
}

export const EnhancedFlowExecutingScreen = ({ 
  flowName, 
  steps: propSteps, 
  currentStepIndex: propCurrentStepIndex, 
  totalSteps: propTotalSteps,
  autoProgress = false
}: EnhancedFlowExecutingScreenProps) => {
  // Default steps for Gmail to Drive automation
  const defaultSteps: FlowStep[] = [
    { id: '1', name: 'Initializing flow', message: 'Preparing automation engine...', duration: 2000 },
    { id: '2', name: 'Searching Gmail', message: 'Finding emails matching your criteria...', duration: 3000 },
    { id: '3', name: 'Processing attachments', message: 'Extracting and organizing files...', duration: 2000 },
    { id: '4', name: 'Saving to Google Drive', message: 'Uploading files to your designated folder...', duration: 3000 },
    { id: '5', name: 'Finalizing', message: 'Completing automation and generating summary...', duration: 1000 }
  ];

  const steps = propSteps || defaultSteps;
  const [currentStepIndex, setCurrentStepIndex] = useState(propCurrentStepIndex || 0);
  const [progress, setProgress] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<FlowStep[]>(
    steps.map((step, index) => ({
      ...step,
      status: index === 0 ? 'running' : 'pending'
    }))
  );

  const totalSteps = propTotalSteps || steps.length;

  useEffect(() => {
    if (!autoProgress) return;

    const progressStep = () => {
      if (currentStepIndex < steps.length) {
        const currentStep = steps[currentStepIndex];
        
        // Mark current step as completed and next as running
        setTimeout(() => {
          setStepStatuses(prev => prev.map((step, index) => ({
            ...step,
            status: index < currentStepIndex + 1 ? 'completed' : 
                   index === currentStepIndex + 1 ? 'running' : 'pending'
          })));
          
          setCurrentStepIndex(prev => prev + 1);
        }, currentStep.duration || 2000);
      }
    };

    progressStep();
  }, [currentStepIndex, autoProgress, steps]);

  useEffect(() => {
    const newProgress = ((currentStepIndex) / totalSteps) * 100;
    setProgress(Math.min(newProgress, 100));
  }, [currentStepIndex, totalSteps]);

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getCurrentMessage = () => {
    const currentStep = stepStatuses[currentStepIndex];
    if (currentStep) {
      return `Step ${currentStepIndex + 1}/${totalSteps} - ${currentStep.message || currentStep.name}`;
    }
    return currentStepIndex >= totalSteps ? "Flow completed successfully!" : "Processing...";
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <Zap className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">Executing Flow</h3>
      <p className="text-muted-foreground mb-6">"{flowName}"</p>
      
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="w-full space-y-3 mb-6">
        {stepStatuses.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3 text-left">
            {getStepIcon(step.status)}
            <div className="flex-1">
              <span className={`text-sm ${
                step.status === 'completed' ? 'text-green-600' :
                step.status === 'running' ? 'text-primary' :
                step.status === 'failed' ? 'text-red-600' :
                'text-muted-foreground'
              }`}>
                {step.name}
              </span>
              {step.status === 'running' && step.message && (
                <p className="text-xs text-muted-foreground mt-1">{step.message}</p>
              )}
            </div>
            {index < stepStatuses.length - 1 && step.status === 'completed' && (
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-primary font-medium">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        {getCurrentMessage()}
      </div>
    </div>
  );
};

export const FlowCompletedWithSummaryScreen = ({ 
  flowName, 
  duration, 
  completedSteps, 
  results 
}: { 
  flowName: string; 
  duration: string; 
  completedSteps: number; 
  results?: { processed: number; successful: number; failed: number; }; 
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
      <CheckCircle className="w-8 h-8 text-green-600" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">Flow Completed Successfully</h3>
    <p className="text-muted-foreground mb-4">"{flowName}"</p>
    
    <div className="grid grid-cols-2 gap-4 w-full mb-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground">{duration}</div>
        <div className="text-xs text-muted-foreground">Execution Time</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground">{completedSteps}</div>
        <div className="text-xs text-muted-foreground">Steps Completed</div>
      </div>
    </div>

    {results && (
      <div className="w-full">
        <h4 className="text-sm font-semibold mb-3">Results Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Items processed:</span>
            <Badge variant="secondary">{results.processed}</Badge>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Successful:</span>
            <Badge variant="outline" className="text-green-600 border-green-600">{results.successful}</Badge>
          </div>
          {results.failed > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span>Failed:</span>
              <Badge variant="outline" className="text-red-600 border-red-600">{results.failed}</Badge>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

export const ConnectionWithDetailsScreen = ({ 
  serviceName, 
  status, 
  permissions 
}: { 
  serviceName: string; 
  status: 'connecting' | 'authorizing' | 'verifying'; 
  permissions?: string[]; 
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
    <Loader2 className="w-12 h-12 animate-spin text-primary mb-6" />
    <h3 className="text-xl font-semibold text-foreground mb-2">
      {status === 'connecting' && `Connecting to ${serviceName}`}
      {status === 'authorizing' && `Authorizing with ${serviceName}`}
      {status === 'verifying' && `Verifying ${serviceName} connection`}
    </h3>
    <p className="text-muted-foreground mb-6">
      {status === 'connecting' && "Establishing secure connection..."}
      {status === 'authorizing' && "Please complete authorization in the popup window"}
      {status === 'verifying' && "Checking permissions and testing connection..."}
    </p>
    
    {permissions && (
      <div className="w-full">
        <h4 className="text-sm font-semibold mb-3">Required Permissions</h4>
        <div className="space-y-2">
          {permissions.map((permission, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-green-600" />
              {permission}
            </div>
          ))}
        </div>
      </div>
    )}
    
    <div className="text-sm text-muted-foreground mt-4">
      This may take a few moments...
    </div>
  </div>
);

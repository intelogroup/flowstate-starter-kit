import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2, Play } from "lucide-react";

interface FlowStep {
  id: string;
  name: string;
  message: string;
  duration: number;
  status: 'pending' | 'running' | 'completed';
}

interface EnhancedFlowExecutingScreenProps {
  flowName: string;
  autoProgress?: boolean;
}

export const EnhancedFlowExecutingScreen = ({ 
  flowName, 
  autoProgress = false 
}: EnhancedFlowExecutingScreenProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const steps: FlowStep[] = [
    { id: "init", name: "Initialization", message: "Initializing flow...", duration: 2000, status: 'pending' },
    { id: "search", name: "Gmail Search", message: "Searching your Gmail for matching emails...", duration: 3000, status: 'pending' },
    { id: "process", name: "File Processing", message: "Processing attachments and extracting data...", duration: 2000, status: 'pending' },
    { id: "save", name: "Google Drive Save", message: "Saving processed files to Google Drive...", duration: 3000, status: 'pending' },
    { id: "finalize", name: "Finalization", message: "Finalizing run and updating logs...", duration: 2000, status: 'pending' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!autoProgress) return;

    let totalDuration = 0;
    let currentDuration = 0;

    const progressTimer = setInterval(() => {
      const totalTime = steps.reduce((acc, step) => acc + step.duration, 0);
      currentDuration += 100;
      
      // Find current step
      let stepTime = 0;
      let stepIndex = 0;
      for (let i = 0; i < steps.length; i++) {
        if (currentDuration <= stepTime + steps[i].duration) {
          stepIndex = i;
          break;
        }
        stepTime += steps[i].duration;
      }

      setCurrentStepIndex(stepIndex);
      setProgress((currentDuration / totalTime) * 100);

      if (currentDuration >= totalTime) {
        clearInterval(progressTimer);
      }
    }, 100);

    return () => clearInterval(progressTimer);
  }, [autoProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepStatus = (stepIndex: number): 'pending' | 'running' | 'completed' => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'running';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Flow in Progress</h1>
            <p className="text-muted-foreground">"{flowName}" is currently running</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">Elapsed: {formatTime(elapsedTime)}</span>
              <span className="text-xs text-muted-foreground">Step {currentStepIndex + 1} of {steps.length}</span>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-primary animate-spin flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Status: {steps[currentStepIndex]?.message}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Processing step {currentStepIndex + 1}: {steps[currentStepIndex]?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Step List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground mb-3">Execution Steps</h3>
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <div key={step.id} className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {status === 'running' && (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    )}
                    {status === 'pending' && (
                      <div className="w-5 h-5 border-2 border-muted rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      status === 'completed' ? 'text-green-600' :
                      status === 'running' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.message}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-xs text-muted-foreground">
              You can safely close this window. We'll notify you when the flow completes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

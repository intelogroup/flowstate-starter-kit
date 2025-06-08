
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps?: number[];
  variant?: 'horizontal' | 'vertical';
  showLoader?: boolean;
}

const ProgressIndicator = ({ 
  steps, 
  currentStep, 
  completedSteps = [], 
  variant = 'horizontal',
  showLoader = false 
}: ProgressIndicatorProps) => {
  if (variant === 'vertical') {
    return (
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index) || index < currentStep;
          const isCurrent = index === currentStep;
          const isActive = isCurrent && showLoader;

          return (
            <div key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
                  isCompleted 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : isCurrent 
                      ? "border-primary text-primary" 
                      : "border-muted text-muted-foreground"
                )}>
                  {isActive ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-px h-8 mt-2 transition-colors",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
              <div className="pb-8">
                <h3 className={cn(
                  "font-medium transition-colors",
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index) || index < currentStep;
        const isCurrent = index === currentStep;
        const isActive = isCurrent && showLoader;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
                isCompleted 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : isCurrent 
                    ? "border-primary text-primary" 
                    : "border-muted text-muted-foreground"
              )}>
                {isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={cn(
                  "text-xs font-medium transition-colors",
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-px mx-4 transition-colors",
                isCompleted ? "bg-primary" : "bg-muted"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;

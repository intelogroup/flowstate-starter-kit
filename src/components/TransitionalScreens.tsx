
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  isOptional?: boolean;
}

interface TransitionalScreenProps {
  title: string;
  description?: string;
  steps: Step[];
  currentStep: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  loadingMessage?: string;
  children?: React.ReactNode;
  showProgress?: boolean;
  allowSkip?: boolean;
}

export const TransitionalScreen = ({
  title,
  description,
  steps,
  currentStep,
  onNext,
  onPrevious,
  onComplete,
  onCancel,
  isLoading = false,
  loadingMessage = "Processing...",
  children,
  showProgress = true,
  allowSkip = false
}: TransitionalScreenProps) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Progress Indicator */}
        {showProgress && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
            
            {/* Step indicators */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center space-y-1">
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
                    index < currentStep ? "bg-primary border-primary text-primary-foreground" :
                    index === currentStep ? "border-primary text-primary" :
                    "border-muted text-muted-foreground"
                  )}>
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-xs text-center max-w-20">
                    <p className={cn(
                      "font-medium",
                      index <= currentStep ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </p>
                    {step.isOptional && (
                      <Badge variant="outline" className="text-xs mt-1">Optional</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>{currentStepData?.title}</CardTitle>
            {currentStepData?.description && (
              <CardDescription>{currentStepData.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">{loadingMessage}</p>
              </div>
            ) : (
              children
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!isFirstStep && (
              <Button 
                variant="outline" 
                onClick={onPrevious}
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            {onCancel && (
              <Button 
                variant="ghost" 
                onClick={onCancel}
                disabled={isLoading}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {allowSkip && !isLastStep && (
              <Button 
                variant="ghost" 
                onClick={onNext}
                disabled={isLoading}
              >
                Skip
              </Button>
            )}
            {isLastStep ? (
              <Button 
                onClick={onComplete}
                disabled={isLoading}
              >
                <Check className="w-4 h-4 mr-2" />
                Complete
              </Button>
            ) : (
              <Button 
                onClick={onNext}
                disabled={isLoading}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = 'default',
  isLoading = false
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelText}
              </Button>
              <Button 
                variant={variant === 'destructive' ? 'destructive' : 'default'}
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {confirmText}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Loading Overlay Component
interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  progress?: number;
}

export const LoadingOverlay = ({
  isVisible,
  message = "Loading...",
  progress
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-center">{message}</p>
          {progress !== undefined && (
            <div className="w-full space-y-2">
              <Progress value={progress} />
              <p className="text-xs text-muted-foreground text-center">{Math.round(progress)}%</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

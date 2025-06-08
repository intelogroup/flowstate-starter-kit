
import { Loader2, Zap, CheckCircle, AlertTriangle, WifiOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const FlowExecutingScreen = ({ flowName }: { flowName: string }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <div className="relative mb-6">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <Zap className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">Executing Flow</h3>
    <p className="text-muted-foreground mb-4">"{flowName}" is running...</p>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      Processing your automation
    </div>
  </div>
);

export const FlowCompletedScreen = ({ flowName, duration }: { flowName: string; duration: string }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
      <CheckCircle className="w-8 h-8 text-green-600" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">Flow Completed</h3>
    <p className="text-muted-foreground mb-4">"{flowName}" executed successfully</p>
    <div className="text-sm text-muted-foreground">
      Completed in {duration}
    </div>
  </div>
);

export const ConnectionPendingScreen = ({ serviceName }: { serviceName: string }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <Loader2 className="w-12 h-12 animate-spin text-primary mb-6" />
    <h3 className="text-xl font-semibold text-foreground mb-2">Connecting to {serviceName}</h3>
    <p className="text-muted-foreground mb-4">Please complete authorization in the popup window</p>
    <div className="text-sm text-muted-foreground">
      This may take a few moments...
    </div>
  </div>
);

export const FlowSavingScreen = () => (
  <div className="flex items-center justify-center p-8">
    <div className="flex items-center gap-3">
      <Loader2 className="w-5 h-5 animate-spin text-primary" />
      <span className="text-foreground">Saving flow configuration...</span>
    </div>
  </div>
);

export const NetworkErrorScreen = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-6">
      <WifiOff className="w-8 h-8 text-red-600" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">Connection Error</h3>
    <p className="text-muted-foreground mb-6">Unable to connect to our servers</p>
    <Button onClick={onRetry} className="gap-2">
      <Loader2 className="w-4 h-4" />
      Try Again
    </Button>
  </div>
);

export const FlowListLoadingState = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <Card key={i}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-20 rounded" />
            <Skeleton className="h-6 w-24 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info, CheckCircle, Clock, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const FlowExecutionAlert = ({ flowName, progress }: { flowName: string; progress: number }) => (
  <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
    <Zap className="h-4 w-4 text-blue-600" />
    <AlertTitle className="text-blue-800 dark:text-blue-200">Flow Executing</AlertTitle>
    <AlertDescription className="text-blue-700 dark:text-blue-300">
      <div className="space-y-2">
        <p>"{flowName}" is currently running...</p>
        <Progress value={progress} className="w-full" />
        <p className="text-xs">{progress}% complete</p>
      </div>
    </AlertDescription>
  </Alert>
);

export const QuotaWarningAlert = ({ used, limit, onUpgrade }: { used: number; limit: number; onUpgrade: () => void }) => (
  <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
    <AlertTriangle className="h-4 w-4 text-yellow-600" />
    <AlertTitle className="text-yellow-800 dark:text-yellow-200">Approaching Usage Limit</AlertTitle>
    <AlertDescription className="text-yellow-700 dark:text-yellow-300">
      <div className="space-y-3">
        <p>You've used {used} of {limit} monthly executions ({Math.round((used/limit) * 100)}%)</p>
        <Progress value={(used/limit) * 100} className="w-full" />
        <Button size="sm" onClick={onUpgrade} className="bg-yellow-600 hover:bg-yellow-700">
          Upgrade Plan
        </Button>
      </div>
    </AlertDescription>
  </Alert>
);

export const ConnectionIssueAlert = ({ serviceName, onReconnect }: { serviceName: string; onReconnect: () => void }) => (
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Connection Issue</AlertTitle>
    <AlertDescription>
      <div className="space-y-3">
        <p>Unable to connect to {serviceName}. Your flows may not execute properly.</p>
        <Button size="sm" variant="outline" onClick={onReconnect}>
          Reconnect Now
        </Button>
      </div>
    </AlertDescription>
  </Alert>
);

export const MaintenanceAlert = ({ startTime, endTime }: { startTime: string; endTime: string }) => (
  <Alert className="border-purple-200 bg-purple-50 dark:bg-purple-950">
    <Clock className="h-4 w-4 text-purple-600" />
    <AlertTitle className="text-purple-800 dark:text-purple-200">Scheduled Maintenance</AlertTitle>
    <AlertDescription className="text-purple-700 dark:text-purple-300">
      <p>System maintenance is scheduled from {startTime} to {endTime}. Some features may be temporarily unavailable.</p>
    </AlertDescription>
  </Alert>
);

export const SuccessAlert = ({ title, message }: { title: string; message: string }) => (
  <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
    <CheckCircle className="h-4 w-4 text-green-600" />
    <AlertTitle className="text-green-800 dark:text-green-200">{title}</AlertTitle>
    <AlertDescription className="text-green-700 dark:text-green-300">
      {message}
    </AlertDescription>
  </Alert>
);

export const SecurityAlert = ({ message, onAction }: { message: string; onAction?: () => void }) => (
  <Alert variant="destructive">
    <Shield className="h-4 w-4" />
    <AlertTitle>Security Notice</AlertTitle>
    <AlertDescription>
      <div className="space-y-3">
        <p>{message}</p>
        {onAction && (
          <Button size="sm" variant="outline" onClick={onAction}>
            Take Action
          </Button>
        )}
      </div>
    </AlertDescription>
  </Alert>
);

export const InfoAlert = ({ title, message, dismissible = true }: { title: string; message: string; dismissible?: boolean }) => (
  <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
    <Info className="h-4 w-4 text-blue-600" />
    <AlertTitle className="text-blue-800 dark:text-blue-200">{title}</AlertTitle>
    <AlertDescription className="text-blue-700 dark:text-blue-300">
      {message}
    </AlertDescription>
  </Alert>
);

export const BatchOperationAlert = ({ operation, total, completed }: { operation: string; total: number; completed: number }) => (
  <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
    <Zap className="h-4 w-4 text-blue-600" />
    <AlertTitle className="text-blue-800 dark:text-blue-200">Batch Operation in Progress</AlertTitle>
    <AlertDescription className="text-blue-700 dark:text-blue-300">
      <div className="space-y-2">
        <p>{operation} ({completed} of {total} completed)</p>
        <Progress value={(completed/total) * 100} className="w-full" />
      </div>
    </AlertDescription>
  </Alert>
);

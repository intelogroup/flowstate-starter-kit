
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader, RefreshCw } from "lucide-react";

export const TemplateCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-12 rounded" />
        <Skeleton className="h-6 w-20 rounded" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-12" />
      </div>
    </CardContent>
  </Card>
);

export const FlowDetailsSkeleton = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="w-8 h-8" />
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-96" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
    
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-12" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const ConnectionLoadingState = ({ serviceName }: { serviceName: string }) => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
      <h3 className="font-medium text-foreground mb-2">Connecting to {serviceName}</h3>
      <p className="text-sm text-muted-foreground">Please authorize access in the popup window...</p>
    </div>
  </div>
);

export const TestRunningState = () => (
  <div className="border border-border rounded-lg p-6">
    <div className="flex items-center gap-3 mb-4">
      <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
      <h4 className="font-medium text-foreground">Running Test Flow</h4>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm text-muted-foreground">Connecting to Gmail...</span>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="w-2 h-2 rounded-full" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="w-2 h-2 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  </div>
);

export const EmptyTemplateState = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-secondary rounded-lg mx-auto mb-4 flex items-center justify-center">
      <Skeleton className="w-8 h-8" />
    </div>
    <h3 className="font-medium text-foreground mb-2">No templates found</h3>
    <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
    <Skeleton className="h-10 w-32 mx-auto" />
  </div>
);

export const ErrorState = ({ title, message, onRetry }: { title: string; message: string; onRetry?: () => void }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-lg mx-auto mb-4 flex items-center justify-center">
      <RefreshCw className="w-8 h-8 text-red-600" />
    </div>
    <h3 className="font-medium text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Try Again
      </button>
    )}
  </div>
);


import { AlertTriangle, RefreshCw, Wifi, Shield, HelpCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  title: string;
  message: string;
  type?: 'network' | 'auth' | 'validation' | 'critical' | 'general';
  onRetry?: () => void;
  onHelp?: () => void;
  showSupport?: boolean;
  className?: string;
}

export const InlineErrorState = ({ 
  title, 
  message, 
  type = 'general', 
  onRetry, 
  onHelp,
  showSupport = false,
  className = "" 
}: ErrorStateProps) => {
  const getIcon = () => {
    switch (type) {
      case 'network': return <Wifi className="w-4 h-4" />;
      case 'auth': return <Shield className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <Alert variant="destructive" className={className}>
      {getIcon()}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <div className="space-y-3">
          <p>{message}</p>
          <div className="flex gap-2">
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw className="w-3 h-3 mr-1" />
                Try Again
              </Button>
            )}
            {onHelp && (
              <Button variant="outline" size="sm" onClick={onHelp}>
                <HelpCircle className="w-3 h-3 mr-1" />
                Get Help
              </Button>
            )}
            {showSupport && (
              <Button variant="outline" size="sm">
                <ExternalLink className="w-3 h-3 mr-1" />
                Contact Support
              </Button>
            )}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export const CardErrorState = ({ 
  title, 
  message, 
  onRetry, 
  onHelp,
  className = "" 
}: ErrorStateProps) => (
  <Card className={`border-red-200 bg-red-50 dark:bg-red-950 ${className}`}>
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">{title}</h4>
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">{message}</p>
          <div className="flex gap-2">
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry} className="border-red-300 text-red-700 hover:bg-red-100">
                <RefreshCw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            )}
            {onHelp && (
              <Button variant="outline" size="sm" onClick={onHelp} className="border-red-300 text-red-700 hover:bg-red-100">
                <HelpCircle className="w-3 h-3 mr-1" />
                Help
              </Button>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const CriticalErrorPage = ({ 
  title = "Something went wrong", 
  message = "We're experiencing technical difficulties. Please try refreshing the page or contact support if the problem persists.",
  onRetry,
  onHelp
}: ErrorStateProps) => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-background">
    <Card className="max-w-md w-full">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-3">{title}</h1>
        <p className="text-muted-foreground mb-6">{message}</p>
        <div className="space-y-3">
          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          {onHelp && (
            <Button variant="outline" onClick={onHelp} className="w-full">
              <HelpCircle className="w-4 h-4 mr-2" />
              Get Help
            </Button>
          )}
          <Button variant="outline" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

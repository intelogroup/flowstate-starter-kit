
import { useState, createContext, useContext, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle, Database, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedAlertMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  source?: 'supabase' | 'network' | 'validation' | 'general';
  persistent?: boolean;
  duration?: number;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }[];
}

interface EnhancedAlertContextType {
  alerts: EnhancedAlertMessage[];
  addAlert: (alert: Omit<EnhancedAlertMessage, 'id'>) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

const EnhancedAlertContext = createContext<EnhancedAlertContextType | undefined>(undefined);

export const useEnhancedAlerts = () => {
  const context = useContext(EnhancedAlertContext);
  if (!context) {
    throw new Error('useEnhancedAlerts must be used within an EnhancedAlertProvider');
  }
  return context;
};

interface EnhancedAlertProviderProps {
  children: ReactNode;
}

export const EnhancedAlertProvider = ({ children }: EnhancedAlertProviderProps) => {
  const [alerts, setAlerts] = useState<EnhancedAlertMessage[]>([]);

  const addAlert = (alert: Omit<EnhancedAlertMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newAlert = { ...alert, id };
    setAlerts(prev => [newAlert, ...prev]);

    // Auto-remove alerts based on duration or default behavior
    const duration = alert.duration || (alert.persistent ? 0 : 5000);
    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <EnhancedAlertContext.Provider value={{ alerts, addAlert, removeAlert, clearAlerts }}>
      {children}
      <EnhancedGlobalAlertContainer />
    </EnhancedAlertContext.Provider>
  );
};

const EnhancedGlobalAlertContainer = () => {
  const { alerts, removeAlert } = useEnhancedAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map(alert => (
        <EnhancedAlertCard key={alert.id} alert={alert} onDismiss={() => removeAlert(alert.id)} />
      ))}
    </div>
  );
};

interface EnhancedAlertCardProps {
  alert: EnhancedAlertMessage;
  onDismiss: () => void;
}

const EnhancedAlertCard = ({ alert, onDismiss }: EnhancedAlertCardProps) => {
  const getIcon = () => {
    if (alert.source === 'supabase') {
      return <Database className="h-4 w-4" />;
    }
    if (alert.source === 'network') {
      return <Wifi className="h-4 w-4" />;
    }
    
    switch (alert.type) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    return alert.type === 'error' ? 'destructive' : 'default';
  };

  const getBorderClass = () => {
    switch (alert.source) {
      case 'supabase': return 'border-l-green-500';
      case 'network': return 'border-l-blue-500';
      case 'validation': return 'border-l-yellow-500';
      default: 
        switch (alert.type) {
          case 'success': return 'border-l-green-500';
          case 'warning': return 'border-l-yellow-500';
          case 'info': return 'border-l-blue-500';
          case 'error': return 'border-l-red-500';
          default: return 'border-l-gray-500';
        }
    }
  };

  const getBackgroundClass = () => {
    switch (alert.type) {
      case 'success': return 'bg-green-50 dark:bg-green-950';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-950';
      case 'info': return 'bg-blue-50 dark:bg-blue-950';
      case 'error': return 'bg-red-50 dark:bg-red-950';
      default: return '';
    }
  };

  return (
    <Alert 
      variant={getVariant()} 
      className={cn(
        "shadow-lg border-l-4 animate-slide-in-right",
        getBorderClass(),
        getBackgroundClass()
      )}
    >
      {getIcon()}
      <div className="flex-1">
        <AlertTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {alert.title}
            {alert.source && (
              <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                {alert.source}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </AlertTitle>
        <AlertDescription className="mt-1">
          {alert.message}
          {alert.actions && alert.actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {alert.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
};

// Enhanced alert helpers with source tracking
export const supabaseAlertHelpers = {
  authSuccess: (action: string) => ({
    type: 'success' as const,
    title: `${action} Successful`,
    message: 'You have been successfully authenticated',
    source: 'supabase' as const,
    duration: 3000
  }),

  authError: (action: string, message: string) => ({
    type: 'error' as const,
    title: `${action} Failed`,
    message,
    source: 'supabase' as const,
    persistent: true
  }),

  dataSuccess: (action: string, entity: string) => ({
    type: 'success' as const,
    title: `${entity} ${action}`,
    message: `${entity} has been successfully ${action.toLowerCase()}`,
    source: 'supabase' as const,
    duration: 3000
  }),

  dataError: (action: string, entity: string, message?: string) => ({
    type: 'error' as const,
    title: `${entity} ${action} Failed`,
    message: message || `Failed to ${action.toLowerCase()} ${entity.toLowerCase()}`,
    source: 'supabase' as const,
    persistent: true
  }),

  connectionError: () => ({
    type: 'error' as const,
    title: 'Connection Error',
    message: 'Unable to connect to the database. Please check your connection.',
    source: 'supabase' as const,
    persistent: true
  })
};

export const networkAlertHelpers = {
  offline: () => ({
    type: 'warning' as const,
    title: 'You are offline',
    message: 'Some features may not be available while offline',
    source: 'network' as const,
    persistent: true
  }),

  online: () => ({
    type: 'success' as const,
    title: 'Connection restored',
    message: 'You are back online',
    source: 'network' as const,
    duration: 2000
  }),

  slowConnection: () => ({
    type: 'info' as const,
    title: 'Slow connection detected',
    message: 'Some operations may take longer than usual',
    source: 'network' as const,
    duration: 5000
  })
};

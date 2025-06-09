
import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AlertMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  persistent?: boolean;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }[];
  source?: 'supabase' | 'form' | 'system' | 'user';
}

interface EnhancedAlertContextType {
  alerts: AlertMessage[];
  addAlert: (alert: Omit<AlertMessage, 'id'>) => string;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
  clearBySource: (source: string) => void;
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
  maxAlerts?: number;
}

export const EnhancedAlertProvider = ({ children, maxAlerts = 5 }: EnhancedAlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const addAlert = (alert: Omit<AlertMessage, 'id'>) => {
    const id = `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newAlert = { 
      ...alert, 
      id,
      duration: alert.duration ?? (alert.persistent ? undefined : 5000),
      position: alert.position ?? 'top-right'
    };
    
    setAlerts(prev => {
      const updated = [newAlert, ...prev];
      return updated.slice(0, maxAlerts);
    });

    // Auto-remove non-persistent alerts
    if (!alert.persistent && newAlert.duration) {
      setTimeout(() => {
        removeAlert(id);
      }, newAlert.duration);
    }

    return id;
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const clearBySource = (source: string) => {
    setAlerts(prev => prev.filter(alert => alert.source !== source));
  };

  return (
    <EnhancedAlertContext.Provider value={{ alerts, addAlert, removeAlert, clearAlerts, clearBySource }}>
      {children}
      <AlertContainer />
    </EnhancedAlertContext.Provider>
  );
};

const AlertContainer = () => {
  const { alerts, removeAlert } = useEnhancedAlerts();
  
  // Group alerts by position
  const alertsByPosition = alerts.reduce((acc, alert) => {
    const position = alert.position || 'top-right';
    if (!acc[position]) acc[position] = [];
    acc[position].push(alert);
    return acc;
  }, {} as Record<string, AlertMessage[]>);

  return (
    <>
      {Object.entries(alertsByPosition).map(([position, positionAlerts]) => (
        <div
          key={position}
          className={cn(
            "fixed z-50 space-y-2 max-w-md",
            position === 'top-right' && "top-4 right-4",
            position === 'top-left' && "top-4 left-4",
            position === 'bottom-right' && "bottom-4 right-4",
            position === 'bottom-left' && "bottom-4 left-4",
            position === 'top-center' && "top-4 left-1/2 -translate-x-1/2"
          )}
        >
          <AnimatePresence>
            {positionAlerts.map(alert => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                onDismiss={() => removeAlert(alert.id)} 
              />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

interface AlertCardProps {
  alert: AlertMessage;
  onDismiss: () => void;
}

const AlertCard = ({ alert, onDismiss }: AlertCardProps) => {
  const getIcon = () => {
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

  const getSourceBadge = () => {
    if (!alert.source) return null;
    
    const sourceConfig = {
      supabase: { label: 'Database', className: 'bg-green-100 text-green-800' },
      form: { label: 'Form', className: 'bg-blue-100 text-blue-800' },
      system: { label: 'System', className: 'bg-gray-100 text-gray-800' },
      user: { label: 'User', className: 'bg-purple-100 text-purple-800' }
    };

    const config = sourceConfig[alert.source as keyof typeof sourceConfig];
    if (!config) return null;

    return (
      <span className={cn("text-xs px-2 py-1 rounded-full", config.className)}>
        {config.label}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Alert variant={getVariant()} className={cn(
        "shadow-lg border-l-4 backdrop-blur-sm",
        alert.type === 'success' && "border-l-green-500 bg-green-50/90 dark:bg-green-950/90",
        alert.type === 'warning' && "border-l-yellow-500 bg-yellow-50/90 dark:bg-yellow-950/90",
        alert.type === 'info' && "border-l-blue-500 bg-blue-50/90 dark:bg-blue-950/90",
        alert.type === 'error' && "border-l-red-500"
      )}>
        {getIcon()}
        <div className="flex-1">
          <AlertTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {alert.title}
              {getSourceBadge()}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-6 w-6 p-0"
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
    </motion.div>
  );
};

// Predefined alert helpers for Supabase integration
export const supabaseAlertHelpers = {
  databaseSuccess: (operation: string, table?: string) => ({
    type: 'success' as const,
    title: 'Database Operation Successful',
    message: `${operation}${table ? ` in ${table}` : ''} completed successfully`,
    source: 'supabase' as const,
    duration: 3000
  }),

  databaseError: (operation: string, error: string) => ({
    type: 'error' as const,
    title: 'Database Error',
    message: `${operation} failed: ${error}`,
    source: 'supabase' as const,
    persistent: true,
    actions: [
      {
        label: 'Retry',
        onClick: () => console.log('Retry operation')
      }
    ]
  }),

  authSuccess: (action: string) => ({
    type: 'success' as const,
    title: 'Authentication Successful',
    message: `${action} completed successfully`,
    source: 'supabase' as const,
    duration: 3000
  }),

  authError: (action: string, error: string) => ({
    type: 'error' as const,
    title: 'Authentication Error',
    message: `${action} failed: ${error}`,
    source: 'supabase' as const,
    persistent: true
  }),

  validationError: (field: string, message: string) => ({
    type: 'error' as const,
    title: 'Validation Error',
    message: `${field}: ${message}`,
    source: 'form' as const,
    duration: 6000
  }),

  networkError: () => ({
    type: 'warning' as const,
    title: 'Network Issue',
    message: 'Connection lost. Attempting to reconnect...',
    source: 'system' as const,
    persistent: true,
    actions: [
      {
        label: 'Retry Now',
        onClick: () => window.location.reload()
      }
    ]
  })
};

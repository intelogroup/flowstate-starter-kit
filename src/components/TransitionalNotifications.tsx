
import { useState, useEffect } from "react";
import { Bell, X, CheckCircle, AlertTriangle, Info, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TransitionalNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  autoHide?: boolean;
  duration?: number;
  actionable?: boolean;
  onAction?: () => void;
  actionText?: string;
}

export const TransitionalNotificationCenter = () => {
  const [notifications, setNotifications] = useState<TransitionalNotification[]>([]);

  const addNotification = (notification: Omit<TransitionalNotification, 'id' | 'timestamp'>) => {
    const newNotification: TransitionalNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);

    if (notification.autoHide !== false) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Card key={notification.id} className="shadow-lg border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-foreground">{notification.title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(notification.timestamp)}
                  </span>
                  {notification.actionable && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={notification.onAction}
                      className="text-xs h-6"
                    >
                      {notification.actionText || 'Action'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Predefined notification templates
export const createFlowNotifications = {
  flowStarted: (flowName: string) => ({
    type: 'info' as const,
    title: 'Flow Execution Started',
    message: `${flowName} is now running`,
    autoHide: true,
    duration: 3000
  }),

  flowCompleted: (flowName: string, duration: string) => ({
    type: 'success' as const,
    title: 'Flow Completed Successfully',
    message: `${flowName} finished in ${duration}`,
    autoHide: true,
    duration: 5000
  }),

  flowFailed: (flowName: string, error: string) => ({
    type: 'error' as const,
    title: 'Flow Execution Failed',
    message: `${flowName}: ${error}`,
    autoHide: false,
    actionable: true,
    actionText: 'View Details'
  }),

  connectionRestored: (serviceName: string) => ({
    type: 'success' as const,
    title: 'Connection Restored',
    message: `Successfully reconnected to ${serviceName}`,
    autoHide: true,
    duration: 4000
  }),

  quotaWarning: (percentage: number) => ({
    type: 'warning' as const,
    title: 'Quota Warning',
    message: `You've used ${percentage}% of your monthly execution limit`,
    autoHide: false,
    actionable: true,
    actionText: 'Upgrade Plan'
  })
};


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Settings, AlertTriangle, RefreshCw } from "lucide-react";
import { InlineErrorState } from "@/components/ErrorStates";
import { cn } from "@/lib/utils";

interface FlowError {
  type: 'connection' | 'auth' | 'execution' | 'configuration';
  message: string;
  actionRequired?: boolean;
}

interface FlowCardWithErrorHandlingProps {
  flow: {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'paused' | 'error';
    lastRun: string;
    error?: FlowError;
  };
  onToggle: (id: number) => void;
  onSettings: (id: number) => void;
  onRetry: (id: number) => void;
  onReconnect?: (id: number) => void;
}

const FlowCardWithErrorHandling = ({ 
  flow, 
  onToggle, 
  onSettings, 
  onRetry,
  onReconnect 
}: FlowCardWithErrorHandlingProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getErrorTitle = (type: string) => {
    switch (type) {
      case 'connection': return 'Connection Failed';
      case 'auth': return 'Authentication Required';
      case 'execution': return 'Execution Error';
      case 'configuration': return 'Configuration Issue';
      default: return 'Error';
    }
  };

  const getErrorActions = (error: FlowError) => {
    switch (error.type) {
      case 'connection':
        return onReconnect ? () => onReconnect(flow.id) : () => onRetry(flow.id);
      case 'auth':
        return onReconnect ? () => onReconnect(flow.id) : undefined;
      default:
        return () => onRetry(flow.id);
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200",
      flow.status === 'error' && "border-red-200 bg-red-50/50 dark:bg-red-950/20"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center relative">
              <Play className="w-6 h-6 text-primary" />
              <div className={cn(
                "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                getStatusColor(flow.status)
              )} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                <Badge variant={flow.status === 'active' ? 'default' : 'secondary'}>
                  {flow.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{flow.description}</p>
              <p className="text-sm text-muted-foreground">Last run: {flow.lastRun}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onToggle(flow.id)}
              disabled={flow.status === 'error'}
            >
              {flow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSettings(flow.id)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {flow.error && (
          <InlineErrorState
            title={getErrorTitle(flow.error.type)}
            message={flow.error.message}
            type={flow.error.type === 'connection' ? 'network' : flow.error.type === 'auth' ? 'auth' : 'general'}
            onRetry={getErrorActions(flow.error)}
            className="mt-4"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default FlowCardWithErrorHandling;

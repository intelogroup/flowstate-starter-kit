
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Loader, RefreshCw, Settings, Info } from "lucide-react";

interface ServiceConnectionCardProps {
  name: string;
  icon: React.ElementType;
  status: "connected" | "needs_reauth" | "disconnected" | "connecting";
  lastAuth?: string;
  permissions: string[];
  healthStatus: "healthy" | "warning" | "error";
  apiCalls?: {
    used: number;
    limit: number;
    resetPeriod: string;
  };
  onConnect?: () => void;
  onDisconnect?: () => void;
  onRefresh?: () => void;
}

const ServiceConnectionCard = ({
  name,
  icon: Icon,
  status,
  lastAuth,
  permissions,
  healthStatus,
  apiCalls,
  onConnect,
  onDisconnect,
  onRefresh
}: ServiceConnectionCardProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'needs_reauth': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'disconnected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'connecting': return <Loader className="w-5 h-5 animate-spin text-blue-600" />;
      default: return <XCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'border-green-200 bg-green-50 dark:bg-green-950';
      case 'needs_reauth': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950';
      case 'disconnected': return 'border-red-200 bg-red-50 dark:bg-red-950';
      case 'connecting': return 'border-blue-200 bg-blue-50 dark:bg-blue-950';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'needs_reauth': return 'Needs Reauth';
      case 'disconnected': return 'Not Connected';
      case 'connecting': return 'Connecting...';
      default: return 'Unknown';
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    if (onConnect) {
      await onConnect();
    }
    // Simulate connection delay
    setTimeout(() => setIsConnecting(false), 2000);
  };

  return (
    <Card className={`${getStatusColor()}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon()}
                <Badge variant="outline" className="text-xs">
                  {getStatusText()}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Details */}
        <div className="space-y-2">
          {lastAuth && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last authenticated:</span>
              <span className="font-medium">{lastAuth}</span>
            </div>
          )}
          
          {apiCalls && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">API Usage:</span>
                <span className="font-medium">{apiCalls.used}/{apiCalls.limit}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${(apiCalls.used / apiCalls.limit) * 100}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Resets {apiCalls.resetPeriod}
              </div>
            </div>
          )}
        </div>

        {/* Permissions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Permissions:</span>
            <Info className="w-3 h-3 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-1">
            {permissions.map((permission, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {permission}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {status === 'disconnected' && (
            <Button 
              className="flex-1" 
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Connect"
              )}
            </Button>
          )}
          
          {status === 'needs_reauth' && (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Reauthorize"
              )}
            </Button>
          )}
          
          {status === 'connected' && (
            <>
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={onDisconnect}>
                Disconnect
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceConnectionCard;


import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, AlertTriangle, Loader2 } from "lucide-react";

interface SmartFlowStatusIndicatorProps {
  lastRunStatus: 'SUCCESS' | 'FAILURE' | 'PENDING' | 'AWAITING_USER_INPUT' | 'IDLE';
  lastRunTimestamp: string;
  isActive: boolean;
}

const SmartFlowStatusIndicator = ({ 
  lastRunStatus, 
  lastRunTimestamp, 
  isActive 
}: SmartFlowStatusIndicatorProps) => {
  const getStatusConfig = () => {
    if (!isActive) {
      return {
        icon: Clock,
        color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
        text: 'Paused',
        dot: 'bg-gray-400'
      };
    }

    switch (lastRunStatus) {
      case 'SUCCESS':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          text: getLastRunText(),
          dot: 'bg-green-500'
        };
      case 'FAILURE':
        return {
          icon: XCircle,
          color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
          text: 'Last run: Failed',
          dot: 'bg-red-500'
        };
      case 'PENDING':
        return {
          icon: Loader2,
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
          text: 'Running...',
          dot: 'bg-blue-500 animate-pulse'
        };
      case 'AWAITING_USER_INPUT':
        return {
          icon: AlertTriangle,
          color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
          text: 'Action Required',
          dot: 'bg-amber-500'
        };
      default:
        return {
          icon: Clock,
          color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
          text: 'Idle',
          dot: 'bg-gray-400'
        };
    }
  };

  const getLastRunText = () => {
    const now = new Date();
    const runTime = new Date(lastRunTimestamp);
    const diffMinutes = Math.floor((now.getTime() - runTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Last run: Just now';
    if (diffMinutes < 60) return `Last run: ${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `Last run: ${Math.floor(diffMinutes / 60)}h ago`;
    return `Last run: ${runTime.toLocaleDateString()}`;
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className="text-sm text-muted-foreground">{config.text}</span>
    </div>
  );
};

export default SmartFlowStatusIndicator;

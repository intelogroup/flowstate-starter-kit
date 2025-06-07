
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Pause, Loader2, AlertTriangle } from "lucide-react";

interface FlowStatusIndicatorProps {
  status: string;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const FlowStatusIndicator = ({ status, isLoading, size = 'md' }: FlowStatusIndicatorProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          text: 'Active'
        };
      case 'paused':
        return {
          icon: Pause,
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
          text: 'Paused'
        };
      case 'error':
        return {
          icon: AlertTriangle,
          color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
          text: 'Error'
        };
      default:
        return {
          icon: XCircle,
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
          text: 'Inactive'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = isLoading ? Loader2 : config.icon;
  
  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <Badge className={config.color}>
      <Icon className={`${iconSize} mr-1 ${isLoading ? 'animate-spin' : ''}`} />
      {isLoading ? 'Updating...' : config.text}
    </Badge>
  );
};

export default FlowStatusIndicator;

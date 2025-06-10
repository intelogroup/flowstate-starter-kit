
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'active' | 'paused' | 'error' | 'success' | 'warning' | 'default';
  children: React.ReactNode;
  className?: string;
}

const StatusBadge = ({ status, children, className }: StatusBadgeProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
        return 'default';
      case 'paused':
      case 'warning':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'paused':
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return '';
    }
  };

  return (
    <Badge 
      variant={getStatusVariant(status) as any}
      className={cn(getStatusColor(status), className)}
    >
      {children}
    </Badge>
  );
};

export default StatusBadge;

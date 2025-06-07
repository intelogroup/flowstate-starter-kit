
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface FlowMetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    trend: "up" | "down";
  };
  status?: "healthy" | "warning" | "error";
  subtitle?: string;
  icon?: React.ElementType;
}

const FlowMetricsCard = ({ 
  title, 
  value, 
  change, 
  status, 
  subtitle, 
  icon: Icon = Activity 
}: FlowMetricsCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <Icon className={`h-4 w-4 ${getStatusColor()}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {change && (
          <div className="flex items-center gap-1 mt-2">
            {change.trend === "up" ? (
              <TrendingUp className="w-3 h-3 text-green-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-600" />
            )}
            <span className={`text-xs ${
              change.trend === "up" ? "text-green-600" : "text-red-600"
            }`}>
              {Math.abs(change.value)}% vs {change.period}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlowMetricsCard;

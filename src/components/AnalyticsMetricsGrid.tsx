
import { ArrowUpRight, ArrowDownRight, Activity, Zap, Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Metric {
  value: number;
  change: number;
  trend: "up" | "down";
}

interface Metrics {
  totalAutomations: Metric;
  totalExecutions: Metric;
  activeAutomations: Metric;
  withErrors: Metric;
  successRate: Metric;
  activeUsers: Metric;
  avgExecutionTime: Metric;
  totalFlows: Metric;
  errorRate: Metric;
}

const AnalyticsMetricsGrid = () => {
  const metrics: Metrics = {
    totalAutomations: { value: 4, change: 0, trend: "up" },
    totalExecutions: { value: 325, change: 15.2, trend: "up" },
    activeAutomations: { value: 2, change: 0, trend: "up" },
    withErrors: { value: 1, change: -50, trend: "down" },
    successRate: { value: 98.7, change: 2.1, trend: "up" },
    activeUsers: { value: 573, change: 8.7, trend: "up" },
    avgExecutionTime: { value: 2.3, change: -12.5, trend: "down" },
    totalFlows: { value: 47, change: 6.8, trend: "up" },
    errorRate: { value: 1.3, change: -15.2, trend: "down" }
  };

  const getMetricIcon = (key: string) => {
    const icons: Record<string, React.ElementType> = {
      totalAutomations: Activity,
      totalExecutions: Zap,
      activeAutomations: CheckCircle,
      withErrors: XCircle,
      successRate: CheckCircle,
      activeUsers: Users,
      avgExecutionTime: Clock,
      totalFlows: Activity,
      errorRate: XCircle
    };
    return icons[key] || Activity;
  };

  const formatMetricValue = (key: string, value: number) => {
    switch (key) {
      case 'successRate':
      case 'errorRate':
        return `${value}%`;
      case 'avgExecutionTime':
        return `${value}s`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {Object.entries(metrics).map(([key, metric]) => {
        const Icon = getMetricIcon(key);
        const isPositive = (key === 'errorRate' || key === 'withErrors') ? metric.trend === 'down' : metric.trend === 'up';
        
        return (
          <Card key={key} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${
                  key === 'errorRate' || key === 'withErrors' ? 'text-red-500' : 
                  key === 'successRate' || key === 'activeAutomations' ? 'text-green-500' : 'text-blue-500'
                }`} />
                {metric.change !== 0 && (
                  <div className={`flex items-center text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(metric.change)}%
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {formatMetricValue(key, metric.value)}
              </div>
              <p className="text-xs text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsMetricsGrid;

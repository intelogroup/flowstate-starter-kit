
import { TrendingUp, Activity, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsOverviewProps {
  onMetricClick: (metricType: string) => void;
}

const AnalyticsOverview = ({ onMetricClick }: AnalyticsOverviewProps) => {
  const metrics = [
    {
      id: "executions",
      title: "Total Executions",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
      description: "Flow runs in the last 30 days"
    },
    {
      id: "successRate", 
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      description: "Successful executions"
    },
    {
      id: "avgResponseTime",
      title: "Avg Response Time", 
      value: "1.8s",
      change: "-0.3s",
      trend: "up",
      icon: Clock,
      description: "Average execution time"
    },
    {
      id: "errorRate",
      title: "Error Rate",
      value: "5.8%", 
      change: "-1.2%",
      trend: "up",
      icon: AlertCircle,
      description: "Failed executions"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === "up";
        
        return (
          <Card 
            key={metric.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/20"
            onClick={() => onMetricClick(metric.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={`flex items-center ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.change}
                </span>
                <span>vs last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsOverview;

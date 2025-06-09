
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, Play, TrendingUp, AlertTriangle, ArrowRight, Eye } from "lucide-react";

interface InteractiveQuickStatsProps {
  onMetricClick: (metric: string) => void;
}

const InteractiveQuickStats = ({ onMetricClick }: InteractiveQuickStatsProps) => {
  const metrics = [
    {
      id: "total-flows",
      title: "Total Flows",
      value: "12",
      change: "+2 this week",
      trend: "up",
      icon: Workflow,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      description: "All automation flows"
    },
    {
      id: "active-flows", 
      title: "Active",
      value: "8",
      change: "+1 today",
      trend: "up",
      icon: Play,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      description: "Currently running flows"
    },
    {
      id: "runs-today",
      title: "Runs Today", 
      value: "47",
      change: "+12 vs yesterday",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      description: "Successful executions"
    },
    {
      id: "issues",
      title: "Issues",
      value: "2",
      change: "-1 resolved",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      description: "Flows needing attention"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={metric.id}
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary/20 hover:-translate-y-1"
            onClick={() => onMetricClick(metric.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMetricClick(metric.id);
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                
                <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {metric.value}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {metric.change}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InteractiveQuickStats;

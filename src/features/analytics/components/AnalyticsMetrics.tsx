
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { AnalyticsMetric } from "../types";

interface AnalyticsMetricsProps {
  metrics: AnalyticsMetric[];
}

const AnalyticsMetrics = ({ metrics }: AnalyticsMetricsProps) => {
  const formatValue = (value: number | string, format: string) => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'duration':
        return `${value}s`;
      case 'currency':
        return `$${value}`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
            {metric.trend === 'up' ? (
              <ArrowUpIcon className="h-4 w-4 text-green-600" />
            ) : metric.trend === 'down' ? (
              <ArrowDownIcon className="h-4 w-4 text-red-600" />
            ) : null}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatValue(metric.value, metric.format)}
            </div>
            <p className={`text-xs ${
              metric.trend === 'up' ? 'text-green-600' : 
              metric.trend === 'down' ? 'text-red-600' : 
              'text-muted-foreground'
            }`}>
              {metric.change > 0 ? '+' : ''}{metric.change}% from last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsMetrics;

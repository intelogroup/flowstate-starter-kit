
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsData } from "../types";

interface AnalyticsOverviewProps {
  data: AnalyticsData | null;
}

const AnalyticsOverview = ({ data }: AnalyticsOverviewProps) => {
  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Flows</p>
            <p className="text-2xl font-bold">{data.totalFlows}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Flows</p>
            <p className="text-2xl font-bold">{data.activeFlows}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-bold">{data.successRate}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Executions</p>
            <p className="text-2xl font-bold">{data.totalExecutions.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsOverview;

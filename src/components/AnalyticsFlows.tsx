
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AnalyticsFlows = () => {
  const topFlows = [
    { name: "Email Invoice Processing", executions: 2847, successRate: 99.2, avgTime: "2.1s" },
    { name: "Lead Qualification", executions: 1923, successRate: 97.8, avgTime: "1.8s" },
    { name: "Document Analysis", executions: 1654, successRate: 96.5, avgTime: "4.2s" },
    { name: "Social Media Monitor", executions: 1432, successRate: 98.9, avgTime: "1.2s" },
    { name: "Customer Onboarding", executions: 987, successRate: 95.3, avgTime: "3.5s" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Flows</CardTitle>
          <CardDescription>Your most active automation flows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topFlows.map((flow, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{flow.name}</h4>
                    <p className="text-sm text-muted-foreground">{flow.executions.toLocaleString()} executions</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-green-600">{flow.successRate}%</div>
                    <div className="text-muted-foreground">Success</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">{flow.avgTime}</div>
                    <div className="text-muted-foreground">Avg Time</div>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsFlows;

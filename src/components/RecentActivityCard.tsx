
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivityCard = () => {
  const recentActivity = [
    { id: 1, automation: "Email to Drive", action: "Execution completed", time: "2 min ago", status: "success" },
    { id: 2, automation: "Slack Notifications", action: "New email processed", time: "5 min ago", status: "success" },
    { id: 3, automation: "Contact Form to CRM", action: "Contact added", time: "12 min ago", status: "success" },
    { id: 4, automation: "Invoice Processing", action: "Failed - Auth required", time: "1 hour ago", status: "error" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest automation executions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.automation}</p>
                <p className="text-xs text-muted-foreground">{item.action}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {item.time}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;

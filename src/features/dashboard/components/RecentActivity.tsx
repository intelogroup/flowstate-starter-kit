
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecentActivityItem } from "../types";

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'flow_created':
        return <Badge variant="default">Created</Badge>;
      case 'flow_executed':
        return <Badge variant="secondary">Executed</Badge>;
      case 'flow_error':
        return <Badge variant="destructive">Error</Badge>;
      case 'flow_paused':
        return <Badge variant="outline">Paused</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{activity.title}</h4>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
              {getActivityBadge(activity.type)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

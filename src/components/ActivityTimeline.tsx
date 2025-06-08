
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Play, Pause, Settings, Trash2, Plus, AlertTriangle } from "lucide-react";

interface ActivityItem {
  id: number;
  type: 'created' | 'activated' | 'paused' | 'modified' | 'deleted' | 'error';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  flowName?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: 1,
    type: 'created',
    title: 'Flow Created',
    description: 'Gmail to Slack Notifications flow was created',
    timestamp: '2 minutes ago',
    user: 'You',
    flowName: 'Gmail to Slack'
  },
  {
    id: 2,
    type: 'activated',
    title: 'Flow Activated',
    description: 'CRM Integration flow is now running',
    timestamp: '15 minutes ago',
    user: 'You',
    flowName: 'CRM Integration'
  },
  {
    id: 3,
    type: 'error',
    title: 'Execution Failed',
    description: 'Google Drive Backup failed due to authentication error',
    timestamp: '1 hour ago',
    flowName: 'Google Drive Backup'
  },
  {
    id: 4,
    type: 'modified',
    title: 'Flow Updated',
    description: 'Settings changed for Social Media Scheduler',
    timestamp: '2 hours ago',
    user: 'You',
    flowName: 'Social Media Scheduler'
  },
  {
    id: 5,
    type: 'paused',
    title: 'Flow Paused',
    description: 'Email Parser flow was paused for maintenance',
    timestamp: '4 hours ago',
    user: 'You',
    flowName: 'Email Parser'
  }
];

const ActivityTimeline = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'activated':
        return <Play className="w-4 h-4 text-green-600" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'modified':
        return <Settings className="w-4 h-4 text-blue-600" />;
      case 'deleted':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Settings className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'created':
      case 'activated':
        return 'default';
      case 'paused':
        return 'secondary';
      case 'error':
      case 'deleted':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4">
              <div className="relative">
                <div className="w-8 h-8 bg-background border-2 border-border rounded-full flex items-center justify-center">
                  {getIcon(activity.type)}
                </div>
                {index < mockActivities.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-px h-6 bg-border transform -translate-x-1/2" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <Badge variant={getBadgeVariant(activity.type)} className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                
                <div className="flex items-center gap-2">
                  {activity.flowName && (
                    <Badge variant="outline" className="text-xs">
                      {activity.flowName}
                    </Badge>
                  )}
                  {activity.user && (
                    <div className="flex items-center gap-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-xs">
                          {activity.user.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {activity.user}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;

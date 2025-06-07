
import { Plus, Play, Pause, Settings, MoreHorizontal, Workflow, ArrowRight, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const MyFlows = () => {
  const flows = [
    {
      id: 1,
      name: "Email Invoice Processing",
      description: "Automatically process invoices from email attachments and save to Google Drive",
      status: "active",
      trigger: "Gmail",
      actions: ["Google Drive", "Google Sheets", "Slack"],
      lastRun: "2 min ago",
      runsToday: 12,
      totalRuns: 1247,
      successRate: "98.5%",
      createdAt: "2 weeks ago"
    },
    {
      id: 2,
      name: "Customer Support Flow",
      description: "Route support emails to appropriate Slack channels and create Notion tickets",
      status: "active",
      trigger: "Gmail",
      actions: ["Slack", "Notion", "Email"],
      lastRun: "15 min ago",
      runsToday: 8,
      totalRuns: 892,
      successRate: "99.2%",
      createdAt: "1 month ago"
    },
    {
      id: 3,
      name: "Lead Qualification",
      description: "Qualify leads from contact forms and add to CRM with follow-up emails",
      status: "paused",
      trigger: "Webhook",
      actions: ["CRM", "Email", "Google Sheets"],
      lastRun: "2 hours ago",
      runsToday: 0,
      totalRuns: 456,
      successRate: "96.8%",
      createdAt: "3 weeks ago"
    },
    {
      id: 4,
      name: "Social Media Monitor",
      description: "Monitor brand mentions and send alerts to marketing team",
      status: "error",
      trigger: "Twitter API",
      actions: ["Slack", "Email", "Database"],
      lastRun: "1 day ago",
      runsToday: 0,
      totalRuns: 234,
      successRate: "94.1%",
      createdAt: "1 week ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Flows</h1>
          <p className="text-muted-foreground">Manage and monitor your automation workflows</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create New Flow
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Flows</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Workflow className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <Play className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Runs Today</p>
                <p className="text-2xl font-bold text-blue-600">47</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Search flows..." 
          className="max-w-md"
        />
        <Button variant="outline">All Status</Button>
        <Button variant="outline">All Triggers</Button>
      </div>

      {/* Flows List */}
      <div className="space-y-4">
        {flows.map((flow) => (
          <Card key={flow.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Workflow className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                      <Badge className={getStatusColor(flow.status)}>
                        {flow.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{flow.description}</p>
                    
                    {/* Flow Chain */}
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="text-xs font-medium">
                        {flow.trigger}
                      </Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <div className="flex items-center gap-1">
                        {flow.actions.map((action, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    {flow.status === 'active' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Run</span>
                  <div className="font-medium text-foreground">{flow.lastRun}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Runs Today</span>
                  <div className="font-medium text-foreground">{flow.runsToday}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Runs</span>
                  <div className="font-medium text-foreground">{flow.totalRuns}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Success Rate</span>
                  <div className="font-medium text-foreground">{flow.successRate}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Created</span>
                  <div className="font-medium text-foreground">{flow.createdAt}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyFlows;

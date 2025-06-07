
import { ArrowLeft, Play, Pause, Settings, MoreHorizontal, Workflow, Clock, TrendingUp, AlertTriangle, Edit, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";

const FlowDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock flow data - in real app this would come from API/state
  const flow = {
    id: parseInt(id || "1"),
    name: "Email Invoice Processing",
    description: "Automatically process invoices from email attachments and save to Google Drive",
    status: "active",
    trigger: "Gmail",
    actions: ["Google Drive", "Google Sheets", "Slack"],
    lastRun: "2 min ago",
    runsToday: 12,
    totalRuns: 1247,
    successRate: "98.5%",
    createdAt: "2 weeks ago",
    averageRunTime: "15s"
  };

  const recentRuns = [
    { id: 1, timestamp: "2 min ago", status: "success", duration: "12s", details: "Invoice processed successfully" },
    { id: 2, timestamp: "15 min ago", status: "success", duration: "18s", details: "Invoice processed successfully" },
    { id: 3, timestamp: "32 min ago", status: "error", duration: "5s", details: "Authentication failed for Gmail" },
    { id: 4, timestamp: "1 hour ago", status: "success", duration: "14s", details: "Invoice processed successfully" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getRunStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{flow.name}</h1>
              <Badge className={getStatusColor(flow.status)}>
                {flow.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{flow.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Flow
          </Button>
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline">
            {flow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Runs Today</p>
                <p className="text-2xl font-bold text-foreground">{flow.runsToday}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Runs</p>
                <p className="text-2xl font-bold text-foreground">{flow.totalRuns}</p>
              </div>
              <Workflow className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">{flow.successRate}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Runtime</p>
                <p className="text-2xl font-bold text-foreground">{flow.averageRunTime}</p>
              </div>
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Run</p>
                <p className="text-2xl font-bold text-foreground">{flow.lastRun}</p>
              </div>
              <Clock className="w-6 h-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flow Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Flow Configuration</CardTitle>
            <CardDescription>Current setup and connections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Trigger</h4>
              <Badge variant="outline">{flow.trigger}</Badge>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Actions</h4>
              <div className="flex flex-wrap gap-2">
                {flow.actions.map((action, idx) => (
                  <Badge key={idx} variant="outline">{action}</Badge>
                ))}
              </div>
            </div>
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Test Flow
            </Button>
          </CardContent>
        </Card>

        {/* Recent Runs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Runs</CardTitle>
            <CardDescription>Latest execution history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRuns.map((run) => (
                <div key={run.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${getRunStatusColor(run.status)}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{run.timestamp}</span>
                      <span className="text-xs text-muted-foreground">{run.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{run.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlowDetails;

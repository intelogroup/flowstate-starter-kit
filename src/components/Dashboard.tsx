
import { Search, Plus, TrendingUp, Activity, CheckCircle, AlertTriangle, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const recentActivity = [
    { id: 1, automation: "Email to Drive", action: "Execution completed", time: "2 min ago", status: "success" },
    { id: 2, automation: "Slack Notifications", action: "New email processed", time: "5 min ago", status: "success" },
    { id: 3, automation: "Contact Form to CRM", action: "Contact added", time: "12 min ago", status: "success" },
    { id: 4, automation: "Invoice Processing", action: "Failed - Auth required", time: "1 hour ago", status: "error" },
  ];

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search automations..." 
              className="pl-10 w-80"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <div className="text-foreground font-medium">John Doe</div>
          <div className="w-8 h-8 bg-primary rounded-full"></div>
        </div>
      </div>

      {/* Notification Banner */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="text-white w-4 h-4" />
              </div>
              <span className="text-blue-700 dark:text-blue-300">
                New! You can now request custom templates directly from the dashboard. Check out 'Request Template'!
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-700 dark:text-blue-300">×</Button>
          </div>
        </CardContent>
      </Card>

      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's what's happening with your automations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-600 dark:text-green-400">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Executions This Month</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">127 / 500 limit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-green-600 dark:text-green-400">+0.5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attention Required */}
        <Card className="border-destructive/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <CardTitle className="text-destructive">Attention Required</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Gmail access expired for "Email to Drive - Invoices"</p>
              <p className="text-sm text-muted-foreground">This automation has been paused</p>
            </div>
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
              Reconnect Gmail
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
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
      </div>
    </div>
  );
};

export default Dashboard;

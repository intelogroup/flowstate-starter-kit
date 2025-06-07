import { Search, Plus, TrendingUp, Activity, CheckCircle, AlertTriangle, Clock, Zap, Mail, MessageSquare, FileSpreadsheet, ArrowRight, Workflow, Play, Pause, Sparkles, Settings, Bell, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlowSearchChat from "./FlowSearchChat";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAISearch, setShowAISearch] = useState(false);

  const handleTemplateSelect = (templateId: number) => {
    navigate(`/create-flow/${templateId}`);
  };

  const featuredTemplates = [
    {
      id: 1,
      title: "Email to Drive",
      description: "Save email attachments automatically",
      category: "Productivity",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      users: "1.2K users"
    },
    {
      id: 2,
      title: "Email to WhatsApp",
      description: "Get WhatsApp notifications for emails",
      category: "Communication",
      icon: Mail,
      targetIcon: MessageSquare,
      users: "890 users"
    },
    {
      id: 3,
      title: "Email to Sheets",
      description: "Log email details to spreadsheets",
      category: "Data Management",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      users: "520 users"
    }
  ];

  const activeFlows = [
    {
      id: 1,
      name: "Email Invoice Processing",
      description: "Automatically process invoices from email",
      status: "active",
      trigger: "Gmail",
      actions: ["Google Drive", "Google Sheets"],
      lastRun: "2 min ago",
      runsToday: 12
    },
    {
      id: 2,
      name: "Customer Support Flow",
      description: "Route support emails to Slack",
      status: "active", 
      trigger: "Gmail",
      actions: ["Slack", "Notion"],
      lastRun: "15 min ago",
      runsToday: 8
    },
    {
      id: 3,
      name: "Lead Qualification",
      description: "Qualify leads from contact forms",
      status: "paused",
      trigger: "Webhook",
      actions: ["CRM", "Email"],
      lastRun: "2 hours ago",
      runsToday: 0
    }
  ];

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
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
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

      {/* AI Search Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">AI Flow Search</CardTitle>
                <p className="text-xs text-muted-foreground">Describe what you want to automate</p>
              </div>
            </div>
            <Button 
              variant={showAISearch ? "secondary" : "default"}
              size="sm"
              onClick={() => setShowAISearch(!showAISearch)}
            >
              {showAISearch ? "Hide" : "AI Search"}
            </Button>
          </div>
        </CardHeader>
        {showAISearch && (
          <CardContent className="pt-0">
            <FlowSearchChat onTemplateSelect={handleTemplateSelect} />
          </CardContent>
        )}
      </Card>

      {/* Featured Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Popular Templates</h2>
            <p className="text-sm text-muted-foreground">Quick start with these automation templates</p>
          </div>
          <Button variant="outline" size="sm">
            View All Templates
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredTemplates.map((template) => {
            const SourceIcon = template.icon;
            const TargetIcon = template.targetIcon;
            
            return (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <SourceIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <TargetIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium text-foreground mb-1">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                  <p className="text-xs text-muted-foreground">{template.users}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Active Flows Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Active Flows</h2>
            <p className="text-sm text-muted-foreground">Your running automation workflows</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Flow
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeFlows.slice(0, 4).map((flow) => (
            <Card key={flow.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Workflow className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{flow.name}</h3>
                      <p className="text-sm text-muted-foreground">{flow.description}</p>
                    </div>
                  </div>
                  <Badge variant={flow.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {flow.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-muted-foreground">Trigger:</span>
                  <Badge variant="outline" className="text-xs">{flow.trigger}</Badge>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  {flow.actions.map((action, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{action}</Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last run: {flow.lastRun}</span>
                  <span>{flow.runsToday} runs today</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      {flow.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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

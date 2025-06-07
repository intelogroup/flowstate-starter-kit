
import { ArrowLeft, Play, Pause, Settings, MoreHorizontal, Workflow, Clock, TrendingUp, AlertTriangle, Edit, Copy, Trash2, Download, Share, RefreshCw, CheckCircle, XCircle, AlertCircle, Activity, Calendar, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const FlowDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("all");

  // Enhanced flow data with more realistic states
  const flow = {
    id: parseInt(id || "1"),
    name: "Email Invoice Processing",
    description: "Automatically process invoices from email attachments and save to Google Drive with data extraction",
    status: "active",
    trigger: "Gmail",
    actions: ["Google Drive", "Google Sheets", "Slack"],
    lastRun: "2 min ago",
    runsToday: 12,
    totalRuns: 1247,
    successRate: "98.5%",
    createdAt: "2 weeks ago",
    averageRunTime: "15s",
    version: "1.2",
    owner: "john@company.com",
    tags: ["finance", "automation", "invoices"],
    schedule: "Real-time",
    nextRun: "On email arrival",
    estimatedMonthlyCost: "$8.40",
    dataProcessed: "2.3 GB",
    alertsCount: 3
  };

  // More comprehensive run history with different states
  const recentRuns = [
    { 
      id: 1, 
      timestamp: "2 min ago", 
      status: "success", 
      duration: "12s", 
      details: "Invoice processed successfully",
      itemsProcessed: 3,
      triggerData: "invoice-2024-001.pdf",
      cost: "$0.02"
    },
    { 
      id: 2, 
      timestamp: "15 min ago", 
      status: "success", 
      duration: "18s", 
      details: "Invoice processed successfully",
      itemsProcessed: 2,
      triggerData: "receipt-march.pdf",
      cost: "$0.01"
    },
    { 
      id: 3, 
      timestamp: "32 min ago", 
      status: "error", 
      duration: "5s", 
      details: "Authentication failed for Gmail - token expired",
      itemsProcessed: 0,
      triggerData: "monthly-bills.pdf",
      cost: "$0.00",
      errorCode: "AUTH_EXPIRED"
    },
    { 
      id: 4, 
      timestamp: "1 hour ago", 
      status: "warning", 
      duration: "14s", 
      details: "Partial success - 2 of 3 files processed",
      itemsProcessed: 2,
      triggerData: "expense-report.zip",
      cost: "$0.01"
    },
    { 
      id: 5, 
      timestamp: "2 hours ago", 
      status: "success", 
      duration: "9s", 
      details: "Invoice processed successfully",
      itemsProcessed: 1,
      triggerData: "utility-bill.pdf",
      cost: "$0.01"
    }
  ];

  // Performance metrics over time
  const performanceData = {
    daily: { runs: 45, success: 43, errors: 2 },
    weekly: { runs: 312, success: 305, errors: 7 },
    monthly: { runs: 1247, success: 1228, errors: 19 }
  };

  // Flow configuration details
  const flowConfig = {
    trigger: {
      service: "Gmail",
      type: "Email Received",
      filter: "has:attachment from:accounting@*",
      schedule: "Real-time"
    },
    steps: [
      { id: 1, name: "Email Detection", service: "Gmail", status: "active", avgTime: "1.2s" },
      { id: 2, name: "Download Attachments", service: "Gmail", status: "active", avgTime: "3.4s" },
      { id: 3, name: "Extract Data", service: "OCR Service", status: "active", avgTime: "8.1s" },
      { id: 4, name: "Save to Drive", service: "Google Drive", status: "active", avgTime: "2.8s" },
      { id: 5, name: "Update Spreadsheet", service: "Google Sheets", status: "active", avgTime: "1.5s" },
      { id: 6, name: "Send Notification", service: "Slack", status: "warning", avgTime: "0.9s" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getRunStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'running': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRunStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'running': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredRuns = recentRuns.filter(run => 
    filterStatus === "all" || run.status === filterStatus
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
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
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{flowConfig.trigger.service}</Badge>
                      <span className="text-sm text-muted-foreground">{flowConfig.trigger.type}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Filter: {flowConfig.trigger.filter}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Processing Steps</h4>
                  <div className="space-y-2">
                    {flowConfig.steps.map((step, idx) => (
                      <div key={step.id} className="flex items-center justify-between p-2 bg-secondary rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{idx + 1}.</span>
                          <span className="text-sm">{step.name}</span>
                          <Badge variant="outline" className="text-xs">{step.service}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{step.avgTime}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            step.status === 'active' ? 'bg-green-500' :
                            step.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Test Flow
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest executions and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentRuns.slice(0, 5).map((run) => (
                    <div key={run.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      {getRunStatusIcon(run.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{run.timestamp}</span>
                          <span className="text-xs text-muted-foreground">{run.duration}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{run.details}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>Items: {run.itemsProcessed}</span>
                          <span>Cost: {run.cost}</span>
                          <span>{run.triggerData}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "runs":
        return (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Search runs..." className="pl-10" />
                  </div>
                  <select 
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="warning">Warning</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Runs List */}
            <Card>
              <CardHeader>
                <CardTitle>Execution History</CardTitle>
                <CardDescription>Detailed log of all flow executions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredRuns.map((run) => (
                    <div key={run.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer">
                      <div className={`w-3 h-3 rounded-full ${getRunStatusColor(run.status)}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{run.timestamp}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">{run.duration}</span>
                            <Badge variant="outline" className="text-xs">{run.status}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{run.details}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Trigger: {run.triggerData}</span>
                          <span>Items: {run.itemsProcessed}</span>
                          <span>Cost: {run.cost}</span>
                          {run.errorCode && <span className="text-red-600">Error: {run.errorCode}</span>}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "analytics":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Success rates and execution times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">{performanceData.daily.runs}</div>
                      <div className="text-xs text-muted-foreground">Daily Runs</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{performanceData.daily.success}</div>
                      <div className="text-xs text-muted-foreground">Successful</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{performanceData.daily.errors}</div>
                      <div className="text-xs text-muted-foreground">Errors</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-medium">{flow.successRate}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: flow.successRate }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Monthly usage and estimated costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{flow.estimatedMonthlyCost}</div>
                    <div className="text-xs text-muted-foreground">Estimated Monthly Cost</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Processed</span>
                      <span className="font-medium">{flow.dataProcessed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Runs</span>
                      <span className="font-medium">{flow.totalRuns}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Cost per Run</span>
                      <span className="font-medium">$0.007</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "settings":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flow Settings</CardTitle>
                <CardDescription>Configure your flow behavior and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">General Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Flow Name</label>
                      <Input defaultValue={flow.name} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                      <Input defaultValue={flow.description} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {flow.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                        <Button variant="outline" size="sm">+ Add Tag</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Execution Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Auto-retry failed runs</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Send error notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Log detailed execution data</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-foreground mb-3 text-red-600">Danger Zone</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Flow
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
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
              <Badge variant="outline">v{flow.version}</Badge>
            </div>
            <p className="text-muted-foreground">{flow.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>Created {flow.createdAt}</span>
              <span>•</span>
              <span>Owner: {flow.owner}</span>
              <span>•</span>
              <span>Schedule: {flow.schedule}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
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
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
              <CheckCircle className="w-6 h-6 text-green-600" />
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
                <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
                <p className="text-2xl font-bold text-foreground">{flow.estimatedMonthlyCost}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alerts</p>
                <p className="text-2xl font-bold text-foreground">{flow.alertsCount}</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "runs", label: "Runs", icon: Workflow },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "settings", label: "Settings", icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default FlowDetails;


import { useState } from "react";
import { Plus, Play, Pause, MoreHorizontal, Activity, Settings, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FlowStatusIndicator from "./FlowStatusIndicator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Automation {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  executions: number;
  successRate: string;
  createdAt: string;
  trigger: string;
}

const MyAutomations = () => {
  const navigate = useNavigate();
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: 1,
      name: "Email to Drive - Invoices",
      description: "Automatically save invoice attachments from Gmail to Google Drive",
      status: "paused",
      lastRun: "2 hours ago",
      executions: 124,
      successRate: "98.4%",
      createdAt: "2 weeks ago",
      trigger: "Gmail"
    },
    {
      id: 2,
      name: "Slack Notifications",
      description: "Send important emails and alerts to designated Slack channels",
      status: "active",
      lastRun: "5 minutes ago",
      executions: 89,
      successRate: "100%",
      createdAt: "1 month ago",
      trigger: "Email"
    },
    {
      id: 3,
      name: "Contact Form to CRM",
      description: "Add website contact form submissions to CRM system",
      status: "active",
      lastRun: "1 hour ago",
      executions: 45,
      successRate: "96.7%",
      createdAt: "3 weeks ago",
      trigger: "Webhook"
    },
    {
      id: 4,
      name: "Document Processing",
      description: "Process and categorize uploaded documents automatically",
      status: "error",
      lastRun: "1 day ago",
      executions: 67,
      successRate: "89.2%",
      createdAt: "1 week ago",
      trigger: "File Upload"
    }
  ];

  const [loadingAutomations, setLoadingAutomations] = useState<Set<number>>(new Set());

  const handleToggleAutomation = (automationId: number, currentStatus: string) => {
    setLoadingAutomations(prev => new Set(prev).add(automationId));
    
    setTimeout(() => {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      setAutomations(prev => prev.map(automation => 
        automation.id === automationId 
          ? { ...automation, status: newStatus as 'active' | 'paused' | 'error' }
          : automation
      ));
      
      setLoadingAutomations(prev => {
        const newSet = new Set(prev);
        newSet.delete(automationId);
        return newSet;
      });

      const automation = automations.find(a => a.id === automationId);
      toast({
        title: `Automation ${newStatus === 'active' ? 'Activated' : 'Paused'}`,
        description: `${automation?.name} has been ${newStatus === 'active' ? 'activated' : 'paused'} successfully.`,
      });
    }, 1500);
  };

  const handleRunAutomation = (automationId: number) => {
    const automation = automations.find(a => a.id === automationId);
    toast({
      title: "Automation Triggered",
      description: `${automation?.name} has been manually triggered and is now running.`,
    });
  };

  const handleDuplicateAutomation = (automationId: number) => {
    const automation = automations.find(a => a.id === automationId);
    toast({
      title: "Automation Duplicated",
      description: `${automation?.name} has been duplicated successfully.`,
    });
  };

  const handleDeleteAutomation = (automationId: number) => {
    const automation = automations.find(a => a.id === automationId);
    setAutomations(prev => prev.filter(a => a.id !== automationId));
    toast({
      title: "Automation Deleted",
      description: `${automation?.name} has been deleted successfully.`,
      variant: "destructive"
    });
  };

  const getSuccessRateColor = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate >= 95) return "text-green-600";
    if (numRate >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Automations</h1>
          <p className="text-muted-foreground">Manage and monitor your active automations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/create-flow')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Automations</p>
                <p className="text-2xl font-bold text-foreground">{automations.length}</p>
              </div>
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {automations.filter(a => a.status === 'active').length}
                </p>
              </div>
              <Play className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Executions</p>
                <p className="text-2xl font-bold text-blue-600">
                  {automations.reduce((sum, a) => sum + a.executions, 0)}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Success Rate</p>
                <p className="text-2xl font-bold text-green-600">96.1%</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card key={automation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{automation.name}</h3>
                      <FlowStatusIndicator 
                        status={automation.status} 
                        isLoading={loadingAutomations.has(automation.id)}
                      />
                      <Badge variant="outline" className="text-xs">
                        {automation.trigger}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{automation.description}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRunAutomation(automation.id)}
                    disabled={loadingAutomations.has(automation.id)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleAutomation(automation.id, automation.status)}
                    disabled={loadingAutomations.has(automation.id)}
                  >
                    {automation.status === 'active' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDuplicateAutomation(automation.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Activity className="w-4 h-4 mr-2" />
                        View Logs
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteAutomation(automation.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Run</span>
                  <div className="font-medium text-foreground">{automation.lastRun}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Executions</span>
                  <div className="font-medium text-foreground">{automation.executions}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Success Rate</span>
                  <div className={`font-medium ${getSuccessRateColor(automation.successRate)}`}>
                    {automation.successRate}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Created</span>
                  <div className="font-medium text-foreground">{automation.createdAt}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Status</span>
                  <div className="font-medium text-foreground capitalize">{automation.status}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyAutomations;

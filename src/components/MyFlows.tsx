
import { useState } from "react";
import { Plus, Play, Pause, Settings, MoreHorizontal, Workflow, ArrowRight, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FlowActivationModal from "./FlowActivationModal";
import FlowStatusIndicator from "./FlowStatusIndicator";

const MyFlows = () => {
  const navigate = useNavigate();
  const [activationModal, setActivationModal] = useState<{
    isOpen: boolean;
    flowId: number | null;
    flowName: string;
    action: 'activate' | 'deactivate';
  }>({
    isOpen: false,
    flowId: null,
    flowName: '',
    action: 'activate'
  });
  const [loadingFlows, setLoadingFlows] = useState<Set<number>>(new Set());
  const [flowStatuses, setFlowStatuses] = useState<Record<number, string>>({
    1: 'active',
    2: 'active', 
    3: 'paused',
    4: 'error'
  });

  const flows = [
    {
      id: 1,
      name: "Email Invoice Processing",
      description: "Automatically process invoices from email attachments and save to Google Drive",
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
      trigger: "Twitter API",
      actions: ["Slack", "Email", "Database"],
      lastRun: "1 day ago",
      runsToday: 0,
      totalRuns: 234,
      successRate: "94.1%",
      createdAt: "1 week ago"
    }
  ];

  const handleRunFlow = (flowId: number, flowName: string) => {
    setLoadingFlows(prev => new Set(prev).add(flowId));
    
    setTimeout(() => {
      setLoadingFlows(prev => {
        const newSet = new Set(prev);
        newSet.delete(flowId);
        return newSet;
      });
      
      toast({
        title: "Flow Triggered",
        description: `${flowName} has been manually triggered and is now running.`,
      });
    }, 2000);
  };

  const handleToggleFlow = (flowId: number, currentStatus: string, flowName: string) => {
    const newAction = currentStatus === 'active' ? 'deactivate' : 'activate';
    
    setActivationModal({
      isOpen: true,
      flowId,
      flowName,
      action: newAction
    });
  };

  const handleActivationComplete = () => {
    if (activationModal.flowId) {
      const newStatus = activationModal.action === 'activate' ? 'active' : 'paused';
      setFlowStatuses(prev => ({
        ...prev,
        [activationModal.flowId!]: newStatus
      }));
      
      toast({
        title: `Flow ${activationModal.action === 'activate' ? 'Activated' : 'Paused'}`,
        description: `${activationModal.flowName} has been ${activationModal.action === 'activate' ? 'activated' : 'paused'}.`,
      });
    }
    
    setActivationModal({ isOpen: false, flowId: null, flowName: '', action: 'activate' });
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Flows</h1>
          <p className="text-muted-foreground">Manage and monitor your automation workflows</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/create-flow')}>
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
          <Card key={flow.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/flow/${flow.id}`)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Workflow className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                      <FlowStatusIndicator 
                        status={flowStatuses[flow.id]} 
                        isLoading={loadingFlows.has(flow.id)}
                      />
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
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRunFlow(flow.id, flow.name)}
                    disabled={loadingFlows.has(flow.id)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleFlow(flow.id, flowStatuses[flow.id], flow.name)}
                    disabled={loadingFlows.has(flow.id)}
                  >
                    {flowStatuses[flow.id] === 'active' ? (
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

      <FlowActivationModal
        isOpen={activationModal.isOpen}
        onClose={handleActivationComplete}
        flowName={activationModal.flowName}
        action={activationModal.action}
      />
    </div>
  );
};

export default MyFlows;

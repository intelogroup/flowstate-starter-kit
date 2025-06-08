import { useState } from "react";
import { Plus, Play, Pause, MoreHorizontal, Activity, Settings, Trash2, Copy, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FlowStatusIndicator from "./FlowStatusIndicator";
import FlowActivationModal from "./FlowActivationModal";
import AutomationErrorModal from "./AutomationErrorModal";
import AutomationEmptyState from "./AutomationEmptyState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  errorMessage?: string;
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
      trigger: "File Upload",
      errorMessage: "Authentication failed - Google Drive API connection expired"
    }
  ]);

  const [loadingAutomations, setLoadingAutomations] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [triggerFilter, setTriggerFilter] = useState<string>("all");
  
  const [activationModal, setActivationModal] = useState<{
    isOpen: boolean;
    automationId: number | null;
    automationName: string;
    action: 'activate' | 'deactivate';
  }>({
    isOpen: false,
    automationId: null,
    automationName: '',
    action: 'activate'
  });

  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    automation: Automation | null;
  }>({
    isOpen: false,
    automation: null
  });

  // Filter automations based on search and filters
  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || automation.status === statusFilter;
    const matchesTrigger = triggerFilter === "all" || automation.trigger === triggerFilter;
    
    return matchesSearch && matchesStatus && matchesTrigger;
  });

  const handleToggleAutomation = (automationId: number, currentStatus: string, automationName: string) => {
    const newAction = currentStatus === 'active' ? 'deactivate' : 'activate';
    
    setActivationModal({
      isOpen: true,
      automationId,
      automationName,
      action: newAction
    });
  };

  const handleActivationComplete = () => {
    if (activationModal.automationId) {
      const success = Math.random() > 0.15; // 85% success rate
      
      if (success) {
        const newStatus = activationModal.action === 'activate' ? 'active' : 'paused';
        setAutomations(prev => prev.map(automation => 
          automation.id === activationModal.automationId 
            ? { ...automation, status: newStatus as 'active' | 'paused' | 'error' }
            : automation
        ));
        
        toast({
          title: `Automation ${activationModal.action === 'activate' ? 'Activated' : 'Paused'}`,
          description: `${activationModal.automationName} has been ${activationModal.action === 'activate' ? 'activated' : 'paused'} successfully.`,
        });
      } else {
        toast({
          title: "Activation Failed",
          description: `Failed to ${activationModal.action} ${activationModal.automationName}. Please try again.`,
          variant: "destructive"
        });
      }
    }
    
    setActivationModal({ isOpen: false, automationId: null, automationName: '', action: 'activate' });
  };

  const handleRunAutomation = (automationId: number) => {
    setLoadingAutomations(prev => new Set(prev).add(automationId));
    
    setTimeout(() => {
      setLoadingAutomations(prev => {
        const newSet = new Set(prev);
        newSet.delete(automationId);
        return newSet;
      });

      const automation = automations.find(a => a.id === automationId);
      toast({
        title: "Automation Triggered",
        description: `${automation?.name} has been manually triggered and is now running.`,
      });
    }, 1500);
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

  const handleViewError = (automation: Automation) => {
    setErrorModal({
      isOpen: true,
      automation
    });
  };

  const getSuccessRateColor = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate >= 95) return "text-green-600";
    if (numRate >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const uniqueTriggers = Array.from(new Set(automations.map(a => a.trigger)));

  if (automations.length === 0) {
    return <AutomationEmptyState onCreateAutomation={() => navigate('/create-flow')} />;
  }

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

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search automations..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>

        <Select value={triggerFilter} onValueChange={setTriggerFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Triggers</SelectItem>
            {uniqueTriggers.map(trigger => (
              <SelectItem key={trigger} value={trigger}>{trigger}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* No Results State */}
      {filteredAutomations.length === 0 && automations.length > 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No automations found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setTriggerFilter("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Automations List */}
      <div className="space-y-4">
        {filteredAutomations.map((automation) => (
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
                      {automation.status === 'error' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleViewError(automation)}
                        >
                          View Error
                        </Button>
                      )}
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
                    disabled={loadingAutomations.has(automation.id) || activationModal.isOpen}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleAutomation(automation.id, automation.status, automation.name)}
                    disabled={loadingAutomations.has(automation.id) || activationModal.isOpen}
                  >
                    {automation.status === 'active' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm" disabled={activationModal.isOpen}>
                    <Settings className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" disabled={activationModal.isOpen}>
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

      <FlowActivationModal
        isOpen={activationModal.isOpen}
        onClose={handleActivationComplete}
        flowName={activationModal.automationName}
        action={activationModal.action}
      />

      <AutomationErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, automation: null })}
        automation={errorModal.automation}
        onRetry={(automationId) => {
          setErrorModal({ isOpen: false, automation: null });
          handleToggleAutomation(automationId, 'error', errorModal.automation?.name || '');
        }}
      />
    </div>
  );
};

export default MyAutomations;

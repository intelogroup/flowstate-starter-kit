
import { useState } from "react";
import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FlowActivationModal from "./FlowActivationModal";
import QuickStats from "./QuickStats";
import FlowFilters from "./FlowFilters";
import FlowCard from "./FlowCard";
import BulkActionsBar from "./BulkActionsBar";
import FlowSettingsModal from "./FlowSettingsModal";
import NotificationCenter from "./NotificationCenter";
import SearchWithAutocomplete from "./SearchWithAutocomplete";
import { mockFlows } from "@/types/flow";

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
  
  const [settingsModal, setSettingsModal] = useState<{
    isOpen: boolean;
    flowId: number | null;
    flowName: string;
  }>({
    isOpen: false,
    flowId: null,
    flowName: ''
  });
  
  const [selectedFlows, setSelectedFlows] = useState<Set<number>>(new Set());
  const [loadingFlows, setLoadingFlows] = useState<Set<number>>(new Set());
  const [flowStatuses, setFlowStatuses] = useState<Record<number, string>>({
    1: 'active',
    2: 'active', 
    3: 'paused',
    4: 'error'
  });

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

  const handleFlowSettings = (flowId: number, flowName: string) => {
    setSettingsModal({
      isOpen: true,
      flowId,
      flowName
    });
  };

  const handleActivationComplete = () => {
    if (activationModal.flowId) {
      const success = Math.random() > 0.15;
      
      if (success) {
        const newStatus = activationModal.action === 'activate' ? 'active' : 'paused';
        setFlowStatuses(prev => ({
          ...prev,
          [activationModal.flowId!]: newStatus
        }));
        
        toast({
          title: `Flow ${activationModal.action === 'activate' ? 'Activated' : 'Paused'}`,
          description: `${activationModal.flowName} has been ${activationModal.action === 'activate' ? 'activated' : 'paused'} successfully.`,
        });
        
        window.dispatchEvent(new CustomEvent('flowStatusChanged', { 
          detail: { 
            flowId: activationModal.flowId, 
            status: newStatus,
            action: activationModal.action
          }
        }));
      } else {
        toast({
          title: "Activation Failed",
          description: `Failed to ${activationModal.action} ${activationModal.flowName}. Please try again.`,
          variant: "destructive"
        });
      }
    }
    
    setActivationModal({ isOpen: false, flowId: null, flowName: '', action: 'activate' });
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for flows:`, Array.from(selectedFlows));
    toast({
      title: "Bulk Action",
      description: `${action} applied to ${selectedFlows.size} flows.`,
    });
    setSelectedFlows(new Set());
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement search logic here
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Flows</h1>
          <p className="text-muted-foreground">Manage and monitor your automation workflows</p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationCenter />
          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/create-flow')}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Flow
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Enhanced Search */}
      <SearchWithAutocomplete 
        onSearch={handleSearch}
        className="max-w-md"
      />

      {/* Search and Filters */}
      <FlowFilters />

      {/* Flows List */}
      <div className="space-y-4">
        {mockFlows.map((flow) => (
          <FlowCard
            key={flow.id}
            flow={flow}
            status={flowStatuses[flow.id]}
            isLoading={loadingFlows.has(flow.id)}
            isActivationModalOpen={activationModal.isOpen}
            onRunFlow={handleRunFlow}
            onToggleFlow={handleToggleFlow}
            onSettingsClick={() => handleFlowSettings(flow.id, flow.name)}
            isSelected={selectedFlows.has(flow.id)}
            onSelect={(selected) => {
              if (selected) {
                setSelectedFlows(prev => new Set(prev).add(flow.id));
              } else {
                setSelectedFlows(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(flow.id);
                  return newSet;
                });
              }
            }}
          />
        ))}
      </div>

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedFlows.size}
        onClearSelection={() => setSelectedFlows(new Set())}
        onBulkAction={handleBulkAction}
        disabled={loadingFlows.size > 0}
      />

      {/* Modals */}
      <FlowActivationModal
        isOpen={activationModal.isOpen}
        onClose={handleActivationComplete}
        flowName={activationModal.flowName}
        action={activationModal.action}
      />

      <FlowSettingsModal
        isOpen={settingsModal.isOpen}
        onClose={() => setSettingsModal({ isOpen: false, flowId: null, flowName: '' })}
        flowName={settingsModal.flowName}
        flowId={settingsModal.flowId || 0}
      />
    </div>
  );
};

export default MyFlows;

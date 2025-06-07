import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FlowActivationModal from "./FlowActivationModal";
import QuickStats from "./QuickStats";
import FlowFilters from "./FlowFilters";
import FlowCard from "./FlowCard";
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

  const handleActivationComplete = () => {
    if (activationModal.flowId) {
      // Simulate success/failure for placeholder
      const success = Math.random() > 0.15; // 85% success rate
      
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
        
        // Simulate analytics update by triggering a refresh event
        window.dispatchEvent(new CustomEvent('flowStatusChanged', { 
          detail: { 
            flowId: activationModal.flowId, 
            status: newStatus,
            action: activationModal.action
          }
        }));
      } else {
        // Keep current status on failure
        toast({
          title: "Activation Failed",
          description: `Failed to ${activationModal.action} ${activationModal.flowName}. Please try again.`,
          variant: "destructive"
        });
      }
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
      <QuickStats />

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
          />
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

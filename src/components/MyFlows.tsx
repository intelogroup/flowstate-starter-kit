
import { useState } from "react";
import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { showFlowToasts, showSystemToasts } from "@/components/TransitionalToasts";
import FlowActivationModal from "./FlowActivationModal";
import QuickStats from "./QuickStats";
import FlowFilters from "./FlowFilters";
import FlowCard from "./FlowCard";
import BulkActionsBar from "./BulkActionsBar";
import FlowSettingsModal from "./FlowSettingsModal";
import NotificationCenter from "./NotificationCenter";
import SearchWithAutocomplete from "./SearchWithAutocomplete";
import { mockFlows, Flow } from "@/types/flow";

const MyFlows = () => {
  const navigate = useNavigate();
  const [flows, setFlows] = useState<Flow[]>(mockFlows);
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

  const handleRunFlow = (flowId: number, flowName: string) => {
    setLoadingFlows(prev => new Set(prev).add(flowId));
    
    // Update flow status to PENDING
    setFlows(prev => prev.map(flow => 
      flow.id === flowId 
        ? { ...flow, lastRunStatus: 'PENDING' as const }
        : flow
    ));
    
    showFlowToasts.executing(flowName);
    
    setTimeout(() => {
      setLoadingFlows(prev => {
        const newSet = new Set(prev);
        newSet.delete(flowId);
        return newSet;
      });
      
      // Simulate different outcomes
      const success = Math.random() > 0.2;
      setFlows(prev => prev.map(flow => 
        flow.id === flowId 
          ? { 
              ...flow, 
              lastRunStatus: success ? 'SUCCESS' as const : 'FAILURE' as const,
              lastRunTimestamp: new Date().toISOString(),
              runsToday: flow.runsToday + 1
            }
          : flow
      ));
      
      if (success) {
        showFlowToasts.completed(flowName, "2.3s");
      } else {
        showFlowToasts.failed(flowName, "Connection timeout");
      }
    }, 2000);
  };

  const handleToggleFlow = (flowId: number, newStatus: boolean, flowName: string) => {
    setFlows(prev => prev.map(flow => 
      flow.id === flowId 
        ? { ...flow, isActive: newStatus }
        : flow
    ));
    
    if (newStatus) {
      showFlowToasts.activated(flowName);
    } else {
      showFlowToasts.paused(flowName);
    }
  };

  const handleFlowSettings = (flowId: number, flowName: string) => {
    setSettingsModal({
      isOpen: true,
      flowId,
      flowName
    });
  };

  const handleViewFlowDetails = (flowId: number) => {
    navigate(`/flow/${flowId}`);
  };

  const handleResolveIssue = (flowId: number) => {
    const flow = flows.find(f => f.id === flowId);
    if (flow) {
      showSystemToasts.saving();
      setTimeout(() => {
        showSystemToasts.saved();
      }, 1500);
      // In real implementation, this would open a resolution dialog or navigate to a fix page
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for flows:`, Array.from(selectedFlows));
    showSystemToasts.saved();
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
        {flows.map((flow) => (
          <div 
            key={flow.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleViewFlowDetails(flow.id)}
          >
            <FlowCard
              flow={flow}
              onRunFlow={(flowId, flowName) => {
                // Prevent propagation to avoid double navigation
                event?.stopPropagation();
                handleRunFlow(flowId, flowName);
              }}
              onToggleFlow={(flowId, newStatus, flowName) => {
                event?.stopPropagation();
                handleToggleFlow(flowId, newStatus, flowName);
              }}
              onSettingsClick={(flowId, flowName) => {
                event?.stopPropagation();
                handleFlowSettings(flowId, flowName);
              }}
              onResolveIssue={(flowId) => {
                event?.stopPropagation();
                handleResolveIssue(flowId);
              }}
              isSelected={selectedFlows.has(flow.id)}
              onSelect={(selected) => {
                event?.stopPropagation();
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
              disabled={loadingFlows.has(flow.id)}
            />
          </div>
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
        onClose={() => setActivationModal({ isOpen: false, flowId: null, flowName: '', action: 'activate' })}
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

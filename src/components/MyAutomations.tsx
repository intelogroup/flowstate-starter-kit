
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FlowActivationModal from "./FlowActivationModal";
import AutomationErrorModal from "./AutomationErrorModal";
import AutomationEmptyState from "./AutomationEmptyState";
import AutomationFilters from "./AutomationFilters";
import AutomationCard from "./AutomationCard";
import { useAutomations } from "@/hooks/useAutomations";

const MyAutomations = () => {
  const navigate = useNavigate();
  const {
    automations,
    filteredAutomations,
    loadingAutomations,
    searchTerm,
    statusFilter,
    triggerFilter,
    uniqueTriggers,
    setSearchTerm,
    setStatusFilter,
    setTriggerFilter,
    handleRunAutomation,
    handleToggleAutomation,
    handleActivationComplete,
    handleDuplicateAutomation,
    handleDeleteAutomation,
    clearFilters,
  } = useAutomations();
  
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
    automation: any | null;
  }>({
    isOpen: false,
    automation: null
  });

  const onToggleAutomation = (automationId: number, currentStatus: string, automationName: string) => {
    const newAction = currentStatus === 'active' ? 'deactivate' : 'activate';
    
    setActivationModal({
      isOpen: true,
      automationId,
      automationName,
      action: newAction
    });
  };

  const onActivationComplete = () => {
    if (activationModal.automationId) {
      handleActivationComplete(activationModal.automationId, activationModal.action, activationModal.automationName);
    }
    
    setActivationModal({ isOpen: false, automationId: null, automationName: '', action: 'activate' });
  };

  const handleViewError = (automation: any) => {
    setErrorModal({
      isOpen: true,
      automation
    });
  };

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

      <AutomationFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        triggerFilter={triggerFilter}
        uniqueTriggers={uniqueTriggers}
        hasResults={filteredAutomations.length > 0}
        totalAutomations={automations.length}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onTriggerFilterChange={setTriggerFilter}
        onClearFilters={clearFilters}
      />

      {/* Automations List */}
      <div className="space-y-4">
        {filteredAutomations.map((automation) => (
          <AutomationCard
            key={automation.id}
            automation={automation}
            isLoading={loadingAutomations.has(automation.id)}
            isActivationModalOpen={activationModal.isOpen}
            onToggleAutomation={onToggleAutomation}
            onRunAutomation={handleRunAutomation}
            onViewError={handleViewError}
            onDeleteAutomation={handleDeleteAutomation}
            onDuplicateAutomation={handleDuplicateAutomation}
          />
        ))}
      </div>

      <FlowActivationModal
        isOpen={activationModal.isOpen}
        onClose={onActivationComplete}
        flowName={activationModal.automationName}
        action={activationModal.action}
      />

      <AutomationErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, automation: null })}
        automation={errorModal.automation}
        onRetry={(automationId) => {
          setErrorModal({ isOpen: false, automation: null });
          onToggleAutomation(automationId, 'error', errorModal.automation?.name || '');
        }}
      />
    </div>
  );
};

export default MyAutomations;

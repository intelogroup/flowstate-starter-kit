
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FlowActivationModal from "./FlowActivationModal";
import AutomationErrorModal from "./AutomationErrorModal";
import AutomationEmptyState from "./AutomationEmptyState";
import AutomationFilters from "./AutomationFilters";
import AutomationCard from "./AutomationCard";
import DataTable from "./DataTable";
import { useAutomations } from "@/hooks/useAutomations";
import { Badge } from "@/components/ui/badge";

const MyAutomations = () => {
  const navigate = useNavigate();
  const {
    automations,
    allAutomations,
    loading,
    error,
    loadingAutomations,
    pagination,
    searchTerm,
    statusFilter,
    triggerFilter,
    uniqueTriggers,
    setSearchTerm,
    setStatusFilter,
    setTriggerFilter,
    updatePagination,
    handleRunAutomation,
    handleToggleAutomation,
    handleActivationComplete,
    handleDuplicateAutomation,
    handleDeleteAutomation,
    clearFilters,
    refetch,
  } = useAutomations({
    pagination: { page: 1, limit: 10 },
    filters: {}
  });
  
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

  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

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

  const handleViewAutomationDetails = (automationId: number) => {
    navigate(`/flow/${automationId}`);
  };

  // Table columns for DataTable component
  const tableColumns = [
    {
      key: 'name' as const,
      label: 'Name',
      sortable: true,
      render: (value: string, item: any) => (
        <div 
          className="cursor-pointer hover:text-primary"
          onClick={() => handleViewAutomationDetails(item.id)}
        >
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{item.description}</div>
        </div>
      )
    },
    {
      key: 'status' as const,
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'default' : value === 'error' ? 'destructive' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'trigger' as const,
      label: 'Trigger',
      sortable: true,
      render: (value: string) => <Badge variant="outline">{value}</Badge>
    },
    {
      key: 'executions' as const,
      label: 'Executions',
      sortable: true,
    },
    {
      key: 'successRate' as const,
      label: 'Success Rate',
      sortable: true,
    },
    {
      key: 'lastRun' as const,
      label: 'Last Run',
      sortable: true,
    }
  ];

  if (error) {
    return (
      <div className="p-6 space-y-6 bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Automations</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={refetch}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (allAutomations.length === 0 && !loading) {
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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/create-flow')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Automation
          </Button>
        </div>
      </div>

      <AutomationFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        triggerFilter={triggerFilter}
        uniqueTriggers={uniqueTriggers}
        hasResults={automations.length > 0}
        totalAutomations={allAutomations.length}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onTriggerFilterChange={setTriggerFilter}
        onClearFilters={clearFilters}
      />

      {/* Content */}
      {viewMode === 'table' ? (
        <DataTable
          data={automations}
          columns={tableColumns}
          loading={loading}
          pagination={pagination}
          onPaginate={updatePagination}
          emptyMessage="No automations found"
        />
      ) : (
        <>
          {/* Automations List */}
          <div className="space-y-4">
            {loading && automations.length === 0 ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              automations.map((automation) => (
                <div 
                  key={automation.id} 
                  className="cursor-pointer"
                  onClick={() => handleViewAutomationDetails(automation.id)}
                >
                  <AutomationCard
                    automation={automation}
                    isLoading={loadingAutomations.has(automation.id)}
                    isActivationModalOpen={activationModal.isOpen}
                    onToggleAutomation={onToggleAutomation}
                    onRunAutomation={handleRunAutomation}
                    onViewError={handleViewError}
                    onDeleteAutomation={handleDeleteAutomation}
                    onDuplicateAutomation={handleDuplicateAutomation}
                  />
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => updatePagination({ page: pagination.page - 1 })}
                >
                  Previous
                </Button>
                <Badge variant="outline">{pagination.page} of {pagination.totalPages}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => updatePagination({ page: pagination.page + 1 })}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
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


import { useNavigate } from "react-router-dom";
import { FlowCard, FlowsHeader } from "@/components/FlowCard";
import { useFlowsManagement } from "@/hooks/useFlowsManagement";
import DestructiveConfirmationModal from "./DestructiveConfirmationModal";

const MyFlows = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    showDeleteModal,
    setShowDeleteModal,
    showDisconnectModal,
    setShowDisconnectModal,
    selectedFlow,
    filteredFlows,
    handleEditFlow,
    handleDeleteFlow,
    handleDuplicateFlow,
    handleToggleStatus,
    confirmDeleteFlow,
    confirmDisconnectService,
  } = useFlowsManagement();

  const handleFlowClick = (flowId: number) => {
    navigate(`/flow/${flowId}`);
  };

  const handleDisconnectService = () => {
    setShowDisconnectModal(true);
  };

  return (
    <>
      <div className="p-6 space-y-6 bg-background">
        <FlowsHeader
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
          onCreateFlow={() => navigate('/create-flow')}
          onDisconnectService={handleDisconnectService}
        />

        <div className="grid grid-cols-1 gap-4">
          {filteredFlows.map(flow => (
            <FlowCard
              key={flow.id}
              flow={flow}
              onFlowClick={handleFlowClick}
              onEditFlow={handleEditFlow}
              onDeleteFlow={handleDeleteFlow}
              onDuplicateFlow={handleDuplicateFlow}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      </div>

      <DestructiveConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={confirmDeleteFlow}
        type="delete-flow"
        itemName={selectedFlow?.name || ""}
        requireNameConfirmation={true}
      />

      <DestructiveConfirmationModal
        open={showDisconnectModal}
        onOpenChange={setShowDisconnectModal}
        onConfirm={confirmDisconnectService}
        type="disconnect-service"
        itemName="Google Account"
        serviceName="Google"
        requireNameConfirmation={false}
      />
    </>
  );
};

export default MyFlows;

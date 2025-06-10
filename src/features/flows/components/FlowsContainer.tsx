
import { useNavigate } from "react-router-dom";
import FlowsHeader from "./FlowsHeader";
import FlowsList from "./FlowsList";
import { useFlowsManagement } from "../hooks/useFlowsManagement";
import DestructiveConfirmationModal from "@/components/DestructiveConfirmationModal";

const FlowsContainer = () => {
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

        <FlowsList
          flows={filteredFlows}
          onFlowClick={handleFlowClick}
          onEditFlow={handleEditFlow}
          onDeleteFlow={handleDeleteFlow}
          onDuplicateFlow={handleDuplicateFlow}
          onToggleStatus={handleToggleStatus}
        />
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

export default FlowsContainer;

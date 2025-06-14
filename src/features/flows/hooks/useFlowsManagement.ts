
import { useState } from "react";
import { useFlowsData } from "./useFlowsData";
import { Flow } from "@/shared/services/supabaseFlowService";

export const useFlowsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<{ id: string; name: string } | null>(null);

  const {
    flows,
    isLoading,
    error,
    deleteFlow,
    duplicateFlow,
    toggleStatus,
    isDeleting,
    isDuplicating,
    isTogglingStatus
  } = useFlowsData();

  const filteredFlows = flows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || flow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditFlow = (flowId: string, flowName: string) => {
    console.log(`Editing flow ${flowId}: ${flowName}`);
    // TODO: Navigate to flow editor
  };

  const handleDeleteFlow = (flowId: string, flowName: string) => {
    setSelectedFlow({ id: flowId, name: flowName });
    setShowDeleteModal(true);
  };

  const handleDuplicateFlow = (flowId: string, flowName: string) => {
    duplicateFlow(flowId);
  };

  const handleToggleStatus = (flowId: string) => {
    toggleStatus(flowId);
  };

  const confirmDeleteFlow = () => {
    if (selectedFlow) {
      deleteFlow(selectedFlow.id);
    }
    setShowDeleteModal(false);
    setSelectedFlow(null);
  };

  const confirmDisconnectService = () => {
    console.log('Disconnecting Google service');
    setShowDisconnectModal(false);
  };

  return {
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
    flows,
    isLoading,
    error,
    handleEditFlow,
    handleDeleteFlow,
    handleDuplicateFlow,
    handleToggleStatus,
    confirmDeleteFlow,
    confirmDisconnectService,
    isDeleting,
    isDuplicating,
    isTogglingStatus
  };
};

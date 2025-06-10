
import { useState } from "react";
import { Flow, FlowsManagementState } from "../types";

export const useFlowsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<{ id: number; name: string } | null>(null);

  const flows: Flow[] = [
    {
      id: 1,
      name: "Email to Drive Backup",
      description: "Automatically save email attachments to Google Drive",
      status: "active",
      lastRun: "2 hours ago",
      totalRuns: 45,
      successRate: 98
    },
    {
      id: 2,
      name: "Slack Notifications",
      description: "Send important updates to team Slack channel",
      status: "paused",
      lastRun: "1 day ago",
      totalRuns: 23,
      successRate: 100
    },
    {
      id: 3,
      name: "Data Sync Process",
      description: "Synchronize data between different platforms",
      status: "error",
      lastRun: "3 hours ago",
      totalRuns: 12,
      successRate: 85
    }
  ];

  const filteredFlows = flows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || flow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditFlow = (flowId: number, flowName: string) => {
    console.log(`Editing flow ${flowId}: ${flowName}`);
  };

  const handleDeleteFlow = (flowId: number, flowName: string) => {
    setSelectedFlow({ id: flowId, name: flowName });
    setShowDeleteModal(true);
  };

  const handleDuplicateFlow = (flowId: number, flowName: string) => {
    console.log(`Duplicating flow ${flowId}: ${flowName}`);
  };

  const handleToggleStatus = (flowId: number) => {
    console.log(`Toggling status for flow ${flowId}`);
  };

  const confirmDeleteFlow = () => {
    if (selectedFlow) {
      console.log(`Deleting flow ${selectedFlow.id}: ${selectedFlow.name}`);
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
    handleEditFlow,
    handleDeleteFlow,
    handleDuplicateFlow,
    handleToggleStatus,
    confirmDeleteFlow,
    confirmDisconnectService,
  };
};

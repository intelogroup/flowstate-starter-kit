
export interface Flow {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  totalRuns: number;
  successRate: number;
}

export interface FlowFilters {
  searchQuery: string;
  statusFilter: string;
}

export interface FlowActions {
  onFlowClick: (flowId: number) => void;
  onEditFlow: (flowId: number, flowName: string) => void;
  onDeleteFlow: (flowId: number, flowName: string) => void;
  onDuplicateFlow: (flowId: number, flowName: string) => void;
  onToggleStatus: (flowId: number) => void;
}

export interface FlowsManagementState {
  searchQuery: string;
  statusFilter: string;
  showDeleteModal: boolean;
  showDisconnectModal: boolean;
  selectedFlow: { id: number; name: string } | null;
  filteredFlows: Flow[];
}

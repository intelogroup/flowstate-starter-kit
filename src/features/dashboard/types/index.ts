
export interface DashboardStats {
  totalFlows: number;
  activeFlows: number;
  totalExecutions: number;
  successRate: number;
}

export interface RecentActivityItem {
  id: string;
  type: 'flow_created' | 'flow_executed' | 'flow_error' | 'flow_paused';
  title: string;
  description: string;
  timestamp: string;
  flowId?: number;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  variant?: 'default' | 'secondary' | 'outline';
}

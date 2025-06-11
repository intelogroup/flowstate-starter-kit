
import { Status } from './common';

export interface Automation {
  id: string | number;
  name: string;
  description: string;
  status: Status;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  successRate: number;
  lastRun?: string;
  nextRun?: string;
  totalRuns: number;
  createdAt: string;
  updatedAt: string;
  error?: AutomationError;
}

export interface AutomationError {
  type: string;
  message: string;
  actionRequired: boolean;
  timestamp?: string;
}

export interface AutomationTrigger {
  type: 'webhook' | 'schedule' | 'email' | 'file_upload' | 'database_change';
  config: Record<string, any>;
}

export interface AutomationAction {
  id: string;
  type: 'email' | 'webhook' | 'database' | 'file_operation' | 'notification' | 'save-to-drive';
  config: Record<string, any>;
  order: number;
}

export interface AutomationFilters {
  searchTerm: string;
  statusFilter: Status | 'all';
  triggerFilter: AutomationTrigger['type'] | 'all';
}

export interface AutomationStats {
  total: number;
  active: number;
  paused: number;
  error: number;
  successRate: number;
}

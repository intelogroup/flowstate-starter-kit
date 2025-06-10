
import { BaseEntity, Status } from './common';

export interface Automation extends BaseEntity {
  name: string;
  description: string;
  status: Status;
  lastRun: string;
  runsToday: number;
  successRate: number;
  tags: string[];
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  error?: AutomationError;
}

export interface AutomationTrigger {
  type: string;
  config: Record<string, any>;
}

export interface AutomationAction {
  type: string;
  config: Record<string, any>;
}

export interface AutomationError {
  type: 'connection' | 'execution' | 'configuration';
  message: string;
  actionRequired: boolean;
  timestamp: string;
}

export interface AutomationFilters {
  searchTerm: string;
  statusFilter: string;
  triggerFilter: string;
}

export interface AutomationStats {
  total: number;
  active: number;
  paused: number;
  error: number;
  successRate: number;
}


export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  phase: 'foundation' | 'templates' | 'ai-integration';
  week: number;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags: string[];
  dependencies?: string[];
  estimatedHours?: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TodoPhase {
  id: string;
  name: string;
  description: string;
  weeks: string;
  color: string;
  totalItems: number;
  completedItems: number;
}

export interface TodoFilters {
  phase?: string;
  completed?: boolean;
  priority?: string;
  assignee?: string;
  search?: string;
}


// Core data interfaces for Supabase integration
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

export interface Automation {
  id: string;
  userId: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  isActive: boolean;
  status: 'active' | 'paused' | 'error' | 'draft';
  lastRun?: string;
  nextRun?: string;
  runsToday: number;
  totalRuns: number;
  successRate: number;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  sourceApp: string;
  targetApp: string;
  isPopular: boolean;
  usageCount: number;
  rating: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedSetupTime: number; // in minutes
  tags: string[];
  createdAt: string;
}

export interface Activity {
  id: string;
  automationId: string;
  automationName: string;
  action: string;
  status: 'success' | 'error' | 'warning';
  message?: string;
  timestamp: string;
  duration?: number; // in milliseconds
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string[];
  trigger?: string[];
  category?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}


// API and Data Types for Supabase Integration

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams {
  [key: string]: any;
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

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Flow and Automation Types
export interface Flow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error' | 'draft';
  createdAt: Date;
  updatedAt: Date;
  lastRun?: Date;
  nextRun?: Date;
  userId: string;
  triggers: Trigger[];
  actions: Action[];
  tags: string[];
}

export interface Trigger {
  id: string;
  type: string;
  service: string;
  config: Record<string, any>;
}

export interface Action {
  id: string;
  type: string;
  service: string;
  config: Record<string, any>;
}

// Template Types
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  popularity: number;
  configuration: Record<string, any>;
  previewImage?: string;
  createdAt: Date;
}

// Analytics Types
export interface AnalyticsData {
  totalFlows: number;
  activeFlows: number;
  runsToday: number;
  issues: number;
  executionHistory: ExecutionRecord[];
  errorRates: ErrorRate[];
}

export interface ExecutionRecord {
  id: string;
  flowId: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed';
  duration?: number;
  error?: string;
}

export interface ErrorRate {
  date: Date;
  rate: number;
  count: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userId: string;
  actionUrl?: string;
}

// Settings Types
export interface UserSettings {
  id: string;
  userId: string;
  notifications: {
    email: boolean;
    push: boolean;
    flowFailures: boolean;
    weeklyReports: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    timezone: string;
    language: string;
  };
  limits: {
    monthlyExecutions: number;
    maxFlows: number;
  };
}

// Data States for UI Components
export interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetched?: Date;
}

export interface ListState<T> extends DataState<T[]> {
  pagination: PaginationParams;
  hasMore: boolean;
}


export interface BaseEntity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface FilterOptions {
  search: string;
  status: string;
  category: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export type Status = 'active' | 'paused' | 'error' | 'draft';

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

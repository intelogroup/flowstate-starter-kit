
import { useState, useEffect, useCallback } from 'react';
import { PaginationParams, FilterParams, ApiResponse } from '@/types';

// Generic hook for Supabase data fetching
// This provides a structure for when Supabase is integrated
export const useSupabaseData = <T>(
  tableName: string,
  initialParams?: {
    pagination?: PaginationParams;
    filters?: FilterParams;
  }
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationParams>(
    initialParams?.pagination || { page: 1, limit: 10 }
  );
  const [filters, setFilters] = useState<FilterParams>(
    initialParams?.filters || {}
  );

  // Mock fetch function - replace with actual Supabase queries
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // This is where Supabase integration would happen
      // For now, simulating async data loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response structure
      const mockResponse: ApiResponse<T[]> = {
        data: [] as T[], // Empty for now, will be populated from Supabase
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: 0,
          totalPages: 0,
        },
      };

      setData(mockResponse.data);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [tableName, pagination, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const updatePagination = useCallback((newPagination: Partial<PaginationParams>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  }, []);

  const updateFilters = useCallback((newFilters: FilterParams) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    filters,
    refetch,
    updatePagination,
    updateFilters,
  };
};

// Specific hooks for different data types
export const useAutomations = () => {
  return useSupabaseData('automations', {
    pagination: { page: 1, limit: 20 },
    filters: { status: ['active', 'paused'] },
  });
};

export const useTemplates = () => {
  return useSupabaseData('templates', {
    pagination: { page: 1, limit: 12 },
    filters: {},
  });
};

export const useActivity = () => {
  return useSupabaseData('activity', {
    pagination: { page: 1, limit: 50 },
    filters: {},
  });
};

export default useSupabaseData;

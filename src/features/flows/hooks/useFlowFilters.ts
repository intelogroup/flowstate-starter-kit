
import { useState, useMemo } from 'react';
import { FlowFilters } from '../types';

export const useFlowFilters = () => {
  const [filters, setFilters] = useState<FlowFilters>({
    searchQuery: '',
    statusFilter: 'all'
  });

  const updateSearchQuery = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const updateStatusFilter = (statusFilter: string) => {
    setFilters(prev => ({ ...prev, statusFilter }));
  };

  const clearFilters = () => {
    setFilters({ searchQuery: '', statusFilter: 'all' });
  };

  const hasActiveFilters = useMemo(() => {
    return filters.searchQuery !== '' || filters.statusFilter !== 'all';
  }, [filters]);

  return {
    filters,
    updateSearchQuery,
    updateStatusFilter,
    clearFilters,
    hasActiveFilters,
  };
};

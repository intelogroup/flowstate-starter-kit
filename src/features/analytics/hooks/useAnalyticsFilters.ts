
import { useState } from 'react';
import { AnalyticsFilters } from '../types';

export const useAnalyticsFilters = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: 'month',
    flowType: 'all',
    metric: 'executions'
  });

  const updateFilters = (newFilters: Partial<AnalyticsFilters>) => {
    setFilters(current => ({ ...current, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: 'month',
      flowType: 'all',
      metric: 'executions'
    });
  };

  return {
    filters,
    updateFilters,
    resetFilters
  };
};

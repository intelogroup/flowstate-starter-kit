
import { useMemo } from 'react';
import { useAutomationStore } from '@/shared/stores/useAutomationStore';
import { useDebounce } from '@/shared/utils/performance';

export const useAutomationFilters = () => {
  const { filters, updateFilters, clearFilters } = useAutomationStore();

  const debouncedSearchUpdate = useDebounce((searchTerm: string) => {
    updateFilters({ searchTerm });
  }, 300);

  const handleSearchChange = (searchTerm: string) => {
    debouncedSearchUpdate(searchTerm);
  };

  const handleStatusFilterChange = (statusFilter: string) => {
    updateFilters({ statusFilter });
  };

  const handleTriggerFilterChange = (triggerFilter: string) => {
    updateFilters({ triggerFilter });
  };

  const uniqueTriggers = useMemo(() => {
    const automations = useAutomationStore.getState().automations;
    return [...new Set(automations.map(a => a.trigger.type))];
  }, []);

  const hasActiveFilters = filters.searchTerm || filters.statusFilter !== 'all' || filters.triggerFilter !== 'all';

  return {
    filters,
    uniqueTriggers,
    hasActiveFilters,
    handleSearchChange,
    handleStatusFilterChange,
    handleTriggerFilterChange,
    clearFilters,
  };
};

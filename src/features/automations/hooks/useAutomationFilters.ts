
import { useMemo } from 'react';
import { useAutomationStore } from '@/shared/stores/useAutomationStore';
import { useDebounce } from '@/shared/utils/performance';
import { Status } from '@/shared/types/common';
import { AutomationTrigger } from '@/shared/types/automation';

export const useAutomationFilters = () => {
  const { filters, updateFilters, clearFilters } = useAutomationStore();

  const debouncedSearchUpdate = useDebounce((searchTerm: string) => {
    updateFilters({ searchTerm });
  }, 300);

  const handleSearchChange = (searchTerm: string) => {
    debouncedSearchUpdate(searchTerm);
  };

  const handleStatusFilterChange = (statusFilter: string) => {
    updateFilters({ statusFilter: statusFilter as Status | 'all' });
  };

  const handleTriggerFilterChange = (triggerFilter: string) => {
    updateFilters({ triggerFilter: triggerFilter as AutomationTrigger['type'] | 'all' });
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

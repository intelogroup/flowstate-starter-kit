
import { useEffect } from 'react';
import { useAutomationStore } from '@/shared/stores/useAutomationStore';
import { useAutomationFilters } from '../hooks/useAutomationFilters';
import { automationService } from '../services/automationService';
import AutomationStats from './AutomationStats';
import AutomationsList from './AutomationsList';
import AutomationFilters from '@/components/AutomationFilters';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { toast } from '@/hooks/use-toast';

const AutomationContainer = () => {
  const { 
    filteredAutomations, 
    stats, 
    isLoading, 
    setAutomations, 
    setLoading, 
    toggleAutomationStatus,
    deleteAutomation 
  } = useAutomationStore();

  const {
    filters,
    uniqueTriggers,
    hasActiveFilters,
    handleSearchChange,
    handleStatusFilterChange,
    handleTriggerFilterChange,
    clearFilters,
  } = useAutomationFilters();

  useEffect(() => {
    const loadAutomations = async () => {
      setLoading(true);
      try {
        const automations = await automationService.getAutomations();
        setAutomations(automations);
      } catch (error) {
        console.error('Failed to load automations:', error);
        toast({
          title: "Error",
          description: "Failed to load automations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadAutomations();
  }, [setAutomations, setLoading]);

  const handleToggle = (id: string | number) => {
    toggleAutomationStatus(id);
    toast({
      title: "Status Updated",
      description: "Automation status has been updated.",
    });
  };

  const handleSettings = (id: string | number) => {
    console.log('Opening settings for automation:', id);
    // TODO: Implement settings modal
  };

  const handleRetry = (id: string | number) => {
    console.log('Retrying automation:', id);
    toast({
      title: "Retrying",
      description: "Automation is being retried.",
    });
  };

  const handleReconnect = (id: string | number) => {
    console.log('Reconnecting automation:', id);
    toast({
      title: "Reconnecting",
      description: "Attempting to reconnect the service.",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="stats" />
        <LoadingSkeleton type="filters" />
        <LoadingSkeleton type="list" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AutomationStats stats={stats} />
      
      <AutomationFilters
        searchTerm={filters.searchTerm}
        statusFilter={filters.statusFilter}
        triggerFilter={filters.triggerFilter}
        uniqueTriggers={uniqueTriggers}
        hasResults={filteredAutomations.length > 0}
        totalAutomations={stats.total}
        onSearchChange={handleSearchChange}
        onStatusFilterChange={handleStatusFilterChange}
        onTriggerFilterChange={handleTriggerFilterChange}
        onClearFilters={clearFilters}
      />

      <AutomationsList
        automations={filteredAutomations}
        onToggle={handleToggle}
        onSettings={handleSettings}
        onRetry={handleRetry}
        onReconnect={handleReconnect}
        hasFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default AutomationContainer;


import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { PaginationParams, FilterParams, ApiResponse } from "@/types";

interface Automation {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  executions: number;
  successRate: string;
  createdAt: string;
  trigger: string;
  errorMessage?: string;
  // Additional fields for Supabase readiness
  userId?: string;
  createdBy?: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
}

const initialAutomations: Automation[] = [
  {
    id: 1,
    name: "Email to Drive - Invoices",
    description: "Automatically save invoice attachments from Gmail to Google Drive",
    status: "paused",
    lastRun: "2 hours ago",
    executions: 124,
    successRate: "98.4%",
    createdAt: "2 weeks ago",
    trigger: "Gmail",
    tags: ["productivity", "finance"],
    category: "Email Processing"
  },
  {
    id: 2,
    name: "Slack Notifications",
    description: "Send important emails and alerts to designated Slack channels",
    status: "active",
    lastRun: "5 minutes ago",
    executions: 89,
    successRate: "100%",
    createdAt: "1 month ago",
    trigger: "Email",
    tags: ["communication", "alerts"],
    category: "Notifications"
  },
  {
    id: 3,
    name: "Contact Form to CRM",
    description: "Add website contact form submissions to CRM system",
    status: "active",
    lastRun: "1 hour ago",
    executions: 45,
    successRate: "96.7%",
    createdAt: "3 weeks ago",
    trigger: "Webhook",
    tags: ["sales", "crm"],
    category: "Lead Management"
  },
  {
    id: 4,
    name: "Document Processing",
    description: "Process and categorize uploaded documents automatically",
    status: "error",
    lastRun: "1 day ago",
    executions: 67,
    successRate: "89.2%",
    createdAt: "1 week ago",
    trigger: "File Upload",
    errorMessage: "Authentication failed - Google Drive API connection expired",
    tags: ["documents", "automation"],
    category: "File Processing"
  }
];

export const useAutomations = (
  initialParams?: {
    pagination?: PaginationParams;
    filters?: FilterParams;
  }
) => {
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingAutomations, setLoadingAutomations] = useState<Set<number>>(new Set());
  
  // Pagination and filtering state
  const [pagination, setPagination] = useState<PaginationParams>(
    initialParams?.pagination || { page: 1, limit: 10 }
  );
  const [filters, setFilters] = useState<FilterParams>(
    initialParams?.filters || {}
  );

  // Derived state for search and filters
  const searchTerm = filters.search || "";
  const statusFilter = filters.status || "all";
  const triggerFilter = filters.trigger || "all";

  // Filter automations based on search and filters
  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || automation.status === statusFilter;
    const matchesTrigger = triggerFilter === "all" || automation.trigger === triggerFilter;
    
    return matchesSearch && matchesStatus && matchesTrigger;
  });

  // Paginated results
  const startIndex = (pagination.page - 1) * pagination.limit;
  const paginatedAutomations = filteredAutomations.slice(startIndex, startIndex + pagination.limit);

  const uniqueTriggers = Array.from(new Set(automations.map(a => a.trigger)));

  // Simulate data fetching (ready for Supabase integration)
  const fetchAutomations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // This is where Supabase query would go
      await new Promise(resolve => setTimeout(resolve, 500));
      // For now, we're using the initial data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch automations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomations();
  }, [pagination, filters]);

  const updatePagination = (newPagination: Partial<PaginationParams>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  };

  const updateFilters = (newFilters: FilterParams) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const setSearchTerm = (search: string) => {
    updateFilters({ ...filters, search });
  };

  const setStatusFilter = (status: string) => {
    updateFilters({ ...filters, status });
  };

  const setTriggerFilter = (trigger: string) => {
    updateFilters({ ...filters, trigger });
  };

  const handleRunAutomation = (automationId: number) => {
    setLoadingAutomations(prev => new Set(prev).add(automationId));
    
    setTimeout(() => {
      setLoadingAutomations(prev => {
        const newSet = new Set(prev);
        newSet.delete(automationId);
        return newSet;
      });

      const automation = automations.find(a => a.id === automationId);
      toast({
        title: "Automation Triggered",
        description: `${automation?.name} has been manually triggered and is now running.`,
      });
    }, 1500);
  };

  const handleToggleAutomation = (automationId: number, currentStatus: string, automationName: string) => {
    return { automationId, currentStatus, automationName };
  };

  const handleActivationComplete = (automationId: number, action: 'activate' | 'deactivate', automationName: string) => {
    const success = Math.random() > 0.15; // 85% success rate
    
    if (success) {
      const newStatus = action === 'activate' ? 'active' : 'paused';
      setAutomations(prev => prev.map(automation => 
        automation.id === automationId 
          ? { ...automation, status: newStatus as 'active' | 'paused' | 'error', updatedAt: new Date().toISOString() }
          : automation
      ));
      
      toast({
        title: `Automation ${action === 'activate' ? 'Activated' : 'Paused'}`,
        description: `${automationName} has been ${action === 'activate' ? 'activated' : 'paused'} successfully.`,
      });
    } else {
      toast({
        title: "Activation Failed",
        description: `Failed to ${action} ${automationName}. Please try again.`,
        variant: "destructive"
      });
    }
  };

  const handleDuplicateAutomation = (automationId: number) => {
    const automation = automations.find(a => a.id === automationId);
    if (automation) {
      const duplicated = {
        ...automation,
        id: Math.max(...automations.map(a => a.id)) + 1,
        name: `${automation.name} (Copy)`,
        createdAt: "just now",
        executions: 0,
        status: 'paused' as const
      };
      setAutomations(prev => [duplicated, ...prev]);
    }
    toast({
      title: "Automation Duplicated",
      description: `${automation?.name} has been duplicated successfully.`,
    });
  };

  const handleDeleteAutomation = (automationId: number) => {
    const automation = automations.find(a => a.id === automationId);
    setAutomations(prev => prev.filter(a => a.id !== automationId));
    toast({
      title: "Automation Deleted",
      description: `${automation?.name} has been deleted successfully.`,
      variant: "destructive"
    });
  };

  const clearFilters = () => {
    updateFilters({});
  };

  const refetch = () => {
    fetchAutomations();
  };

  return {
    // Data
    automations: paginatedAutomations,
    allAutomations: automations,
    filteredAutomations,
    
    // State
    loading,
    error,
    loadingAutomations,
    
    // Pagination & Filtering
    pagination: {
      ...pagination,
      total: filteredAutomations.length,
      totalPages: Math.ceil(filteredAutomations.length / pagination.limit)
    },
    filters,
    searchTerm,
    statusFilter,
    triggerFilter,
    uniqueTriggers,
    
    // Actions
    setSearchTerm,
    setStatusFilter,
    setTriggerFilter,
    updatePagination,
    updateFilters,
    handleRunAutomation,
    handleToggleAutomation,
    handleActivationComplete,
    handleDuplicateAutomation,
    handleDeleteAutomation,
    clearFilters,
    refetch,
  };
};

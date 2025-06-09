import { useState, useEffect, useMemo } from 'react';

// Define types for automations, triggers, and filters
export interface Automation {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  trigger: string;
  executions: number;
  successRate: string; // Changed from number to string to match the MyAutomations component
  lastRun: string;
  createdAt: string;
}

export interface PaginationConfig {
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
}

export interface UseAutomationsConfig {
  pagination: PaginationConfig;
  filters: {
    searchTerm?: string;
    status?: string;
    trigger?: string;
  };
}

// Mock automation data with string success rates
const mockAutomations: Automation[] = [
  {
    id: 1,
    name: 'Daily Sales Report',
    description: 'Send a daily report of sales to the sales team',
    status: 'active',
    trigger: 'Daily at 5:00 PM',
    executions: 120,
    successRate: '95%',
    lastRun: '2024-05-03 17:00',
    createdAt: '2024-04-15 10:30',
  },
  {
    id: 2,
    name: 'New Customer Notification',
    description: 'Notify the support channel when a new customer signs up',
    status: 'active',
    trigger: 'New customer signup',
    executions: 300,
    successRate: '99%',
    lastRun: '2024-05-04 09:30',
    createdAt: '2024-04-10 14:20',
  },
  {
    id: 3,
    name: 'Low Stock Alert',
    description: 'Alert the inventory manager when stock levels are low',
    status: 'paused',
    trigger: 'Stock level below 10',
    executions: 50,
    successRate: '80%',
    lastRun: '2024-05-02 14:45',
    createdAt: '2024-04-20 09:15',
  },
  {
    id: 4,
    name: 'Failed Payment Follow-up',
    description: 'Send an email to customers with failed payments',
    status: 'error',
    trigger: 'Payment failure',
    executions: 80,
    successRate: '65%',
    lastRun: '2024-05-04 11:00',
    createdAt: '2024-04-18 16:45',
  },
  {
    id: 5,
    name: 'Weekly Performance Report',
    description: 'Generate a weekly performance report and send it to management',
    status: 'active',
    trigger: 'Weekly on Monday at 9:00 AM',
    executions: 60,
    successRate: '92%',
    lastRun: '2024-05-06 09:00',
    createdAt: '2024-04-12 11:30',
  },
  {
    id: 6,
    name: 'Inactive User Reminder',
    description: 'Remind inactive users to log in and use the application',
    status: 'paused',
    trigger: 'User inactive for 30 days',
    executions: 40,
    successRate: '75%',
    lastRun: '2024-05-01 16:20',
    createdAt: '2024-04-25 13:10',
  },
  {
    id: 7,
    name: 'High Priority Support Ticket',
    description: 'Escalate high priority support tickets to the engineering team',
    status: 'active',
    trigger: 'Support ticket marked as high priority',
    executions: 200,
    successRate: '98%',
    lastRun: '2024-05-05 13:15',
    createdAt: '2024-04-08 08:45',
  },
  {
    id: 8,
    name: 'New Blog Post Notification',
    description: 'Share new blog posts on social media channels',
    status: 'active',
    trigger: 'New blog post published',
    executions: 150,
    successRate: '90%',
    lastRun: '2024-05-03 10:00',
    createdAt: '2024-04-22 15:20',
  },
  {
    id: 9,
    name: 'Server Health Check',
    description: 'Perform a daily server health check and report any issues',
    status: 'error',
    trigger: 'Daily at 6:00 AM',
    executions: 100,
    successRate: '70%',
    lastRun: '2024-05-04 06:00',
    createdAt: '2024-04-14 12:00',
  },
  {
    id: 10,
    name: 'Welcome New Users',
    description: 'Send a welcome email to new users after they sign up',
    status: 'active',
    trigger: 'New user signs up',
    executions: 250,
    successRate: '96%',
    lastRun: '2024-05-05 18:40',
    createdAt: '2024-04-16 10:15',
  },
];

export const useAutomations = (config: UseAutomationsConfig) => {
  const [allAutomations] = useState<Automation[]>(mockAutomations);
  const [loadingAutomations, setLoadingAutomations] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [triggerFilter, setTriggerFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(config.pagination);

  const uniqueTriggers = useMemo(() => {
    const triggers = new Set(allAutomations.map(automation => automation.trigger));
    return Array.from(triggers);
  }, [allAutomations]);

  const filteredAutomations = useMemo(() => {
    return allAutomations.filter(automation => {
      const matchesSearch = searchTerm === '' || 
        automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        automation.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || automation.status === statusFilter;
      const matchesTrigger = triggerFilter === 'all' || automation.trigger === triggerFilter;
      
      return matchesSearch && matchesStatus && matchesTrigger;
    });
  }, [allAutomations, searchTerm, statusFilter, triggerFilter]);

  const paginatedAutomations = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    
    // Update total pages based on filtered automations
    setPagination(prev => ({
      ...prev,
      total: filteredAutomations.length,
      totalPages: Math.ceil(filteredAutomations.length / pagination.limit)
    }));
    
    return filteredAutomations.slice(start, end);
  }, [filteredAutomations, pagination.page, pagination.limit]);

  const updatePagination = (updates: Partial<PaginationConfig>) => {
    setPagination(prev => ({ ...prev, ...updates }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTriggerFilter('all');
    setPagination({ ...config.pagination, page: 1 });
  };

  const handleRunAutomation = (automationId: number) => {
    setLoadingAutomations(prev => new Set(prev).add(automationId));
    
    // Simulate running automation
    setTimeout(() => {
      setLoadingAutomations(prev => {
        const newSet = new Set(prev);
        newSet.delete(automationId);
        return newSet;
      });
      
      // Simulate success or failure
      const success = Math.random() > 0.5;
      if (!success) {
        setError('Automation failed to run.');
      }
    }, 1500);
  };

  const handleToggleAutomation = (automationId: number, newStatus: 'active' | 'paused' | 'error') => {
    setLoadingAutomations(prev => new Set(prev).add(automationId));
    
    // Simulate toggling automation
    setTimeout(() => {
      setLoadingAutomations(prev => {
        const newSet = new Set(prev);
        newSet.delete(automationId);
        return newSet;
      });
      
      // Update automation status
      // In a real implementation, you would call an API to update the status
    }, 1000);
  };

  const handleActivationComplete = (automationId: number, action: 'activate' | 'deactivate', automationName: string) => {
    // Simulate activation completion
    console.log(`Automation ${automationName} ${action}d successfully.`);
  };

  const handleDuplicateAutomation = (automationId: number) => {
    setLoadingAutomations(prev => new Set(prev).add(automationId));
    
    // Simulate duplication
    setTimeout(() => {
      setLoadingAutomations(prev => {
        const newSet = new Set(prev);
        newSet.delete(automationId);
        return newSet;
      });
      
      // In a real implementation, you would call an API to duplicate the automation
      console.log(`Automation ${automationId} duplicated.`);
    }, 1200);
  };

  const handleDeleteAutomation = (automationId: number) => {
    setLoadingAutomations(prev => new Set(prev).add(automationId));
    
    // Simulate deletion
    setTimeout(() => {
      setLoadingAutomations(prev => {
        const newSet = new Set(prev);
        newSet.delete(automationId);
        return newSet;
      });
      
      // In a real implementation, you would call an API to delete the automation
      console.log(`Automation ${automationId} deleted.`);
    }, 1800);
  };

  return {
    automations: paginatedAutomations,
    allAutomations,
    loading,
    error,
    loadingAutomations,
    pagination,
    searchTerm,
    statusFilter,
    triggerFilter,
    uniqueTriggers,
    setSearchTerm,
    setStatusFilter,
    setTriggerFilter,
    updatePagination,
    handleRunAutomation,
    handleToggleAutomation,
    handleActivationComplete,
    handleDuplicateAutomation,
    handleDeleteAutomation,
    clearFilters,
    refetch: () => setError(null),
  };
};

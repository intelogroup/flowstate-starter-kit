
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

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
    trigger: "Gmail"
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
    trigger: "Email"
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
    trigger: "Webhook"
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
    errorMessage: "Authentication failed - Google Drive API connection expired"
  }
];

export const useAutomations = () => {
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [loadingAutomations, setLoadingAutomations] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [triggerFilter, setTriggerFilter] = useState<string>("all");

  // Filter automations based on search and filters
  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || automation.status === statusFilter;
    const matchesTrigger = triggerFilter === "all" || automation.trigger === triggerFilter;
    
    return matchesSearch && matchesStatus && matchesTrigger;
  });

  const uniqueTriggers = Array.from(new Set(automations.map(a => a.trigger)));

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
          ? { ...automation, status: newStatus as 'active' | 'paused' | 'error' }
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
    setSearchTerm("");
    setStatusFilter("all");
    setTriggerFilter("all");
  };

  return {
    automations,
    filteredAutomations,
    loadingAutomations,
    searchTerm,
    statusFilter,
    triggerFilter,
    uniqueTriggers,
    setSearchTerm,
    setStatusFilter,
    setTriggerFilter,
    handleRunAutomation,
    handleToggleAutomation,
    handleActivationComplete,
    handleDuplicateAutomation,
    handleDeleteAutomation,
    clearFilters,
  };
};

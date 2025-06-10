
import { useAutomationStore } from '@/shared/stores/useAutomationStore';
import { automationService } from '../services/automationService';
import { toast } from '@/hooks/use-toast';

export const useAutomationActions = () => {
  const { toggleAutomationStatus, deleteAutomation as removeFromStore } = useAutomationStore();

  const handleToggleStatus = async (id: string | number) => {
    try {
      toggleAutomationStatus(id);
      toast({
        title: "Status Updated",
        description: "Automation status has been updated successfully.",
      });
    } catch (error) {
      console.error('Failed to toggle automation status:', error);
      toast({
        title: "Error",
        description: "Failed to update automation status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await automationService.deleteAutomation(id.toString());
      removeFromStore(id);
      toast({
        title: "Deleted",
        description: "Automation has been deleted successfully.",
      });
    } catch (error) {
      console.error('Failed to delete automation:', error);
      toast({
        title: "Error",
        description: "Failed to delete automation.",
        variant: "destructive",
      });
    }
  };

  const handleRetry = async (id: string | number) => {
    try {
      // TODO: Implement actual retry logic
      console.log('Retrying automation:', id);
      toast({
        title: "Retrying",
        description: "Automation is being retried.",
      });
    } catch (error) {
      console.error('Failed to retry automation:', error);
      toast({
        title: "Error",
        description: "Failed to retry automation.",
        variant: "destructive",
      });
    }
  };

  const handleReconnect = async (id: string | number) => {
    try {
      // TODO: Implement actual reconnection logic
      console.log('Reconnecting automation:', id);
      toast({
        title: "Reconnecting",
        description: "Attempting to reconnect the service.",
      });
    } catch (error) {
      console.error('Failed to reconnect automation:', error);
      toast({
        title: "Error",
        description: "Failed to reconnect service.",
        variant: "destructive",
      });
    }
  };

  return {
    handleToggleStatus,
    handleDelete,
    handleRetry,
    handleReconnect,
  };
};

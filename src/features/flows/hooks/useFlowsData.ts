
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseFlowService, Flow, CreateFlowData, UpdateFlowData } from '@/shared/services/supabaseFlowService';
import { useEnhancedAlerts } from '@/components/EnhancedAlertSystem';
import { supabaseAuthService } from '@/shared/services/supabaseAuthService';

export const useFlowsData = () => {
  const { addAlert } = useEnhancedAlerts();
  const queryClient = useQueryClient();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Query for fetching flows
  const {
    data: flows = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['flows'],
    queryFn: () => supabaseFlowService.getFlows(),
    enabled: !!supabaseAuthService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Set up real-time subscription
  useEffect(() => {
    if (!isSubscribed && supabaseAuthService.getCurrentUser()) {
      const subscription = supabaseFlowService.subscribeToFlows((updatedFlows) => {
        queryClient.setQueryData(['flows'], updatedFlows);
      });

      if (subscription) {
        setIsSubscribed(true);
        
        return () => {
          subscription.unsubscribe();
          setIsSubscribed(false);
        };
      }
    }
  }, [queryClient, isSubscribed]);

  // Create flow mutation
  const createFlowMutation = useMutation({
    mutationFn: (flowData: CreateFlowData) => supabaseFlowService.createFlow(flowData),
    onSuccess: (newFlow) => {
      queryClient.setQueryData(['flows'], (oldFlows: Flow[] = []) => [newFlow, ...oldFlows]);
      addAlert({
        type: 'success',
        title: 'Flow Created',
        message: `"${newFlow.name}" has been created successfully.`,
        source: 'supabase'
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create flow';
      addAlert({
        type: 'error',
        title: 'Creation Failed',
        message: errorMessage,
        source: 'supabase'
      });
    }
  });

  // Update flow mutation
  const updateFlowMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateFlowData }) => 
      supabaseFlowService.updateFlow(id, updates),
    onSuccess: (updatedFlow) => {
      queryClient.setQueryData(['flows'], (oldFlows: Flow[] = []) => 
        oldFlows.map(flow => flow.id === updatedFlow.id ? updatedFlow : flow)
      );
      addAlert({
        type: 'success',
        title: 'Flow Updated',
        message: `"${updatedFlow.name}" has been updated successfully.`,
        source: 'supabase'
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update flow';
      addAlert({
        type: 'error',
        title: 'Update Failed',
        message: errorMessage,
        source: 'supabase'
      });
    }
  });

  // Delete flow mutation
  const deleteFlowMutation = useMutation({
    mutationFn: (id: string) => supabaseFlowService.deleteFlow(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['flows'], (oldFlows: Flow[] = []) => 
        oldFlows.filter(flow => flow.id !== deletedId)
      );
      addAlert({
        type: 'success',
        title: 'Flow Deleted',
        message: 'Flow has been deleted successfully.',
        source: 'supabase'
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete flow';
      addAlert({
        type: 'error',
        title: 'Deletion Failed',
        message: errorMessage,
        source: 'supabase'
      });
    }
  });

  // Toggle flow status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => supabaseFlowService.toggleFlowStatus(id),
    onSuccess: (updatedFlow) => {
      queryClient.setQueryData(['flows'], (oldFlows: Flow[] = []) => 
        oldFlows.map(flow => flow.id === updatedFlow.id ? updatedFlow : flow)
      );
      addAlert({
        type: 'success',
        title: 'Status Updated',
        message: `"${updatedFlow.name}" is now ${updatedFlow.status}.`,
        source: 'supabase'
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle flow status';
      addAlert({
        type: 'error',
        title: 'Status Update Failed',
        message: errorMessage,
        source: 'supabase'
      });
    }
  });

  // Duplicate flow mutation
  const duplicateFlowMutation = useMutation({
    mutationFn: (id: string) => supabaseFlowService.duplicateFlow(id),
    onSuccess: (duplicatedFlow) => {
      queryClient.setQueryData(['flows'], (oldFlows: Flow[] = []) => [duplicatedFlow, ...oldFlows]);
      addAlert({
        type: 'success',
        title: 'Flow Duplicated',
        message: `"${duplicatedFlow.name}" has been created successfully.`,
        source: 'supabase'
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to duplicate flow';
      addAlert({
        type: 'error',
        title: 'Duplication Failed',
        message: errorMessage,
        source: 'supabase'
      });
    }
  });

  return {
    flows,
    isLoading,
    error,
    refetch,
    createFlow: createFlowMutation.mutate,
    updateFlow: updateFlowMutation.mutate,
    deleteFlow: deleteFlowMutation.mutate,
    toggleStatus: toggleStatusMutation.mutate,
    duplicateFlow: duplicateFlowMutation.mutate,
    isCreating: createFlowMutation.isPending,
    isUpdating: updateFlowMutation.isPending,
    isDeleting: deleteFlowMutation.isPending,
    isTogglingStatus: toggleStatusMutation.isPending,
    isDuplicating: duplicateFlowMutation.isPending
  };
};

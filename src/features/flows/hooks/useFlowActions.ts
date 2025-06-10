
import { useCallback } from 'react';
import { FlowActions } from '../types';

export const useFlowActions = (): FlowActions => {
  const onFlowClick = useCallback((flowId: number) => {
    console.log(`Navigate to flow ${flowId}`);
  }, []);

  const onEditFlow = useCallback((flowId: number, flowName: string) => {
    console.log(`Edit flow ${flowId}: ${flowName}`);
  }, []);

  const onDeleteFlow = useCallback((flowId: number, flowName: string) => {
    console.log(`Delete flow ${flowId}: ${flowName}`);
  }, []);

  const onDuplicateFlow = useCallback((flowId: number, flowName: string) => {
    console.log(`Duplicate flow ${flowId}: ${flowName}`);
  }, []);

  const onToggleStatus = useCallback((flowId: number) => {
    console.log(`Toggle status for flow ${flowId}`);
  }, []);

  return {
    onFlowClick,
    onEditFlow,
    onDeleteFlow,
    onDuplicateFlow,
    onToggleStatus,
  };
};

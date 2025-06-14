
import { useState } from 'react';
import { emailToDriveFlowService, ExecutionResult } from '@/shared/services/emailToDriveFlowService';
import { useEnhancedAlerts } from '@/components/EnhancedAlertSystem';

export const useEmailToDriveFlow = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastExecution, setLastExecution] = useState<ExecutionResult | null>(null);
  const { addAlert } = useEnhancedAlerts();

  const executeFlow = async (flowId: string): Promise<ExecutionResult> => {
    setIsExecuting(true);
    try {
      const result = await emailToDriveFlowService.executeFlow(flowId);
      setLastExecution(result);
      
      if (result.success) {
        addAlert({
          type: 'success',
          title: 'Flow Executed',
          message: `Processed ${result.emailsProcessed} emails, saved ${result.filesSaved} files`,
          source: 'general'
        });
      } else {
        addAlert({
          type: 'error',
          title: 'Flow Failed',
          message: `Execution failed with ${result.errors.length} errors`,
          source: 'general'
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error executing flow:', error);
      const errorResult: ExecutionResult = {
        success: false,
        emailsProcessed: 0,
        filesSaved: 0,
        errors: [String(error)],
        logs: [`Failed to execute flow: ${error}`],
        executionTime: 0
      };
      
      setLastExecution(errorResult);
      addAlert({
        type: 'error',
        title: 'Execution Error',
        message: 'Failed to execute Email to Drive flow',
        source: 'general'
      });
      
      return errorResult;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    executeFlow,
    isExecuting,
    lastExecution
  };
};

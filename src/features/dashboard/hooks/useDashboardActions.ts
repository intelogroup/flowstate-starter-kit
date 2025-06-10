
import { useCallback } from 'react';

export const useDashboardActions = () => {
  const refreshDashboard = useCallback(() => {
    console.log('Refreshing dashboard data...');
  }, []);

  const createFlow = useCallback(() => {
    console.log('Navigating to flow creation...');
  }, []);

  const viewAnalytics = useCallback(() => {
    console.log('Navigating to analytics...');
  }, []);

  return {
    refreshDashboard,
    createFlow,
    viewAnalytics
  };
};

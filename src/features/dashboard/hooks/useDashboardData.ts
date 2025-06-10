
import { useState, useEffect } from 'react';
import { DashboardStats, RecentActivityItem } from '../types';

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalFlows: 0,
    activeFlows: 0,
    totalExecutions: 0,
    successRate: 0
  });
  
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Mock data
      setTimeout(() => {
        setStats({
          totalFlows: 12,
          activeFlows: 8,
          totalExecutions: 2847,
          successRate: 94.2
        });

        setRecentActivity([
          {
            id: '1',
            type: 'flow_executed',
            title: 'Email to Drive Backup executed',
            description: 'Successfully processed 15 attachments',
            timestamp: '2 minutes ago'
          },
          {
            id: '2',
            type: 'flow_created',
            title: 'New flow created',
            description: 'Slack notification flow',
            timestamp: '1 hour ago'
          },
          {
            id: '3',
            type: 'flow_error',
            title: 'Data Sync Process failed',
            description: 'Authentication error with external API',
            timestamp: '3 hours ago'
          }
        ]);

        setIsLoading(false);
      }, 1000);
    };

    loadDashboardData();
  }, []);

  return {
    stats,
    recentActivity,
    isLoading
  };
};

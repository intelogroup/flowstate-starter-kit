
import { useState, useEffect } from 'react';
import { AnalyticsData, AnalyticsFilters, AnalyticsMetric } from '../types';

export const useAnalyticsData = (filters: AnalyticsFilters) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      setIsLoading(true);
      
      // Mock analytics data
      setTimeout(() => {
        setData({
          totalFlows: 24,
          activeFlows: 18,
          totalExecutions: 12547,
          successRate: 96.3,
          errorRate: 3.7,
          avgExecutionTime: 2.4,
          peakUsageHour: '14:00',
          trends: [
            { date: '2024-01-01', executions: 450, errors: 12, avgTime: 2.1 },
            { date: '2024-01-02', executions: 523, errors: 8, avgTime: 2.3 },
            { date: '2024-01-03', executions: 612, errors: 15, avgTime: 2.0 },
          ]
        });

        setMetrics([
          {
            id: 'executions',
            label: 'Total Executions',
            value: 12547,
            change: 12.5,
            trend: 'up',
            format: 'number'
          },
          {
            id: 'success_rate',
            label: 'Success Rate',
            value: 96.3,
            change: 2.1,
            trend: 'up',
            format: 'percentage'
          },
          {
            id: 'avg_time',
            label: 'Avg Execution Time',
            value: 2.4,
            change: -5.2,
            trend: 'down',
            format: 'duration'
          },
          {
            id: 'error_rate',
            label: 'Error Rate',
            value: 3.7,
            change: -8.3,
            trend: 'down',
            format: 'percentage'
          }
        ]);

        setIsLoading(false);
      }, 800);
    };

    loadAnalyticsData();
  }, [filters]);

  return { data, metrics, isLoading };
};

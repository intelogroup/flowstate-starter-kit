
export interface AnalyticsData {
  totalFlows: number;
  activeFlows: number;
  totalExecutions: number;
  successRate: number;
  errorRate: number;
  avgExecutionTime: number;
  peakUsageHour: string;
  trends: AnalyticsTrend[];
}

export interface AnalyticsTrend {
  date: string;
  executions: number;
  errors: number;
  avgTime: number;
}

export interface AnalyticsFilters {
  dateRange: 'today' | 'week' | 'month' | 'quarter' | 'year';
  flowType: 'all' | 'active' | 'paused' | 'error';
  metric: 'executions' | 'success_rate' | 'avg_time' | 'errors';
}

export interface AnalyticsMetric {
  id: string;
  label: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  format: 'number' | 'percentage' | 'duration' | 'currency';
}

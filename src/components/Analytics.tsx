
import { useState, useEffect } from "react";
import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsOverview from "./AnalyticsOverview";
import AnalyticsFlows from "./AnalyticsFlows";
import AnalyticsUsage from "./AnalyticsUsage";
import AnalyticsErrors from "./AnalyticsErrors";
import AnalyticsDetailView from "./AnalyticsDetailView";

interface AnalyticsProps {
  initialFilter?: string;
}

const Analytics = ({ initialFilter }: AnalyticsProps) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle initial filter from dashboard navigation
  useEffect(() => {
    if (initialFilter) {
      switch (initialFilter) {
        case 'all-flows':
          setSelectedMetric('executions');
          break;
        case 'active-flows':
          setSelectedMetric('executions');
          break;
        case 'execution-metrics':
          setSelectedMetric('executions');
          break;
        case 'error-analysis':
          setSelectedMetric('errorRate');
          break;
        default:
          setSelectedMetric(null);
      }
    }
  }, [initialFilter]);

  const handleMetricDrillDown = (metricType: string) => {
    setSelectedMetric(metricType);
  };

  const handleBackToOverview = () => {
    setSelectedMetric(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  if (selectedMetric) {
    return (
      <AnalyticsDetailView 
        metricType={selectedMetric} 
        onBack={handleBackToOverview} 
      />
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <AnalyticsHeader 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
      />
      <AnalyticsOverview onMetricClick={handleMetricDrillDown} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnalyticsFlows />
        <AnalyticsUsage />
      </div>
      <AnalyticsErrors />
    </div>
  );
};

export default Analytics;


import { useState } from "react";
import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsOverview from "./AnalyticsOverview";
import AnalyticsFlows from "./AnalyticsFlows";
import AnalyticsUsage from "./AnalyticsUsage";
import AnalyticsErrors from "./AnalyticsErrors";
import AnalyticsDetailView from "./AnalyticsDetailView";

const Analytics = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const handleMetricDrillDown = (metricType: string) => {
    setSelectedMetric(metricType);
  };

  const handleBackToOverview = () => {
    setSelectedMetric(null);
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
      <AnalyticsHeader />
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

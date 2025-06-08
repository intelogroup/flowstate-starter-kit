
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsMetricsGrid from "./AnalyticsMetricsGrid";
import AnalyticsOverview from "./AnalyticsOverview";
import AnalyticsFlows from "./AnalyticsFlows";
import AnalyticsErrors from "./AnalyticsErrors";
import AnalyticsUsage from "./AnalyticsUsage";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <AnalyticsHeader 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
      />

      <AnalyticsMetricsGrid />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flows">Top Flows</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AnalyticsOverview />
        </TabsContent>

        <TabsContent value="flows" className="space-y-6">
          <AnalyticsFlows />
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <AnalyticsErrors />
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <AnalyticsUsage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;


import { useState } from "react";
import AnalyticsOverview from "./AnalyticsOverview";
import AnalyticsFilters from "./AnalyticsFilters";
import AnalyticsChart from "./AnalyticsChart";
import AnalyticsMetrics from "./AnalyticsMetrics";
import { useAnalyticsData } from "../hooks/useAnalyticsData";
import { LoadingSpinner } from "@/shared/components";

interface AnalyticsContainerProps {
  initialFilter?: string;
}

const AnalyticsContainer = ({ initialFilter }: AnalyticsContainerProps) => {
  const [filters, setFilters] = useState({
    dateRange: 'month' as const,
    flowType: initialFilter || 'all' as const,
    metric: 'executions' as const
  });

  const { data, metrics, isLoading } = useAnalyticsData(filters);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Monitor your automation performance and trends</p>
      </div>

      <AnalyticsFilters filters={filters} onFiltersChange={setFilters} />
      
      <AnalyticsMetrics metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsOverview data={data} />
        <AnalyticsChart data={data} />
      </div>
    </div>
  );
};

export default AnalyticsContainer;

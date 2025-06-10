
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnalyticsFilters as AnalyticsFiltersType } from "../types";

interface AnalyticsFiltersProps {
  filters: AnalyticsFiltersType;
  onFiltersChange: (filters: AnalyticsFiltersType) => void;
}

const AnalyticsFilters = ({ filters, onFiltersChange }: AnalyticsFiltersProps) => {
  return (
    <div className="flex gap-4">
      <Select 
        value={filters.dateRange} 
        onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value as any })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="quarter">This Quarter</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filters.flowType} 
        onValueChange={(value) => onFiltersChange({ ...filters, flowType: value as any })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Flow Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Flows</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
          <SelectItem value="error">Error</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filters.metric} 
        onValueChange={(value) => onFiltersChange({ ...filters, metric: value as any })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Metric" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="executions">Executions</SelectItem>
          <SelectItem value="success_rate">Success Rate</SelectItem>
          <SelectItem value="avg_time">Avg Time</SelectItem>
          <SelectItem value="errors">Errors</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AnalyticsFilters;

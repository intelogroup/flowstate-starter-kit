
import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  isRefreshing: boolean;
  handleRefresh: () => void;
}

const AnalyticsHeader = ({ timeRange, setTimeRange, isRefreshing, handleRefresh }: AnalyticsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Monitor your automation performance and usage patterns.</p>
      </div>
      <div className="flex items-center gap-3">
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;

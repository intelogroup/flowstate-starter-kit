
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Unplug } from "lucide-react";

interface FlowsHeaderProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (status: string) => void;
  onCreateFlow: () => void;
  onDisconnectService: () => void;
}

export const FlowsHeader = ({ 
  searchQuery, 
  statusFilter, 
  onSearchChange, 
  onStatusFilterChange, 
  onCreateFlow, 
  onDisconnectService 
}: FlowsHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Flows</h1>
          <p className="text-muted-foreground">Manage and monitor your automation flows</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onCreateFlow}>
            Create New Flow
          </Button>
          <Button 
            variant="outline" 
            onClick={onDisconnectService}
            className="text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <Unplug className="w-4 h-4 mr-2" />
            Disconnect Google
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search flows..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "paused", "error"].map(status => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusFilterChange(status)}
            >
              <Filter className="w-4 h-4 mr-1" />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

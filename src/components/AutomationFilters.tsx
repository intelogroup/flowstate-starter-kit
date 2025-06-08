
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AutomationFiltersProps {
  searchTerm: string;
  statusFilter: string;
  triggerFilter: string;
  uniqueTriggers: string[];
  hasResults: boolean;
  totalAutomations: number;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onTriggerFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const AutomationFilters = ({
  searchTerm,
  statusFilter,
  triggerFilter,
  uniqueTriggers,
  hasResults,
  totalAutomations,
  onSearchChange,
  onStatusFilterChange,
  onTriggerFilterChange,
  onClearFilters,
}: AutomationFiltersProps) => {
  return (
    <>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search automations..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>

        <Select value={triggerFilter} onValueChange={onTriggerFilterChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Triggers</SelectItem>
            {uniqueTriggers.map(trigger => (
              <SelectItem key={trigger} value={trigger}>{trigger}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* No Results State */}
      {!hasResults && totalAutomations > 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No automations found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AutomationFilters;

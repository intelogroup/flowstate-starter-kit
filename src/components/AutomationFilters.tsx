
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "./EmptyStates";

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
  const hasActiveFilters = searchTerm || statusFilter !== "all" || triggerFilter !== "all";

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
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => onSearchChange("")}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
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

        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => onSearchChange("")}
              />
            </Badge>
          )}
          {statusFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Status: {statusFilter}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => onStatusFilterChange("all")}
              />
            </Badge>
          )}
          {triggerFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Trigger: {triggerFilter}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => onTriggerFilterChange("all")}
              />
            </Badge>
          )}
        </div>
      )}

      {/* No Results State - Use EmptyState component */}
      {!hasResults && totalAutomations > 0 && (
        <EmptyState
          icon={Search}
          title="No automations found"
          description="Try adjusting your search terms or browse different categories"
          actionLabel="Clear Filters"
          onAction={onClearFilters}
        />
      )}
    </>
  );
};

export default AutomationFilters;

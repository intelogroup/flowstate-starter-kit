
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface FlowsFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

const FlowsFilters = ({ statusFilter, onStatusFilterChange }: FlowsFiltersProps) => {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "error", label: "Error" }
  ];

  return (
    <div className="flex gap-2">
      {filterOptions.map(option => (
        <Button
          key={option.value}
          variant={statusFilter === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusFilterChange(option.value)}
        >
          <Filter className="w-4 h-4 mr-1" />
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default FlowsFilters;


import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface TemplateFiltersProps {
  filters: {
    category: string;
    difficulty: string;
    searchQuery: string;
  };
  onFiltersChange: (filters: any) => void;
}

const TemplateFilters = ({ filters, onFiltersChange }: TemplateFiltersProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={filters.searchQuery}
          onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
          className="pl-10"
        />
      </div>
      
      <Select 
        value={filters.category} 
        onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="social">Social Media</SelectItem>
          <SelectItem value="productivity">Productivity</SelectItem>
          <SelectItem value="data">Data Processing</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filters.difficulty} 
        onValueChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TemplateFilters;


import { TodoFilters as TodoFiltersType } from '@/types/todo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface TodoFiltersProps {
  filters: TodoFiltersType;
  onUpdateFilters: (filters: Partial<TodoFiltersType>) => void;
  onClearFilters: () => void;
}

const TodoFilters = ({ filters, onUpdateFilters, onClearFilters }: TodoFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== null
  );

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4" />
          <span className="font-medium text-sm">Filters</span>
          {hasActiveFilters && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearFilters}
              className="text-xs ml-auto"
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              placeholder="Search todos..."
              value={filters.search || ''}
              onChange={(e) => onUpdateFilters({ search: e.target.value || undefined })}
              className="pl-9"
            />
          </div>

          {/* Phase */}
          <Select
            value={filters.phase || 'all'}
            onValueChange={(value) => onUpdateFilters({ phase: value === 'all' ? undefined : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All phases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All phases</SelectItem>
              <SelectItem value="foundation">Foundation</SelectItem>
              <SelectItem value="templates">Templates</SelectItem>
              <SelectItem value="ai-integration">AI Integration</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority */}
          <Select
            value={filters.priority || 'all'}
            onValueChange={(value) => onUpdateFilters({ priority: value === 'all' ? undefined : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={filters.completed === undefined ? 'all' : filters.completed ? 'completed' : 'pending'}
            onValueChange={(value) => {
              if (value === 'all') {
                onUpdateFilters({ completed: undefined });
              } else {
                onUpdateFilters({ completed: value === 'completed' });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {filters.search && (
              <Badge variant="secondary">
                Search: {filters.search}
              </Badge>
            )}
            {filters.phase && (
              <Badge variant="secondary">
                Phase: {filters.phase}
              </Badge>
            )}
            {filters.priority && (
              <Badge variant="secondary">
                Priority: {filters.priority}
              </Badge>
            )}
            {filters.completed !== undefined && (
              <Badge variant="secondary">
                Status: {filters.completed ? 'Completed' : 'Pending'}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoFilters;

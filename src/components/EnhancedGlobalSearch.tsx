
import { useState } from "react";
import { Search, Filter, X, Clock, Workflow, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchResult {
  id: string;
  title: string;
  type: 'flow' | 'template' | 'automation';
  status?: 'active' | 'paused' | 'error';
  description: string;
  tags: string[];
}

interface EnhancedGlobalSearchProps {
  onResultClick?: (result: SearchResult) => void;
  placeholder?: string;
}

const EnhancedGlobalSearch = ({ 
  onResultClick, 
  placeholder = "Search flows, templates, automations..." 
}: EnhancedGlobalSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    types: [] as string[],
    statuses: [] as string[],
    tags: [] as string[]
  });

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: "1",
      title: "Email to Drive Backup",
      type: "flow",
      status: "active",
      description: "Automatically save email attachments to Google Drive",
      tags: ["email", "backup", "productivity"]
    },
    {
      id: "2", 
      title: "Slack Notification Template",
      type: "template",
      description: "Send automated notifications to Slack channels",
      tags: ["slack", "notifications", "team"]
    },
    {
      id: "3",
      title: "Data Sync Automation",
      type: "automation",
      status: "error",
      description: "Synchronize data between multiple platforms",
      tags: ["sync", "data", "integration"]
    }
  ];

  const filteredResults = mockResults.filter(result => {
    const matchesQuery = searchQuery === "" || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = activeFilters.types.length === 0 || 
      activeFilters.types.includes(result.type);

    const matchesStatus = activeFilters.statuses.length === 0 || 
      (result.status && activeFilters.statuses.includes(result.status));

    return matchesQuery && matchesType && matchesStatus;
  });

  const toggleFilter = (category: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({ types: [], statuses: [], tags: [] });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flow': return <Workflow className="w-4 h-4" />;
      case 'template': return <Tag className="w-4 h-4" />;
      case 'automation': return <Clock className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-20 h-12 text-base"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 ${hasActiveFilters ? 'border-primary' : ''}`}
              >
                <Filter className="w-3 h-3" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                    {Object.values(activeFilters).flat().length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Type</h4>
                  <div className="space-y-2">
                    {['flow', 'template', 'automation'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={activeFilters.types.includes(type)}
                          onCheckedChange={() => toggleFilter('types', type)}
                        />
                        <label htmlFor={type} className="text-sm capitalize">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <div className="space-y-2">
                    {['active', 'paused', 'error'].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={status}
                          checked={activeFilters.statuses.includes(status)}
                          onCheckedChange={() => toggleFilter('statuses', status)}
                        />
                        <label htmlFor={status} className="text-sm capitalize">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Results */}
      {(searchQuery || hasActiveFilters) && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {filteredResults.length > 0 ? (
              <div className="space-y-1">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => onResultClick?.(result)}
                  >
                    <div className="text-muted-foreground">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{result.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {result.type}
                        </Badge>
                        {result.status && (
                          <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                            {result.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {result.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {result.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No results found</p>
                <p className="text-xs">Try adjusting your search or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedGlobalSearch;

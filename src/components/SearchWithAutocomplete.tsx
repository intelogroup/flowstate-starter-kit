
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, X } from "lucide-react";

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'suggestion' | 'template';
  category?: string;
}

const mockSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'Gmail to Slack', type: 'recent' },
  { id: '2', text: 'Google Drive backup', type: 'recent' },
  { id: '3', text: 'Email automation', type: 'suggestion', category: 'Popular' },
  { id: '4', text: 'Slack notifications', type: 'suggestion', category: 'Popular' },
  { id: '5', text: 'CRM integration', type: 'template', category: 'Templates' },
  { id: '6', text: 'Social media posting', type: 'template', category: 'Templates' },
];

interface SearchWithAutocompleteProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchWithAutocomplete = ({ 
  placeholder = "Search flows, templates, and integrations...", 
  onSearch,
  className = ""
}: SearchWithAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Gmail to Slack', 'Google Drive backup'
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length === 0) {
      // Show recent searches and popular suggestions when empty
      setFilteredSuggestions(
        mockSuggestions.filter(s => s.type === 'recent' || s.type === 'suggestion').slice(0, 6)
      );
    } else {
      // Filter suggestions based on query
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setQuery(searchQuery);
      setIsOpen(false);
      
      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [searchQuery, ...prev.filter(item => item !== searchQuery)];
        return updated.slice(0, 5); // Keep only 5 recent searches
      });
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    handleSearch(suggestion.text);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    onSearch("");
    inputRef.current?.focus();
  };

  const groupedSuggestions = filteredSuggestions.reduce((acc, suggestion) => {
    const key = suggestion.type === 'recent' ? 'Recent' : (suggestion.category || 'Suggestions');
    if (!acc[key]) acc[key] = [];
    acc[key].push(suggestion);
    return acc;
  }, {} as Record<string, SearchSuggestion[]>);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            onClick={clearSearch}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {Object.keys(groupedSuggestions).length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No suggestions found
              </div>
            ) : (
              Object.entries(groupedSuggestions).map(([category, suggestions]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground bg-muted/50 border-b">
                    {category}
                  </div>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center gap-3 border-b border-border/50 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.type === 'recent' ? (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Search className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              ))
            )}
            
            {query && (
              <div className="border-t p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSearch(query)}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search for "{query}"
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchWithAutocomplete;

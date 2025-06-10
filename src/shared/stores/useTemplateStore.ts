
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  rating: number;
  users: number;
  complexity: string;
  estimatedTime: string;
  tags: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface TemplateFilters {
  searchQuery: string;
  categoryFilter: string;
}

interface TemplateState {
  templates: Template[];
  filteredTemplates: Template[];
  filters: TemplateFilters;
  isLoading: boolean;
  error: string | null;
  categories: string[];
}

interface TemplateActions {
  setTemplates: (templates: Template[]) => void;
  updateFilters: (filters: Partial<TemplateFilters>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialFilters: TemplateFilters = {
  searchQuery: '',
  categoryFilter: 'all',
};

export const useTemplateStore = create<TemplateState & TemplateActions>()(
  devtools(
    (set, get) => ({
      // State
      templates: [],
      filteredTemplates: [],
      filters: initialFilters,
      isLoading: false,
      error: null,
      categories: ['all'],

      // Actions
      setTemplates: (templates) => {
        const categories = ['all', ...new Set(templates.map(t => t.category))];
        const filteredTemplates = filterTemplates(templates, get().filters);
        set({ templates, filteredTemplates, categories });
      },

      updateFilters: (newFilters) => {
        const filters = { ...get().filters, ...newFilters };
        const filteredTemplates = filterTemplates(get().templates, filters);
        set({ filters, filteredTemplates });
      },

      clearFilters: () => {
        const filteredTemplates = get().templates;
        set({ filters: initialFilters, filteredTemplates });
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    { name: 'template-store' }
  )
);

function filterTemplates(templates: Template[], filters: TemplateFilters): Template[] {
  return templates.filter(template => {
    const matchesSearch = !filters.searchQuery || 
      template.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()));
    
    const matchesCategory = filters.categoryFilter === 'all' || template.category === filters.categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
}

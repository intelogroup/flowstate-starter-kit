
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  usageCount: number;
  rating: number;
  preview?: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  templateCount: number;
}

export interface TemplateFilters {
  category: string;
  difficulty: string;
  searchQuery: string;
}

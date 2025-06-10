
import { useState } from "react";
import TemplateFilters from "./TemplateFilters";
import TemplateCategories from "./TemplateCategories";
import TemplateCard from "./TemplateCard";
import { useTemplates } from "../hooks/useTemplates";
import { LoadingSpinner } from "@/shared/components";

const TemplatesContainer = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    searchQuery: ''
  });

  const { templates, categories, isLoading } = useTemplates(filters);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Template Library</h1>
        <p className="text-muted-foreground">Choose from our collection of pre-built automation templates</p>
      </div>

      <TemplateCategories categories={categories} />
      
      <TemplateFilters 
        filters={filters} 
        onFiltersChange={setFilters} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplatesContainer;

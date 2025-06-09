
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  ArrowRight,
  Mail,
  FileSpreadsheet,
  MessageSquare,
  Database,
  Clock,
  Zap
} from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";
import { EmptyState } from "./EmptyStates";
import { useNavigate } from "react-router-dom";

const TemplateLibrary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  // Mock data - will be replaced with actual Supabase data
  const templates = [
    {
      id: 1,
      title: "Email to Drive",
      description: "Save email attachments automatically to Google Drive folders",
      category: "Productivity",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      rating: 4.8,
      users: 1247,
      complexity: "Beginner",
      estimatedTime: "5 min setup",
      tags: ["email", "drive", "attachments"],
      isPopular: true,
      isFeatured: true
    },
    {
      id: 2,
      title: "Invoice Processing",
      description: "Extract data from invoice PDFs and save to spreadsheet",
      category: "Finance",
      icon: FileSpreadsheet,
      targetIcon: Database,
      rating: 4.9,
      users: 892,
      complexity: "Intermediate",
      estimatedTime: "10 min setup",
      tags: ["invoices", "pdf", "data extraction"],
      isNew: true,
      isFeatured: true
    },
    {
      id: 3,
      title: "Social Media Monitor",
      description: "Track mentions and send Slack notifications",
      category: "Marketing",
      icon: MessageSquare,
      targetIcon: MessageSquare,
      rating: 4.6,
      users: 634,
      complexity: "Advanced",
      estimatedTime: "15 min setup",
      tags: ["social media", "monitoring", "notifications"],
      isPopular: false,
      isFeatured: false
    },
    {
      id: 4,
      title: "Lead Generation",
      description: "Capture leads from forms and add to CRM automatically",
      category: "Sales",
      icon: Users,
      targetIcon: Database,
      rating: 4.7,
      users: 523,
      complexity: "Beginner",
      estimatedTime: "8 min setup",
      tags: ["leads", "crm", "forms"],
      isPopular: true,
      isFeatured: false
    },
    {
      id: 5,
      title: "Report Generator",
      description: "Generate weekly reports from your data sources",
      category: "Analytics",
      icon: Database,
      targetIcon: FileSpreadsheet,
      rating: 4.5,
      users: 289,
      complexity: "Intermediate",
      estimatedTime: "12 min setup",
      tags: ["reports", "analytics", "automation"],
      isPopular: false,
      isFeatured: false
    }
  ];

  const categories = ["all", "Productivity", "Finance", "Marketing", "Sales", "Analytics"];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredTemplates = filteredTemplates.filter(t => t.isFeatured);
  const regularTemplates = filteredTemplates.filter(t => !t.isFeatured);

  const handleUseTemplate = (templateId: number) => {
    navigate(`/create-flow/${templateId}`);
  };

  const handleViewTemplate = (templateId: number) => {
    navigate(`/template/${templateId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSkeleton type="page-header" />
        <LoadingSkeleton type="filters" />
        <LoadingSkeleton type="templates" count={6} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Template Library</h1>
        <p className="text-muted-foreground">
          Discover pre-built automation templates to jumpstart your workflows
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-input bg-background px-3 py-2 rounded-md text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No templates found"
          description="Try adjusting your search terms or browse different categories"
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery("");
            setCategoryFilter("all");
          }}
        />
      ) : (
        <div className="space-y-8">
          {/* Featured Templates */}
          {featuredTemplates.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-semibold text-foreground">Featured Templates</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onUse={handleUseTemplate}
                    onView={handleViewTemplate}
                    featured
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Templates */}
          {regularTemplates.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">All Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onUse={handleUseTemplate}
                    onView={handleViewTemplate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface TemplateCardProps {
  template: any;
  onUse: (id: number) => void;
  onView: (id: number) => void;
  featured?: boolean;
}

const TemplateCard = ({ template, onUse, onView, featured = false }: TemplateCardProps) => {
  const SourceIcon = template.icon;
  const TargetIcon = template.targetIcon;

  return (
    <Card 
      className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
        featured ? 'border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent' : 'hover:border-primary/20'
      }`}
      onClick={() => onView(template.id)}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header with Icons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <SourceIcon className="w-5 h-5 text-blue-600" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <TargetIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex gap-1">
              {template.isPopular && <Badge variant="secondary">Popular</Badge>}
              {template.isNew && <Badge variant="outline">New</Badge>}
              {featured && <Badge variant="default">Featured</Badge>}
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-semibold text-foreground mb-1">{template.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {template.rating}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {template.users}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {template.estimatedTime}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.tags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onUse(template.id);
              }}
            >
              <Zap className="w-3 h-3 mr-1" />
              Use Template
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(template.id);
              }}
            >
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateLibrary;

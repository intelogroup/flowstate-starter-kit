
import { Search, Filter, Grid, List, Mail, MessageSquare, FileSpreadsheet, Plus, Play, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FlowSearchChat from "./FlowSearchChat";

const TemplateLibrary = () => {
  const navigate = useNavigate();
  const [showAISearch, setShowAISearch] = useState(false);
  
  const templates = [
    {
      id: 1,
      title: "Email to Drive",
      description: "Save email attachments to Google Drive folders automatically.",
      category: "Productivity",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      stats: "924 requests • 1.2K users",
      tags: ["email", "drive", "attachments"],
      useCase: "Perfect for saving invoices, contracts, and important documents"
    },
    {
      id: 2,
      title: "Email to WhatsApp",
      description: "Get WhatsApp notifications for specific emails.",
      category: "Communication",
      icon: Mail,
      targetIcon: MessageSquare,
      stats: "645 requests • 890 users",
      tags: ["email", "whatsapp", "notifications"],
      useCase: "Stay notified of urgent emails while away from your computer"
    },
    {
      id: 3,
      title: "Email to Sheets",
      description: "Log email details to Google Sheets for tracking.",
      category: "Data Management",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      stats: "378 requests • 520 users",
      tags: ["email", "sheets", "data entry"],
      useCase: "Track customer inquiries, support tickets, or sales leads"
    },
    {
      id: 4,
      title: "Invoice Processor",
      description: "Extract and organize invoice attachments by date and vendor.",
      category: "Finance",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      stats: "156 requests • 230 users",
      tags: ["invoices", "finance", "automation"],
      useCase: "Automate accounting workflows and expense tracking"
    },
    {
      id: 5,
      title: "Social Media Scheduler",
      description: "Schedule posts across multiple social media platforms.",
      category: "Marketing",
      icon: MessageSquare,
      targetIcon: MessageSquare,
      stats: "892 requests • 670 users",
      tags: ["social media", "scheduling", "content"],
      useCase: "Maintain consistent social media presence"
    },
    {
      id: 6,
      title: "Lead Capture to CRM",
      description: "Automatically add new leads from forms to your CRM system.",
      category: "Sales",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      stats: "445 requests • 320 users",
      tags: ["crm", "leads", "sales"],
      useCase: "Never miss a potential customer"
    }
  ];

  const handleUseTemplate = (templateId: number) => {
    navigate(`/create-flow/${templateId}`);
  };

  const handlePreviewTemplate = (templateId: number) => {
    navigate(`/template/${templateId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Flow Library</h1>
          <p className="text-muted-foreground">Discover pre-built automations to streamline your workflows.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Request a Flow
        </Button>
      </div>

      {/* AI Search Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">AI-Powered Flow Discovery</CardTitle>
                <p className="text-sm text-muted-foreground">Describe what you want to automate and get personalized recommendations</p>
              </div>
            </div>
            <Button 
              variant={showAISearch ? "secondary" : "default"}
              onClick={() => setShowAISearch(!showAISearch)}
            >
              {showAISearch ? "Hide" : "Try AI Search"}
            </Button>
          </div>
        </CardHeader>
        {showAISearch && (
          <CardContent>
            <FlowSearchChat onTemplateSelect={handleUseTemplate} />
          </CardContent>
        )}
      </Card>

      {/* Traditional Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search flows (e.g., 'email to drive', 'invoices')..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const SourceIcon = template.icon;
          const TargetIcon = template.targetIcon;
          
          return (
            <div key={template.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <SourceIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <TargetIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <Badge variant="secondary">
                  {template.category}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">{template.title}</h3>
              <p className="text-muted-foreground mb-3">{template.description}</p>
              <p className="text-sm text-muted-foreground mb-4 italic">{template.useCase}</p>
              
              <div className="text-sm text-muted-foreground mb-4">{template.stats}</div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleUseTemplate(template.id)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Use Flow
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handlePreviewTemplate(template.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateLibrary;

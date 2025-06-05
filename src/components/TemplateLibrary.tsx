
import { Search, Filter, Grid, List, Mail, MessageSquare, FileSpreadsheet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const TemplateLibrary = () => {
  const templates = [
    {
      id: 1,
      title: "Email to Drive",
      description: "Save email attachments to Google Drive folders.",
      category: "Productivity",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      stats: "924 requests • 1.2K users",
      tags: ["email", "drive", "attachments"]
    },
    {
      id: 2,
      title: "Email to WhatsApp",
      description: "Get WhatsApp notifications for specific emails.",
      category: "Communication",
      icon: Mail,
      targetIcon: MessageSquare,
      stats: "645 requests • 890 users",
      tags: ["email", "whatsapp", "notifications"]
    },
    {
      id: 3,
      title: "Email to Sheets",
      description: "Log email details to Google Sheets for tracking.",
      category: "Data Management",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      stats: "378 requests • 520 users",
      tags: ["email", "sheets", "data entry"]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Template Library</h1>
          <p className="text-gray-400">Discover pre-built automations to streamline your workflows.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Request a Template
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search templates (e.g., 'email to drive', 'invoices')..." 
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-700">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-700">
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
            <div key={template.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <SourceIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <TargetIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  {template.category}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{template.title}</h3>
              <p className="text-gray-400 mb-4">{template.description}</p>
              
              <div className="text-sm text-gray-500 mb-4">{template.stats}</div>
              
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateLibrary;

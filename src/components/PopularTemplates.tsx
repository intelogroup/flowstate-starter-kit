
import { Mail, MessageSquare, FileSpreadsheet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PopularTemplates = () => {
  const featuredTemplates = [
    {
      id: 1,
      title: "Email to Drive",
      description: "Save email attachments automatically",
      category: "Productivity",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      users: "1.2K users"
    },
    {
      id: 2,
      title: "Email to WhatsApp",
      description: "Get WhatsApp notifications for emails",
      category: "Communication",
      icon: Mail,
      targetIcon: MessageSquare,
      users: "890 users"
    },
    {
      id: 3,
      title: "Email to Sheets",
      description: "Log email details to spreadsheets",
      category: "Data Management",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      users: "520 users"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Popular Templates</h2>
          <p className="text-sm text-muted-foreground">Quick start with these automation templates</p>
        </div>
        <Button variant="outline" size="sm">
          View All Templates
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredTemplates.map((template) => {
          const SourceIcon = template.icon;
          const TargetIcon = template.targetIcon;
          
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer border border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <SourceIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <TargetIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {template.category}
                  </Badge>
                </div>
                
                <h3 className="font-medium text-foreground mb-1">{template.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                <p className="text-xs text-muted-foreground">{template.users}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTemplates;

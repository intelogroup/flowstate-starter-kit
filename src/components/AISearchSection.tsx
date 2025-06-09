
import { useState } from "react";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FlowSearchChat from "./FlowSearchChat";

interface AISearchSectionProps {
  onTemplateSelect: (templateId: number) => void;
}

const AISearchSection = ({ onTemplateSelect }: AISearchSectionProps) => {
  const [showAISearch, setShowAISearch] = useState(false);

  const quickTemplates = [
    { id: 1, title: "Email to Drive", users: "1.2K" },
    { id: 2, title: "Email to WhatsApp", users: "890" },
    { id: 3, title: "Email to Sheets", users: "520" }
  ];

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                AI Flow Search
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground">Describe what you want to automate</p>
            </div>
          </div>
          <Button 
            variant={showAISearch ? "secondary" : "default"}
            size="sm"
            onClick={() => setShowAISearch(!showAISearch)}
          >
            {showAISearch ? "Hide" : "AI Search"}
          </Button>
        </div>
      </CardHeader>
      {showAISearch && (
        <CardContent className="pt-0 space-y-4">
          <FlowSearchChat onTemplateSelect={onTemplateSelect} />
          
          {/* Quick Access to Popular Templates */}
          <div className="border-t border-border pt-4">
            <p className="text-xs font-medium text-muted-foreground mb-3">Quick Start (Most Popular):</p>
            <div className="flex flex-wrap gap-2">
              {quickTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onTemplateSelect(template.id)}
                  className="text-xs hover:bg-primary hover:text-primary-foreground"
                >
                  {template.title}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {template.users}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AISearchSection;

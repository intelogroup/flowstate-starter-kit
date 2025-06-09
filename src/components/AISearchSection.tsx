
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FlowSearchChat from "./FlowSearchChat";

interface AISearchSectionProps {
  onTemplateSelect: (templateId: number) => void;
}

const AISearchSection = ({ onTemplateSelect }: AISearchSectionProps) => {
  const [showAISearch, setShowAISearch] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">AI Flow Search</CardTitle>
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
        <CardContent className="pt-0">
          <FlowSearchChat onTemplateSelect={onTemplateSelect} />
        </CardContent>
      )}
    </Card>
  );
};

export default AISearchSection;

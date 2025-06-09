
import { useState } from "react";
import { ChevronDown, Braces, Database, Mail, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface DataField {
  key: string;
  label: string;
  type: string;
  example?: string;
}

interface DataStep {
  stepId: string;
  stepName: string;
  stepType: string;
  fields: DataField[];
}

interface DynamicDataPickerProps {
  availableData: DataStep[];
  onSelect: (placeholder: string) => void;
  size?: "sm" | "default" | "lg";
  variant?: "outline" | "ghost" | "secondary";
  className?: string;
}

const DynamicDataPicker = ({ 
  availableData, 
  onSelect, 
  size = "sm",
  variant = "outline",
  className = ""
}: DynamicDataPickerProps) => {
  const [open, setOpen] = useState(false);

  const getStepIcon = (stepType: string) => {
    switch (stepType.toLowerCase()) {
      case 'gmail':
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'database':
      case 'storage':
        return <Database className="w-4 h-4" />;
      case 'calendar':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Braces className="w-4 h-4" />;
    }
  };

  const handleFieldSelect = (stepId: string, fieldKey: string) => {
    const placeholder = `{{${stepId}.${fieldKey}}}`;
    onSelect(placeholder);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`h-8 w-8 p-0 ${className}`}
          type="button"
        >
          <Braces className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-sm">Insert Dynamic Data</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Select data from previous steps
          </p>
        </div>
        <ScrollArea className="h-80">
          <div className="p-2">
            {availableData.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Braces className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No data available</p>
                <p className="text-xs">Add previous steps to see available data</p>
              </div>
            ) : (
              availableData.map((step) => (
                <div key={step.stepId} className="mb-4">
                  <div className="flex items-center gap-2 mb-2 px-2">
                    {getStepIcon(step.stepType)}
                    <span className="font-medium text-sm">{step.stepName}</span>
                    <Badge variant="secondary" className="text-xs">
                      {step.stepType}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {step.fields.map((field) => (
                      <button
                        key={field.key}
                        onClick={() => handleFieldSelect(step.stepId, field.key)}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{field.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {field.type}
                          </Badge>
                        </div>
                        {field.example && (
                          <p className="text-xs text-muted-foreground mt-1">
                            e.g., {field.example}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default DynamicDataPicker;

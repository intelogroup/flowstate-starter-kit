
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Plus, Braces } from 'lucide-react';
import { FlowStep, DataField } from '@/hooks/useDynamicDataMapping';

interface DynamicDataPickerProps {
  availableSteps: FlowStep[];
  onSelect: (placeholder: string) => void;
  variant?: 'plus' | 'braces';
  size?: 'sm' | 'md';
}

const DynamicDataPicker = ({ 
  availableSteps, 
  onSelect, 
  variant = 'plus',
  size = 'sm' 
}: DynamicDataPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (stepId: string, fieldKey: string) => {
    const placeholder = `{{${stepId}.output.${fieldKey}}}`;
    onSelect(placeholder);
    setIsOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'text-blue-600';
      case 'date': return 'text-green-600';
      case 'number': return 'text-purple-600';
      case 'boolean': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return '@';
      case 'date': return '📅';
      case 'number': return '#';
      case 'boolean': return '✓';
      default: return 'T';
    }
  };

  if (availableSteps.length === 0) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={size}
          className={`${size === 'sm' ? 'h-6 w-6 p-0' : 'h-8 w-8 p-0'} hover:bg-primary/10 border border-border rounded`}
          title="Insert dynamic data"
        >
          {variant === 'plus' ? (
            <Plus className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`} />
          ) : (
            <Braces className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-80 max-h-96 overflow-y-auto bg-popover border shadow-lg"
      >
        <DropdownMenuLabel className="text-sm font-semibold">
          Insert Dynamic Data
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {availableSteps.map((step, stepIndex) => (
          <div key={step.id}>
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
              {step.name}
            </DropdownMenuLabel>
            {step.outputs.map((field) => (
              <DropdownMenuItem
                key={`${step.id}.${field.key}`}
                onClick={() => handleSelect(step.id, field.key)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-accent"
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className={`text-xs font-mono w-4 text-center ${getTypeColor(field.type)}`}>
                    {getTypeIcon(field.type)}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{field.label}</div>
                    {field.description && (
                      <div className="text-xs text-muted-foreground">{field.description}</div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {field.type}
                </div>
              </DropdownMenuItem>
            ))}
            {stepIndex < availableSteps.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
        
        {availableSteps.length === 0 && (
          <DropdownMenuItem disabled className="text-center text-muted-foreground">
            No previous steps available
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DynamicDataPicker;


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Zap } from "lucide-react";

interface EmptyStateProps {
  type: 'flows' | 'automations' | 'templates' | 'search';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  showSecondaryAction?: boolean;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

const EmptyState = ({ 
  type, 
  title, 
  description, 
  actionLabel = "Get Started", 
  onAction, 
  showSecondaryAction = false,
  secondaryActionLabel = "Learn More",
  onSecondaryAction 
}: EmptyStateProps) => {
  const getIcon = () => {
    switch (type) {
      case 'flows':
        return <Zap className="w-16 h-16 text-muted-foreground" />;
      case 'automations':
        return <Plus className="w-16 h-16 text-muted-foreground" />;
      case 'search':
        return <Search className="w-16 h-16 text-muted-foreground" />;
      default:
        return <Zap className="w-16 h-16 text-muted-foreground" />;
    }
  };

  return (
    <Card className="border-dashed border-2 border-muted">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          {getIcon()}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        <div className="flex gap-3">
          {onAction && (
            <Button onClick={onAction}>
              <Plus className="w-4 h-4 mr-2" />
              {actionLabel}
            </Button>
          )}
          {showSecondaryAction && onSecondaryAction && (
            <Button variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;

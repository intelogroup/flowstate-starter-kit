
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = ({ title, description, icon: Icon, action, className }: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {Icon && (
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;

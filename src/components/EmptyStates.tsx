
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = ""
}: EmptyStateProps) => {
  return (
    <Card className={`border-dashed ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        <div className="flex gap-3">
          {actionLabel && onAction && (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const InlineEmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ""
}: Omit<EmptyStateProps, 'secondaryActionLabel' | 'onSecondaryAction'>) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 px-4 text-center ${className}`}>
      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h4 className="font-medium text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

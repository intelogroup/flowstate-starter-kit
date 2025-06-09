
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  Database, 
  Wifi, 
  Settings 
} from "lucide-react";

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({ 
  icon: Icon = Database, 
  title, 
  description, 
  action, 
  secondaryAction 
}: EmptyStateProps) => (
  <Card className="w-full">
    <CardContent className="p-12 text-center">
      <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      <div className="space-y-2">
        {action && (
          <Button onClick={action.onClick} variant={action.variant || 'default'}>
            {action.label}
          </Button>
        )}
        {secondaryAction && (
          <div>
            <Button onClick={secondaryAction.onClick} variant="outline">
              {secondaryAction.label}
            </Button>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

// Predefined empty states
export const NoAutomationsEmpty = ({ onCreateAutomation }: { onCreateAutomation: () => void }) => (
  <EmptyState
    icon={Plus}
    title="No Automations Yet"
    description="Get started by creating your first automation. Connect your favorite apps and automate repetitive tasks."
    action={{
      label: "Create First Automation",
      onClick: onCreateAutomation
    }}
  />
);

export const NoSearchResultsEmpty = ({ onClearSearch }: { onClearSearch: () => void }) => (
  <EmptyState
    icon={Search}
    title="No Results Found"
    description="We couldn't find any automations matching your search criteria. Try adjusting your search terms or filters."
    action={{
      label: "Clear Search",
      onClick: onClearSearch,
      variant: 'outline'
    }}
  />
);

export const NoFilterResultsEmpty = ({ onClearFilters }: { onClearFilters: () => void }) => (
  <EmptyState
    icon={Filter}
    title="No Matching Automations"
    description="No automations match your current filter settings. Try broadening your criteria or clear all filters."
    action={{
      label: "Clear Filters",
      onClick: onClearFilters,
      variant: 'outline'
    }}
  />
);

export const ConnectionErrorEmpty = ({ onRetry }: { onRetry: () => void }) => (
  <EmptyState
    icon={Wifi}
    title="Connection Error"
    description="Unable to load your automations. Please check your internet connection and try again."
    action={{
      label: "Try Again",
      onClick: onRetry
    }}
  />
);

export const UnauthorizedEmpty = ({ onLogin }: { onLogin: () => void }) => (
  <EmptyState
    icon={AlertTriangle}
    title="Authentication Required"
    description="Please log in to view and manage your automations."
    action={{
      label: "Log In",
      onClick: onLogin
    }}
  />
);

export const MaintenanceEmpty = () => (
  <EmptyState
    icon={Settings}
    title="Scheduled Maintenance"
    description="We're performing system maintenance. Your automations are still running, but the dashboard is temporarily unavailable."
  />
);

// Inline empty states for smaller sections
export const InlineEmptyState = ({ 
  message, 
  action 
}: { 
  message: string; 
  action?: { label: string; onClick: () => void; } 
}) => (
  <div className="text-center py-8 text-muted-foreground">
    <p className="mb-3">{message}</p>
    {action && (
      <Button variant="outline" size="sm" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);

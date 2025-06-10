
import { FlowCardWithErrorHandling } from "@/components/FlowCardWithErrorHandling";
import { EmptyState } from "@/components/EmptyStates";
import { Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Automation } from "@/shared/types/automation";

interface AutomationsListProps {
  automations: Automation[];
  onToggle: (id: string | number) => void;
  onSettings: (id: string | number) => void;
  onRetry: (id: string | number) => void;
  onReconnect: (id: string | number) => void;
  hasFilters: boolean;
  onClearFilters: () => void;
}

const AutomationsList = ({ 
  automations, 
  onToggle, 
  onSettings, 
  onRetry, 
  onReconnect,
  hasFilters,
  onClearFilters
}: AutomationsListProps) => {
  const navigate = useNavigate();

  if (automations.length === 0) {
    return (
      <EmptyState
        icon={Workflow}
        title={hasFilters ? "No automations found" : "No automations yet"}
        description={
          hasFilters 
            ? "Try adjusting your search or filters"
            : "Create your first automation to get started with workflow automation"
        }
        actionLabel={hasFilters ? "Clear Filters" : "Create New Flow"}
        onAction={hasFilters ? onClearFilters : () => navigate('/create-flow')}
      />
    );
  }

  return (
    <div className="space-y-4">
      {automations.map((automation) => {
        // Transform automation to match FlowCardWithErrorHandling expected format
        const transformedFlow = {
          ...automation,
          id: typeof automation.id === 'string' ? parseInt(automation.id) || automation.id : automation.id,
          createdAt: automation.createdAt,
          error: automation.error ? {
            type: automation.error.type,
            message: automation.error.message,
            actionRequired: automation.error.actionRequired
          } : undefined
        };

        return (
          <FlowCardWithErrorHandling
            key={automation.id}
            flow={transformedFlow}
            onToggle={onToggle}
            onSettings={onSettings}
            onRetry={onRetry}
            onReconnect={onReconnect}
          />
        );
      })}
    </div>
  );
};

export default AutomationsList;

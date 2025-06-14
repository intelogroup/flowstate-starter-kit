
import { Flow } from "@/shared/services/supabaseFlowService";
import { FlowCard } from "@/components/FlowCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Workflow, AlertCircle } from "lucide-react";

interface FlowsListProps {
  flows: Flow[];
  onFlowClick: (flowId: string) => void;
  onEditFlow: (flowId: string, flowName: string) => void;
  onDeleteFlow: (flowId: string, flowName: string) => void;
  onDuplicateFlow: (flowId: string, flowName: string) => void;
  onToggleStatus: (flowId: string) => void;
  isLoading?: boolean;
  error?: Error | null;
}

const FlowsList = ({
  flows,
  onFlowClick,
  onEditFlow,
  onDeleteFlow,
  onDuplicateFlow,
  onToggleStatus,
  isLoading = false,
  error = null
}: FlowsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <LoadingSkeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <div>
              <h3 className="font-medium">Error loading flows</h3>
              <p className="text-sm mt-1">{error.message}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (flows.length === 0) {
    return (
      <EmptyState
        icon={Workflow}
        title="No flows found"
        description="Create your first automation flow to get started"
        actionLabel="Create Flow"
        onAction={() => console.log('Create new flow')}
      />
    );
  }

  return (
    <div className="space-y-4">
      {flows.map((flow) => (
        <FlowCard
          key={flow.id}
          flow={{
            id: flow.id,
            name: flow.name,
            description: flow.description,
            status: flow.status,
            lastRun: flow.last_run || 'Never',
            totalRuns: flow.total_runs,
            successRate: flow.success_rate
          }}
          onFlowClick={onFlowClick}
          onEditFlow={onEditFlow}
          onDeleteFlow={onDeleteFlow}
          onDuplicateFlow={onDuplicateFlow}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default FlowsList;


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Settings, MoreHorizontal, Workflow, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FlowStatusIndicator from "./FlowStatusIndicator";
import { Flow } from "@/types/flow";

interface FlowCardProps {
  flow: Flow;
  status: string;
  isLoading: boolean;
  isActivationModalOpen: boolean;
  onRunFlow: (flowId: number, flowName: string) => void;
  onToggleFlow: (flowId: number, currentStatus: string, flowName: string) => void;
}

const FlowCard = ({ 
  flow, 
  status, 
  isLoading, 
  isActivationModalOpen,
  onRunFlow, 
  onToggleFlow 
}: FlowCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/flow/${flow.id}`)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Workflow className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                <FlowStatusIndicator 
                  status={status} 
                  isLoading={isLoading}
                />
              </div>
              <p className="text-muted-foreground mb-3">{flow.description}</p>
              
              {/* Flow Chain */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-xs font-medium">
                  {flow.trigger}
                </Badge>
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <div className="flex items-center gap-1">
                  {flow.actions.map((action, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRunFlow(flow.id, flow.name)}
              disabled={isLoading || isActivationModalOpen}
            >
              <Play className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onToggleFlow(flow.id, status, flow.name)}
              disabled={isLoading || isActivationModalOpen}
            >
              {status === 'active' ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button variant="outline" size="sm" disabled={isActivationModalOpen}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={isActivationModalOpen}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Last Run</span>
            <div className="font-medium text-foreground">{flow.lastRun}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Runs Today</span>
            <div className="font-medium text-foreground">{flow.runsToday}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Total Runs</span>
            <div className="font-medium text-foreground">{flow.totalRuns}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Success Rate</span>
            <div className="font-medium text-foreground">{flow.successRate}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Created</span>
            <div className="font-medium text-foreground">{flow.createdAt}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowCard;

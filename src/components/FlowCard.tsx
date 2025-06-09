
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Settings, MoreHorizontal, Workflow, ArrowRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SmartFlowStatusIndicator from "./SmartFlowStatusIndicator";
import { Flow } from "@/types/flow";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface FlowCardProps {
  flow: Flow;
  onRunFlow: (flowId: number, flowName: string) => void;
  onToggleFlow: (flowId: number, currentStatus: boolean, flowName: string) => void;
  onSettingsClick?: () => void;
  onResolveIssue?: (flowId: number) => void;
  isSelected?: boolean;
  onSelect?: (selected: boolean) => void;
  disabled?: boolean;
}

const FlowCard = ({ 
  flow, 
  onRunFlow, 
  onToggleFlow,
  onSettingsClick,
  onResolveIssue,
  isSelected = false,
  onSelect,
  disabled = false
}: FlowCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isSelected && !onSelect && !disabled) {
      navigate(`/flow/${flow.id}`);
    }
  };

  const handleSelectionChange = (checked: boolean) => {
    if (onSelect) {
      onSelect(checked);
    }
  };

  const getCardClassName = () => {
    let baseClass = "hover:shadow-md transition-all cursor-pointer";
    
    if (isSelected) {
      baseClass += " ring-2 ring-primary bg-accent/50";
    }
    
    if (!flow.isActive) {
      baseClass += " opacity-60";
    }
    
    if (flow.lastRunStatus === 'FAILURE') {
      baseClass += " border-red-200 dark:border-red-800";
    }
    
    if (flow.lastRunStatus === 'AWAITING_USER_INPUT') {
      baseClass += " border-amber-200 dark:border-amber-800";
    }
    
    return baseClass;
  };

  const getActionButton = () => {
    if (flow.lastRunStatus === 'AWAITING_USER_INPUT') {
      return (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onResolveIssue?.(flow.id)}
          disabled={disabled}
          className="border-amber-500 text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950"
        >
          <AlertTriangle className="w-4 h-4 mr-1" />
          Resolve Issue
        </Button>
      );
    }

    return (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onRunFlow(flow.id, flow.name)}
        disabled={disabled || flow.lastRunStatus === 'PENDING' || !flow.isActive}
      >
        <Play className="w-4 h-4" />
        {flow.lastRunStatus === 'PENDING' ? 'Running...' : 'Run Now'}
      </Button>
    );
  };

  return (
    <Card 
      className={getCardClassName()} 
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            {onSelect && (
              <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={handleSelectionChange}
                  disabled={disabled}
                />
              </div>
            )}
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Workflow className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={flow.isActive}
                    onCheckedChange={(checked) => onToggleFlow(flow.id, checked, flow.name)}
                    disabled={disabled}
                    size="sm"
                  />
                  <span className="text-xs text-muted-foreground">
                    {flow.isActive ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground mb-3">{flow.description}</p>
              
              {/* Status Indicator */}
              <SmartFlowStatusIndicator 
                lastRunStatus={flow.lastRunStatus}
                lastRunTimestamp={flow.lastRunTimestamp}
                isActive={flow.isActive}
              />
              
              {/* Flow Chain */}
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="text-xs font-medium">
                  {flow.trigger}
                </Badge>
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <div className="flex items-center gap-1 flex-wrap">
                  {flow.actions.slice(0, 3).map((action, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                  {flow.actions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{flow.actions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {getActionButton()}
            <Button 
              variant="outline" 
              size="sm" 
              disabled={disabled}
              onClick={onSettingsClick}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={disabled}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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

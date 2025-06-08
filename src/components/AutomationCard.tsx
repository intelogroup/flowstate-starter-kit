
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Settings, MoreHorizontal, Activity, Copy, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FlowStatusIndicator from "./FlowStatusIndicator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Automation {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  executions: number;
  successRate: string;
  createdAt: string;
  trigger: string;
  errorMessage?: string;
}

interface AutomationCardProps {
  automation: Automation;
  isLoading: boolean;
  isActivationModalOpen: boolean;
  onToggleAutomation: (automationId: number, currentStatus: string, automationName: string) => void;
  onRunAutomation: (automationId: number) => void;
  onViewError: (automation: Automation) => void;
  onDeleteAutomation: (automationId: number) => void;
  onDuplicateAutomation: (automationId: number) => void;
}

const AutomationCard = ({
  automation,
  isLoading,
  isActivationModalOpen,
  onToggleAutomation,
  onRunAutomation,
  onViewError,
  onDeleteAutomation,
  onDuplicateAutomation,
}: AutomationCardProps) => {
  const getSuccessRateColor = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate >= 95) return "text-green-600";
    if (numRate >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{automation.name}</h3>
                <FlowStatusIndicator 
                  status={automation.status} 
                  isLoading={isLoading}
                />
                <Badge variant="outline" className="text-xs">
                  {automation.trigger}
                </Badge>
                {automation.status === 'error' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => onViewError(automation)}
                  >
                    View Error
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground mb-4">{automation.description}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRunAutomation(automation.id)}
              disabled={isLoading || isActivationModalOpen}
            >
              <Play className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onToggleAutomation(automation.id, automation.status, automation.name)}
              disabled={isLoading || isActivationModalOpen}
            >
              {automation.status === 'active' ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button variant="outline" size="sm" disabled={isActivationModalOpen}>
              <Settings className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isActivationModalOpen}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onDuplicateAutomation(automation.id)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Activity className="w-4 h-4 mr-2" />
                  View Logs
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDeleteAutomation(automation.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Last Run</span>
            <div className="font-medium text-foreground">{automation.lastRun}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Executions</span>
            <div className="font-medium text-foreground">{automation.executions}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Success Rate</span>
            <div className={`font-medium ${getSuccessRateColor(automation.successRate)}`}>
              {automation.successRate}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Created</span>
            <div className="font-medium text-foreground">{automation.createdAt}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Status</span>
            <div className="font-medium text-foreground capitalize">{automation.status}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationCard;

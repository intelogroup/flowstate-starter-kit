
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  MoreHorizontal,
  Edit,
  Trash2,
  Copy
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Flow {
  id: number;
  name: string;
  description: string;
  status: string;
  lastRun: string;
  totalRuns: number;
  successRate: number;
}

interface FlowCardProps {
  flow: Flow;
  onFlowClick: (flowId: number) => void;
  onEditFlow: (flowId: number, flowName: string) => void;
  onDeleteFlow: (flowId: number, flowName: string) => void;
  onDuplicateFlow: (flowId: number, flowName: string) => void;
  onToggleStatus: (flowId: number) => void;
}

const FlowCard = ({ 
  flow, 
  onFlowClick, 
  onEditFlow, 
  onDeleteFlow, 
  onDuplicateFlow,
  onToggleStatus 
}: FlowCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'error': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1" onClick={() => onFlowClick(flow.id)}>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center relative">
              <Play className="w-6 h-6 text-primary" />
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(flow.status)}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                <Badge variant={getStatusBadge(flow.status) as any}>
                  {flow.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-3">{flow.description}</p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <span>Last run: {flow.lastRun}</span>
                <span>Total runs: {flow.totalRuns}</span>
                <span>Success rate: {flow.successRate}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus(flow.id);
              }}
            >
              {flow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditFlow(flow.id, flow.name)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicateFlow(flow.id, flow.name)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDeleteFlow(flow.id, flow.name)} 
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowCard;

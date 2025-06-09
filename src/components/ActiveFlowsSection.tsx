
import { useState } from "react";
import { Plus, Workflow, ArrowRight, Badge as BadgeIcon, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { showFlowToasts } from "./TransitionalToasts";
import { FlowExecutingScreen } from "./TransitionalScreens";

interface ActiveFlowsSectionProps {
  onCreateFlow: () => void;
}

const ActiveFlowsSection = ({ onCreateFlow }: ActiveFlowsSectionProps) => {
  const [loadingFlows, setLoadingFlows] = useState<Set<number>>(new Set());
  const [flowStatuses, setFlowStatuses] = useState<Record<number, 'active' | 'paused' | 'error'>>({
    1: 'active',
    2: 'active', 
    3: 'error'
  });

  const activeFlows = [
    {
      id: 1,
      name: "Email Invoice Processing",
      description: "Automatically process invoices from email",
      trigger: "Gmail",
      actions: ["Google Drive", "Google Sheets"],
      lastRun: "2 min ago",
      runsToday: 12
    },
    {
      id: 2,
      name: "Customer Support Flow",
      description: "Route support emails to Slack",
      trigger: "Gmail",
      actions: ["Slack", "Notion"],
      lastRun: "15 min ago",
      runsToday: 8
    },
    {
      id: 3,
      name: "Lead Qualification",
      description: "Qualify leads from contact forms",
      trigger: "Webhook",
      actions: ["CRM", "Email"],
      lastRun: "2 hours ago",
      runsToday: 0
    }
  ];

  const handleToggleFlow = (flowId: number, flowName: string) => {
    setLoadingFlows(prev => new Set(prev).add(flowId));
    
    const currentStatus = flowStatuses[flowId];
    
    setTimeout(() => {
      if (flowId === 1) {
        const newStatus = currentStatus === 'active' ? 'paused' : 'active';
        setFlowStatuses(prev => ({ ...prev, [flowId]: newStatus }));
        
        if (newStatus === 'paused') {
          showFlowToasts.paused(flowName);
        } else {
          showFlowToasts.activated(flowName);
        }
      } else if (flowId === 3) {
        setFlowStatuses(prev => ({ ...prev, [flowId]: 'error' }));
        showFlowToasts.failed(flowName, "Authentication failed - please reconnect your account");
      } else {
        const newStatus = currentStatus === 'active' ? 'paused' : 'active';
        setFlowStatuses(prev => ({ ...prev, [flowId]: newStatus }));
        
        if (newStatus === 'paused') {
          showFlowToasts.paused(flowName);
        } else {
          showFlowToasts.activated(flowName);
        }
      }
      
      setLoadingFlows(prev => {
        const newSet = new Set(prev);
        newSet.delete(flowId);
        return newSet;
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Active Flows</h2>
          <p className="text-sm text-muted-foreground">Your running automation workflows</p>
        </div>
        <Button onClick={onCreateFlow}>
          <Plus className="w-4 h-4 mr-2" />
          Create Flow
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeFlows.slice(0, 4).map((flow) => {
          const isLoading = loadingFlows.has(flow.id);
          const status = flowStatuses[flow.id];
          
          return (
            <Card key={flow.id} className={`hover:shadow-md transition-shadow cursor-pointer ${
              status === 'error' ? 'border-destructive/50 bg-destructive/5' : ''
            }`}>
              <CardContent className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <FlowExecutingScreen flowName={flow.name} />
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          status === 'active' ? 'bg-green-100 dark:bg-green-900' :
                          status === 'error' ? 'bg-red-100 dark:bg-red-900' :
                          'bg-primary/10'
                        }`}>
                          <Workflow className={`w-5 h-5 ${
                            status === 'active' ? 'text-green-600 dark:text-green-400' :
                            status === 'error' ? 'text-red-600 dark:text-red-400' :
                            'text-primary'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{flow.name}</h3>
                          <p className="text-sm text-muted-foreground">{flow.description}</p>
                          {status === 'error' && (
                            <p className="text-xs text-destructive mt-1">
                              Authentication required - please reconnect
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge variant={
                        status === 'active' ? 'default' :
                        status === 'error' ? 'destructive' :
                        'secondary'
                      } className="text-xs">
                        {status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-muted-foreground">Trigger:</span>
                      <Badge variant="outline" className="text-xs">{flow.trigger}</Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      {flow.actions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{action}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last run: {flow.lastRun}</span>
                      <span>{flow.runsToday} runs today</span>
                      <div className="flex items-center gap-1">
                        {status === 'error' ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-6 px-2 text-xs border-destructive text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              showFlowToasts.connecting("Gmail");
                            }}
                          >
                            Reconnect
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFlow(flow.id, flow.name);
                            }}
                            disabled={isLoading}
                          >
                            {status === 'active' ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveFlowsSection;

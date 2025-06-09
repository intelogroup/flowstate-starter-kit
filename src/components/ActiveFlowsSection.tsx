import { useState, useEffect } from "react";
import { Play, Pause, Settings, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSkeleton from "./LoadingSkeleton";

const ActiveFlowsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const activeFlows = [
    { id: 1, name: "Email Invoice Processing", status: "running", lastRun: "2 min ago", runsToday: 12 },
    { id: 2, name: "Customer Support Flow", status: "running", lastRun: "15 min ago", runsToday: 8 },
    { id: 3, name: "Lead Qualification", status: "error", lastRun: "2 hours ago", runsToday: 0 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Active Flows</h2>
          <p className="text-sm text-muted-foreground">Currently running automations</p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Manage All
        </Button>
      </div>
      
      {isLoading ? (
        <LoadingSkeleton type="flows" count={3} />
      ) : (
        <div className="space-y-3">
          {activeFlows.map((flow) => (
            <Card key={flow.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      flow.status === 'running' ? 'bg-green-500 animate-pulse' : 
                      flow.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">{flow.name}</p>
                      <p className="text-sm text-muted-foreground">Last run: {flow.lastRun}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">
                      {flow.runsToday} runs today
                    </Badge>
                    <Button 
                      size="sm" 
                      variant={flow.status === 'running' ? "outline" : "default"}
                    >
                      {flow.status === 'running' ? (
                        <Pause className="w-3 h-3" />
                      ) : flow.status === 'error' ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : (
                        <Play className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveFlowsSection;

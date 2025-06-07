
import { Card, CardContent } from "@/components/ui/card";
import { Workflow, Play, TrendingUp, AlertTriangle } from "lucide-react";

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Flows</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <Workflow className="w-8 h-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Runs Today</p>
              <p className="text-2xl font-bold text-blue-600">47</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Issues</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;


import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your flows.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Flow
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;

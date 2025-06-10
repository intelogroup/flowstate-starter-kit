
import { Card, CardContent } from "@/components/ui/card";
import { Workflow, CheckCircle, Pause, AlertTriangle } from "lucide-react";
import { AutomationStats as StatsType } from "@/shared/types/automation";

interface AutomationStatsProps {
  stats: StatsType;
}

const AutomationStats = ({ stats }: AutomationStatsProps) => {
  const statItems = [
    {
      icon: Workflow,
      value: stats.total,
      label: "Total Flows",
      color: "blue"
    },
    {
      icon: CheckCircle,
      value: stats.active,
      label: "Active",
      color: "green"
    },
    {
      icon: Pause,
      value: stats.paused,
      label: "Paused",
      color: "yellow"
    },
    {
      icon: AlertTriangle,
      value: stats.error,
      label: "Issues",
      color: "red"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${item.color}-600`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AutomationStats;

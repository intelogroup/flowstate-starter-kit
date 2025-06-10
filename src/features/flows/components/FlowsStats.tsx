
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, Pause, AlertCircle } from "lucide-react";

interface FlowsStatsProps {
  totalFlows: number;
  activeFlows: number;
  pausedFlows: number;
  errorFlows: number;
}

const FlowsStats = ({ totalFlows, activeFlows, pausedFlows, errorFlows }: FlowsStatsProps) => {
  const stats = [
    {
      title: "Total Flows",
      value: totalFlows,
      icon: Activity,
      color: "text-blue-600"
    },
    {
      title: "Active",
      value: activeFlows,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Paused",
      value: pausedFlows,
      icon: Pause,
      color: "text-yellow-600"
    },
    {
      title: "Errors",
      value: errorFlows,
      icon: AlertCircle,
      color: "text-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FlowsStats;

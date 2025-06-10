
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, TrendingUp, Zap } from "lucide-react";
import { DashboardStats } from "../types";

interface QuickStatsProps {
  stats: DashboardStats;
}

const QuickStats = ({ stats }: QuickStatsProps) => {
  const statCards = [
    {
      title: "Total Flows",
      value: stats.totalFlows,
      icon: Activity,
      color: "text-blue-600"
    },
    {
      title: "Active Flows",
      value: stats.activeFlows,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Total Executions",
      value: stats.totalExecutions.toLocaleString(),
      icon: Zap,
      color: "text-purple-600"
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: "text-emerald-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
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

export default QuickStats;

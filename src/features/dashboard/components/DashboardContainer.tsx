
import DashboardHeader from "./DashboardHeader";
import QuickStats from "./QuickStats";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import { useDashboardData } from "../hooks/useDashboardData";

const DashboardContainer = () => {
  const { stats, recentActivity, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />
      <QuickStats stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivity} />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardContainer;

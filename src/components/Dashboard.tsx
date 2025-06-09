
import ActiveFlowsSection from "./ActiveFlowsSection";
import PopularTemplates from "./PopularTemplates";
import RecentActivityCard from "./RecentActivityCard";
import AttentionRequiredCard from "./AttentionRequiredCard";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActiveFlowsSection />
          <PopularTemplates />
        </div>
        
        <div className="space-y-6">
          <AttentionRequiredCard />
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

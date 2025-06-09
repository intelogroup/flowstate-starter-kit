
import { useNavigate } from "react-router-dom";
import FlowsEmptyState from "./FlowsEmptyState";
import DashboardHeader from "./DashboardHeader";
import NotificationBanner from "./NotificationBanner";
import AISearchSection from "./AISearchSection";
import PopularTemplates from "./PopularTemplates";
import ActiveFlowsSection from "./ActiveFlowsSection";
import AttentionRequiredCard from "./AttentionRequiredCard";
import RecentActivityCard from "./RecentActivityCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: number) => {
    navigate(`/create-flow/${templateId}`);
  };

  const handleCreateFlow = () => {
    navigate('/create-flow');
  };

  // Check if user has any flows - for now we'll assume they do
  // In a real app, this would come from an API call
  const hasFlows = true;

  if (!hasFlows) {
    return <FlowsEmptyState onCreateFlow={handleCreateFlow} />;
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <DashboardHeader />
      <NotificationBanner />
      <AISearchSection onTemplateSelect={handleTemplateSelect} />
      <PopularTemplates />
      <ActiveFlowsSection onCreateFlow={handleCreateFlow} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttentionRequiredCard />
        <RecentActivityCard />
      </div>
    </div>
  );
};

export default Dashboard;

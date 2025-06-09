
import RecentActivityCard from "./RecentActivityCard";
import PopularTemplates from "./PopularTemplates";
import ActiveFlowsSection from "./ActiveFlowsSection";
import NotificationBanner from "./NotificationBanner";
import AsyncOperationsShowcase from "./AsyncOperationsShowcase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const [showAsyncDemo, setShowAsyncDemo] = useState(false);

  if (showAsyncDemo) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Async Operations Demo</h2>
          <Button
            variant="outline"
            onClick={() => setShowAsyncDemo(false)}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <AsyncOperationsShowcase />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header with Demo Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your flows.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAsyncDemo(true)}
          className="gap-2"
        >
          <Code className="w-4 h-4" />
          View Async Demo
        </Button>
      </div>

      {/* Notification Banner */}
      <NotificationBanner />

      {/* Popular Templates - Now prominently at the top */}
      <PopularTemplates />

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveFlowsSection />
        <RecentActivityCard />
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import InteractiveQuickStats from "./InteractiveQuickStats";
import EnhancedGlobalSearch from "./EnhancedGlobalSearch";
import RecentActivityCard from "./RecentActivityCard";
import PopularTemplates from "./PopularTemplates";
import ActiveFlowsSection from "./ActiveFlowsSection";
import NotificationBanner from "./NotificationBanner";
import DashboardEmptyState from "./DashboardEmptyState";
import { Button } from "@/components/ui/button";
import { Code, BarChart3, Filter } from "lucide-react";
import AsyncOperationsShowcase from "./AsyncOperationsShowcase";

interface EnhancedDashboardProps {
  onNavigate?: (section: string, filter?: string) => void;
}

const EnhancedDashboard = ({ onNavigate }: EnhancedDashboardProps) => {
  const [showAsyncDemo, setShowAsyncDemo] = useState(false);

  // Mock data - in real app this would come from Supabase
  // For demo purposes, set to empty array to show empty state
  const userFlows: any[] = [];
  const hasFlows = userFlows.length > 0;

  const handleMetricClick = (metricId: string) => {
    console.log(`Navigating to analytics with filter: ${metricId}`);
    // Navigate to analytics with specific filter
    switch (metricId) {
      case 'total-flows':
        onNavigate?.('analytics', 'all-flows');
        break;
      case 'active-flows':
        onNavigate?.('analytics', 'active-flows');
        break;
      case 'runs-today':
        onNavigate?.('analytics', 'execution-metrics');
        break;
      case 'issues':
        onNavigate?.('analytics', 'error-analysis');
        break;
      default:
        onNavigate?.('analytics');
    }
  };

  const handleSearchResult = (result: any) => {
    console.log('Search result clicked:', result);
    // Navigate based on result type
    if (result.type === 'flow') {
      onNavigate?.('flows');
    } else if (result.type === 'template') {
      onNavigate?.('templates');
    } else if (result.type === 'automation') {
      onNavigate?.('automations');
    }
  };

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

  // Show empty state if user has no flows
  if (!hasFlows) {
    return <DashboardEmptyState />;
  }

  // Show full dashboard for users with flows
  return (
    <div className="p-6 space-y-8 bg-background">
      {/* Enhanced Header with Global Search */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Welcome back! Here's what's happening with your automations.
            </p>
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

        {/* Global Search */}
        <div className="flex items-center justify-center">
          <EnhancedGlobalSearch
            onResultClick={handleSearchResult}
            placeholder="Search flows, templates, automations..."
          />
        </div>
      </div>

      {/* Notification Banner */}
      <NotificationBanner />

      {/* Interactive Quick Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Quick Overview</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate?.('analytics')}
            className="gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </Button>
        </div>
        <InteractiveQuickStats onMetricClick={handleMetricClick} />
      </div>

      {/* Popular Templates - Prominently positioned */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Get Started Quickly</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate?.('templates')}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Browse All Templates
          </Button>
        </div>
        <PopularTemplates />
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Active Flows</h3>
          <ActiveFlowsSection />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Recent Activity</h3>
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;

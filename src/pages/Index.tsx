import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import TemplateLibrary from "@/components/TemplateLibrary";
import MyAutomations from "@/components/MyAutomations";
import MyFlows from "@/components/MyFlows";
import Analytics from "@/components/Analytics";
import Notifications from "@/components/Notifications";
import HelpSupport from "@/components/HelpSupport";
import Settings from "@/components/Settings";
import Documentation from "@/components/Documentation";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { UserProfile } from "@/components/UserProfile";
import { PageLoading } from "@/components/LoadingStates";
import { supabaseAuthService } from "@/shared/services/supabaseAuthService";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [analyticsFilter, setAnalyticsFilter] = useState<string | undefined>();
  const navigate = useNavigate();

  // Handle section transitions with loading states
  const handleSectionChange = (newSection: string, filter?: string) => {
    if (newSection !== activeSection) {
      setIsTransitioning(true);
      
      // Set analytics filter if provided
      if (newSection === 'analytics' && filter) {
        setAnalyticsFilter(filter);
      }
      
      // Simulate navigation loading
      setTimeout(() => {
        setActiveSection(newSection);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleLogout = async () => {
    try {
      await supabaseAuthService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePasswordChange = () => {
    // Navigate to password reset flow
    navigate('/reset-password');
  };

  const renderContent = () => {
    if (isTransitioning) {
      return <PageLoading message="Loading..." />;
    }

    switch (activeSection) {
      case "dashboard":
        return <Dashboard onNavigate={handleSectionChange} />;
      case "templates":
        return <TemplateLibrary />;
      case "automations":
        return <MyAutomations />;
      case "flows":
        return <MyFlows />;
      case "todos":
        return <TodoPage />;
      case "analytics":
        return <Analytics initialFilter={analyticsFilter} />;
      case "notifications":
        return <Notifications />;
      case "documentation":
        return <Documentation />;
      case "privacy":
        return <PrivacyPolicy />;
      case "help":
        return <HelpSupport />;
      case "settings":
        return <Settings />;
      case "profile":
        return (
          <div className="container mx-auto p-6 max-w-4xl">
            <UserProfile
              onLogout={handleLogout}
              onSettingsClick={() => handleSectionChange('settings')}
              onPasswordChange={handlePasswordChange}
            />
          </div>
        );
      default:
        return <Dashboard onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar onSectionChange={handleSectionChange} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;

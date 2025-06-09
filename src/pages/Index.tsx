
import { useState, useEffect } from "react";
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
import { PageLoading } from "@/components/LoadingStates";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle section transitions with loading states
  const handleSectionChange = (newSection: string) => {
    if (newSection !== activeSection) {
      setIsTransitioning(true);
      
      // Simulate navigation loading
      setTimeout(() => {
        setActiveSection(newSection);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const renderContent = () => {
    if (isTransitioning) {
      return <PageLoading message="Loading..." />;
    }

    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "templates":
        return <TemplateLibrary />;
      case "automations":
        return <MyAutomations />;
      case "flows":
        return <MyFlows />;
      case "analytics":
        return <Analytics />;
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
      default:
        return <Dashboard />;
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

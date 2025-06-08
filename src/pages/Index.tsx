
import { useState } from "react";
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

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
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
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar onSectionChange={setActiveSection} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;

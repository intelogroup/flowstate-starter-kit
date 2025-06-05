
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import TemplateLibrary from "@/components/TemplateLibrary";
import MyAutomations from "@/components/MyAutomations";

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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;

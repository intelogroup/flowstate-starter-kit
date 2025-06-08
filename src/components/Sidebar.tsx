
import { LayoutDashboard, Library, Cog, BarChart3, Bell, HelpCircle, Zap, Settings, FileText, Shield } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "templates", label: "Flow Library", icon: Library },
    { id: "automations", label: "My Automations", icon: Cog },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "documentation", label: "Documentation", icon: FileText },
    { id: "privacy", label: "Privacy Policy", icon: Shield },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 h-screen">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">FlowState</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-sidebar-foreground">FlowState</div>
            <div className="text-xs text-sidebar-foreground/60">© 2025</div>
          </div>
          <button
            onClick={() => setActiveSection("settings")}
            className={`p-2 rounded-lg transition-colors ${
              activeSection === "settings"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

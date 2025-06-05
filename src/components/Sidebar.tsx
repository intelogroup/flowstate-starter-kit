
import { LayoutDashboard, Library, Cog, BarChart3, Bell, HelpCircle, Zap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "templates", label: "Template Library", icon: Library },
    { id: "automations", label: "My Automations", icon: Cog },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-white dark:bg-sidebar border-r border-gray-200 dark:border-sidebar-border flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 dark:bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white dark:text-sidebar-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-sidebar-foreground">FlowState</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-sidebar-accent dark:text-sidebar-accent-foreground dark:border-sidebar-border"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-sidebar-foreground dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 dark:bg-sidebar-accent rounded-full"></div>
            <div className="text-sm font-medium text-gray-900 dark:text-sidebar-foreground">John Doe</div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

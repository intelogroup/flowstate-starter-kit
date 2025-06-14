
import { useState } from "react";
import { 
  LayoutDashboard, 
  Workflow, 
  BookOpen, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronDown,
  Info,
  Zap,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  tooltip?: string;
  description?: string;
  children?: NavigationItem[];
}

interface EnhancedNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const EnhancedNavigation = ({ activeSection, onSectionChange }: EnhancedNavigationProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['flows']);

  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      tooltip: "Overview of all your automations and recent activity",
      description: "Main overview and statistics"
    },
    {
      id: "flows",
      label: "Automation Flows",
      icon: Workflow,
      badge: "8",
      tooltip: "Manage your custom automation workflows",
      children: [
        {
          id: "flows",
          label: "My Flows",
          icon: Workflow,
          description: "Your custom automation workflows",
          badge: "8"
        },
        {
          id: "templates",
          label: "Flow Library",
          icon: BookOpen,
          description: "Pre-built templates and community flows",
          tooltip: "Browse and use ready-made automation templates created by the community"
        },
        {
          id: "automations",
          label: "Quick Automations",
          icon: Zap,
          description: "Simple, one-click automation setups"
        }
      ]
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      tooltip: "Performance metrics and usage insights for your flows",
      description: "Performance insights and metrics"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      tooltip: "Configure your account and automation preferences"
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      tooltip: "Documentation, tutorials, and customer support"
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);

    const navigationButton = (
      <Button
        variant={isActive ? "default" : "ghost"}
        className={`w-full justify-start gap-3 h-auto py-3 px-4 ${
          level > 0 ? 'ml-6 py-2' : ''
        } ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
        onClick={() => {
          if (hasChildren) {
            toggleSection(item.id);
          } else {
            onSectionChange(item.id);
          }
        }}
      >
        <Icon className={`w-5 h-5 ${level > 0 ? 'w-4 h-4' : ''}`} />
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${level > 0 ? 'text-sm' : ''}`}>
              {item.label}
            </span>
            {item.badge && (
              <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                {item.badge}
              </Badge>
            )}
          </div>
          {item.description && level === 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {item.description}
            </p>
          )}
        </div>
        {hasChildren && (
          <ChevronDown className={`w-4 h-4 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`} />
        )}
      </Button>
    );

    return (
      <div key={item.id}>
        {item.tooltip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {navigationButton}
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-2">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.tooltip}</p>
                  {item.id === "templates" && (
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <Users className="w-3 h-3" />
                      <span>Community contributed</span>
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          navigationButton
        )}

        {hasChildren && (
          <Collapsible open={isExpanded}>
            <CollapsibleContent className="space-y-1 mt-1">
              {item.children?.map(child => renderNavigationItem(child, level + 1))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    );
  };

  return (
    <nav className="space-y-2">
      {/* Navigation Header */}
      <div className="px-4 py-2 border-b">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Workflow className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">FlowState</h2>
            <p className="text-xs text-muted-foreground">Automation Platform</p>
          </div>
        </div>
      </div>

      {/* Clear Section Distinction */}
      <div className="px-4">
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">New to FlowState?</p>
              <p><strong>My Flows:</strong> Your custom automations</p>
              <p><strong>Flow Library:</strong> Ready-to-use templates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="px-2 space-y-1">
        {navigationItems.map(item => renderNavigationItem(item))}
      </div>
    </nav>
  );
};

export default EnhancedNavigation;

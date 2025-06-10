
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Settings, BarChart3 } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "Create New Flow",
      description: "Start building a new automation",
      icon: Plus,
      action: () => console.log("Create flow"),
    },
    {
      title: "Browse Templates",
      description: "Use pre-built automation templates",
      icon: FileText,
      action: () => console.log("Browse templates"),
    },
    {
      title: "View Analytics",
      description: "Check your automation performance",
      icon: BarChart3,
      action: () => console.log("View analytics"),
    },
    {
      title: "Manage Settings",
      description: "Configure your account preferences",
      icon: Settings,
      action: () => console.log("Manage settings"),
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                className="flex items-start justify-start h-auto p-4 text-left"
                onClick={action.action}
              >
                <Icon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;

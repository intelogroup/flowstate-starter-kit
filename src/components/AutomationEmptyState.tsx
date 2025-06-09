
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Workflow, Zap, ArrowRight, Sparkles, Play, Settings, BarChart3 } from "lucide-react";

interface AutomationEmptyStateProps {
  onCreateAutomation: () => void;
}

const AutomationEmptyState = ({ onCreateAutomation }: AutomationEmptyStateProps) => {
  const quickStartTemplates = [
    {
      icon: <Workflow className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Email to Drive",
      description: "Save Gmail attachments to Google Drive automatically",
      tags: ["Gmail", "Google Drive"],
      difficulty: "Easy",
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      icon: <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: "Slack Alerts",
      description: "Get notified in Slack when important events happen",
      tags: ["Slack", "Notifications"],
      difficulty: "Easy",
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: "Data Sync",
      description: "Keep your databases and spreadsheets in sync",
      tags: ["Database", "Sheets"],
      difficulty: "Medium",
      bgColor: "bg-purple-100 dark:bg-purple-900"
    }
  ];

  const features = [
    {
      icon: <Play className="w-5 h-5 text-primary" />,
      title: "One-Click Execution",
      description: "Run automations manually or on schedule"
    },
    {
      icon: <Settings className="w-5 h-5 text-primary" />,
      title: "Easy Configuration",
      description: "Visual flow builder with no coding required"
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      title: "Real-Time Monitoring",
      description: "Track performance and get instant alerts"
    }
  ];

  return (
    <div className="p-6 space-y-8 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Automations</h1>
          <p className="text-muted-foreground">Manage and monitor your active automations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={onCreateAutomation}>
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Main Empty State */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-2xl">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to automate your workflow?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Connect your favorite apps and let them work together automatically. 
              Save hours every week by putting repetitive tasks on autopilot.
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 h-auto bg-primary hover:bg-primary/90"
              onClick={onCreateAutomation}
            >
              <Plus className="w-5 h-5 mr-3" />
              Create Your First Automation
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
              <Zap className="w-5 h-5 mr-3" />
              Browse Templates
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-4xl">
          <h3 className="text-xl font-semibold text-center mb-6">Everything you need to automate</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  {feature.icon}
                </div>
                <h4 className="font-semibold">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start Templates */}
        <div className="w-full max-w-5xl">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Quick start templates</h3>
            <p className="text-muted-foreground">Get started in minutes with these popular automations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStartTemplates.map((template, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-border/50 group hover:border-primary/20"
                onClick={onCreateAutomation}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${template.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    {template.icon}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{template.title}</h4>
                      <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                        {template.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
                      <span>Use template</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-center">
          <Button variant="ghost" className="text-muted-foreground">
            📖 Getting Started Guide
          </Button>
          <span className="text-muted-foreground">•</span>
          <Button variant="ghost" className="text-muted-foreground">
            🎥 Video Tutorials
          </Button>
          <span className="text-muted-foreground">•</span>
          <Button variant="ghost" className="text-muted-foreground">
            💬 Get Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutomationEmptyState;

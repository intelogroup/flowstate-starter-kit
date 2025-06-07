
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Workflow, Zap, ArrowRight } from "lucide-react";

interface AutomationEmptyStateProps {
  onCreateAutomation: () => void;
}

const AutomationEmptyState = ({ onCreateAutomation }: AutomationEmptyStateProps) => {
  return (
    <div className="p-6 space-y-6 bg-background">
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

      {/* Empty State */}
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Workflow className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-semibold mb-3">No automations yet</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Get started by creating your first automation. Connect your favorite apps and 
            let them work together automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={onCreateAutomation} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Automation
            </Button>
            <Button variant="outline">
              <Zap className="w-4 h-4 mr-2" />
              Browse Templates
            </Button>
          </div>

          {/* Quick Examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="text-sm font-medium mb-2">Email to Drive</div>
              <div className="text-xs text-muted-foreground mb-3">
                Save Gmail attachments to Google Drive automatically
              </div>
              <div className="flex items-center text-xs text-primary">
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="text-sm font-medium mb-2">Slack Notifications</div>
              <div className="text-xs text-muted-foreground mb-3">
                Get notified in Slack when important emails arrive
              </div>
              <div className="flex items-center text-xs text-primary">
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="text-sm font-medium mb-2">Form to CRM</div>
              <div className="text-xs text-muted-foreground mb-3">
                Add contact form submissions directly to your CRM
              </div>
              <div className="flex items-center text-xs text-primary">
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationEmptyState;

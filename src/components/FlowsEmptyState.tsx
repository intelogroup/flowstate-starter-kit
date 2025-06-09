
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Workflow, Zap, ArrowRight, Sparkles } from "lucide-react";

interface FlowsEmptyStateProps {
  onCreateFlow: () => void;
}

const FlowsEmptyState = ({ onCreateFlow }: FlowsEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Welcome to Flowstate!</h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Start automating your workflows and save hours every week. Connect your favorite apps and let them work together seamlessly.
        </p>
      </div>

      {/* Primary CTA */}
      <Button 
        size="lg" 
        className="mb-8 text-lg px-8 py-4 h-auto bg-primary hover:bg-primary/90"
        onClick={onCreateFlow}
      >
        <Plus className="w-5 h-5 mr-3" />
        Create Your First Flow
      </Button>

      {/* Quick Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border border-border/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Workflow className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Email to Drive</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Automatically save Gmail attachments to Google Drive
            </p>
            <div className="flex items-center justify-center text-xs text-primary">
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer border border-border/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">Slack Notifications</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get notified in Slack when important emails arrive
            </p>
            <div className="flex items-center justify-center text-xs text-primary">
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer border border-border/50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Workflow className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Form to CRM</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add contact form submissions directly to your CRM
            </p>
            <div className="flex items-center justify-center text-xs text-primary">
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-4 mt-8">
        <Button variant="outline">
          <Zap className="w-4 h-4 mr-2" />
          Browse Templates
        </Button>
        <Button variant="ghost">
          View Documentation
        </Button>
      </div>
    </div>
  );
};

export default FlowsEmptyState;

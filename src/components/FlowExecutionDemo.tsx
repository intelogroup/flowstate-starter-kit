
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedFlowExecutingScreen } from "./EnhancedTransitionalScreens";
import DestructiveConfirmationModal from "./DestructiveConfirmationModal";

const FlowExecutionDemo = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const startExecution = () => {
    setIsExecuting(true);
    // Auto-stop after 12 seconds for demo
    setTimeout(() => {
      setIsExecuting(false);
    }, 12000);
  };

  if (isExecuting) {
    return (
      <EnhancedFlowExecutingScreen
        flowName="Gmail to Google Drive Automation"
        autoProgress={true}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Transitional Screens Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Flow Execution with Multi-Step Progress</h3>
            <p className="text-sm text-muted-foreground">
              Experience the enhanced flow execution screen with realistic step-by-step progress updates.
            </p>
            <Button onClick={startExecution} className="w-full">
              Run Gmail to Drive Flow
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">High-Friction Confirmation Modals</h3>
            <p className="text-sm text-muted-foreground">
              Test the destructive action confirmations that require typing the exact name.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteModal(true)}
                className="flex-1"
              >
                Delete Flow (High-Friction)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDisconnectModal(true)}
                className="flex-1"
              >
                Disconnect Google
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DestructiveConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={() => {
          console.log("Flow deleted");
          setShowDeleteModal(false);
        }}
        type="delete-flow"
        itemName="Gmail to Google Drive Automation"
        requireNameConfirmation={true}
      />

      <DestructiveConfirmationModal
        open={showDisconnectModal}
        onOpenChange={setShowDisconnectModal}
        onConfirm={() => {
          console.log("Google disconnected");
          setShowDisconnectModal(false);
        }}
        type="disconnect-service"
        itemName="Google Account"
        serviceName="Google"
        requireNameConfirmation={false}
      />
    </div>
  );
};

export default FlowExecutionDemo;

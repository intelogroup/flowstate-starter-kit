
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2, Unplug, XCircle } from "lucide-react";

interface DestructiveConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  type: 'delete-flow' | 'disconnect-service' | 'delete-automation' | 'reset-data';
  itemName: string;
  serviceName?: string;
  consequences?: string[];
  requireNameConfirmation?: boolean;
}

const DestructiveConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
  type,
  itemName,
  serviceName,
  consequences = [],
  requireNameConfirmation = true
}: DestructiveConfirmationModalProps) => {
  const [confirmationText, setConfirmationText] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleTextChange = (value: string) => {
    setConfirmationText(value);
    setIsValid(value === itemName);
  };

  const handleConfirm = () => {
    if (!requireNameConfirmation || isValid) {
      onConfirm();
      setConfirmationText("");
      setIsValid(false);
    }
  };

  const getModalConfig = () => {
    switch (type) {
      case 'delete-flow':
        return {
          icon: <Trash2 className="w-6 h-6 text-destructive" />,
          title: "Delete Flow",
          description: `Are you sure you want to permanently delete "${itemName}"? This action cannot be undone.`,
          confirmText: "Delete Flow",
          warningText: "⚠️ This is a permanent action that cannot be reversed",
          defaultConsequences: [
            "The flow will be permanently deleted from your account",
            "All execution history and logs will be lost forever",
            "Any scheduled runs will be immediately cancelled",
            "Connected automations will stop working",
            "You will need to recreate this flow from scratch"
          ]
        };
      case 'disconnect-service':
        return {
          icon: <Unplug className="w-6 h-6 text-destructive" />,
          title: `Disconnect ${serviceName}`,
          description: `Disconnecting your ${serviceName} account will immediately impact your active automations.`,
          confirmText: "Yes, Disconnect",
          warningText: "⚠️ This will immediately affect all your connected flows",
          defaultConsequences: [
            `All flows using ${serviceName} will be immediately paused`,
            "Active automations will stop running right away",
            "You will need to re-authorize the connection to reactivate flows",
            "Any scheduled runs will fail until reconnection",
            "Data sync between services will be interrupted"
          ]
        };
      case 'delete-automation':
        return {
          icon: <XCircle className="w-6 h-6 text-destructive" />,
          title: "Delete Automation",
          description: `Are you sure you want to permanently delete "${itemName}"?`,
          confirmText: "Delete Automation",
          warningText: "⚠️ This automation and all its data will be lost",
          defaultConsequences: [
            "The automation will be permanently deleted",
            "All associated execution data will be lost",
            "Scheduled runs will be cancelled immediately",
            "Connected workflows will be broken",
            "This action cannot be undone"
          ]
        };
      case 'reset-data':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
          title: "Reset All Data",
          description: "This will permanently delete all your flows, automations, and settings. Your account will be reset to its initial state.",
          confirmText: "Reset Everything",
          warningText: "🚨 CRITICAL: This will destroy all your work",
          defaultConsequences: [
            "ALL flows and automations will be permanently deleted",
            "ALL service connections will be removed",
            "ALL execution history and logs will be erased",
            "ALL custom settings will be reset to defaults",
            "Your account will return to a blank state",
            "This action is IRREVERSIBLE"
          ]
        };
      default:
        return {
          icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
          title: "Confirm Action",
          description: `Are you sure you want to delete "${itemName}"?`,
          confirmText: "Confirm",
          warningText: "⚠️ This action cannot be undone",
          defaultConsequences: []
        };
    }
  };

  const config = getModalConfig();
  const allConsequences = consequences.length > 0 ? consequences : config.defaultConsequences;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {config.icon}
            <AlertDialogTitle className="text-lg">{config.title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left text-base">
            {config.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Warning Banner */}
          <div className="bg-destructive/10 border-2 border-destructive/30 rounded-md p-3">
            <p className="text-sm font-semibold text-destructive text-center">
              {config.warningText}
            </p>
          </div>

          {/* Consequences List */}
          {allConsequences.length > 0 && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-md p-4">
              <h4 className="text-sm font-semibold text-destructive mb-3">What will happen:</h4>
              <ul className="space-y-2">
                {allConsequences.map((consequence, index) => (
                  <li key={index} className="text-sm text-destructive flex items-start gap-2">
                    <span className="text-destructive mt-0.5 font-bold">•</span>
                    <span className="font-medium">{consequence}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* High-friction confirmation */}
          {requireNameConfirmation && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-md border">
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground mb-2">
                  To confirm this action, type the exact name below:
                </p>
                <div className="font-mono text-sm bg-background border rounded px-2 py-1 text-center">
                  {itemName}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmation" className="text-sm font-medium">
                  Confirmation text:
                </Label>
                <Input
                  id="confirmation"
                  value={confirmationText}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder={`Type "${itemName}" exactly as shown above`}
                  className={`${confirmationText && !isValid ? "border-destructive bg-destructive/5" : ""} text-center font-mono`}
                  autoComplete="off"
                />
                {confirmationText && !isValid && (
                  <p className="text-xs text-destructive font-medium text-center">
                    ❌ Text doesn't match. Please type "{itemName}" exactly as shown.
                  </p>
                )}
                {isValid && (
                  <p className="text-xs text-green-600 font-medium text-center">
                    ✅ Confirmation text matches.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel 
            onClick={() => {
              setConfirmationText("");
              setIsValid(false);
            }}
            className="flex-1"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={requireNameConfirmation && !isValid}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed flex-1 font-semibold"
          >
            {config.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DestructiveConfirmationModal;

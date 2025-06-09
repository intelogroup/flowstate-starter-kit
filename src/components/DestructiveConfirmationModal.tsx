
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
          description: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
          confirmText: "Delete Flow",
          defaultConsequences: [
            "The flow will be permanently deleted",
            "All execution history will be lost",
            "Any scheduled runs will be cancelled"
          ]
        };
      case 'disconnect-service':
        return {
          icon: <Unplug className="w-6 h-6 text-destructive" />,
          title: `Disconnect ${serviceName}`,
          description: `Are you sure you want to disconnect your ${serviceName} account?`,
          confirmText: "Disconnect",
          defaultConsequences: [
            "All flows using this service will be paused",
            "You will need to re-authorize the connection",
            "Any active automations will stop running"
          ]
        };
      case 'delete-automation':
        return {
          icon: <XCircle className="w-6 h-6 text-destructive" />,
          title: "Delete Automation",
          description: `Are you sure you want to delete "${itemName}"?`,
          confirmText: "Delete Automation",
          defaultConsequences: [
            "The automation will be permanently deleted",
            "All associated data will be lost",
            "This action cannot be undone"
          ]
        };
      case 'reset-data':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
          title: "Reset All Data",
          description: "This will permanently delete all your flows, automations, and settings.",
          confirmText: "Reset Everything",
          defaultConsequences: [
            "All flows and automations will be deleted",
            "All service connections will be removed",
            "All execution history will be lost",
            "This action cannot be undone"
          ]
        };
      default:
        return {
          icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
          title: "Confirm Action",
          description: `Are you sure you want to delete "${itemName}"?`,
          confirmText: "Confirm",
          defaultConsequences: []
        };
    }
  };

  const config = getModalConfig();
  const allConsequences = consequences.length > 0 ? consequences : config.defaultConsequences;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {config.icon}
            <AlertDialogTitle>{config.title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left">
            {config.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          {allConsequences.length > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
              <h4 className="text-sm font-semibold text-destructive mb-2">Consequences:</h4>
              <ul className="space-y-1">
                {allConsequences.map((consequence, index) => (
                  <li key={index} className="text-sm text-destructive flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    {consequence}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requireNameConfirmation && (
            <div className="space-y-2">
              <Label htmlFor="confirmation" className="text-sm font-medium">
                Type <span className="font-mono bg-muted px-1 rounded">{itemName}</span> to confirm:
              </Label>
              <Input
                id="confirmation"
                value={confirmationText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={`Type "${itemName}" here`}
                className={confirmationText && !isValid ? "border-destructive" : ""}
              />
              {confirmationText && !isValid && (
                <p className="text-sm text-destructive">
                  Text doesn't match. Please type "{itemName}" exactly.
                </p>
              )}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
            setConfirmationText("");
            setIsValid(false);
          }}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={requireNameConfirmation && !isValid}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {config.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DestructiveConfirmationModal;

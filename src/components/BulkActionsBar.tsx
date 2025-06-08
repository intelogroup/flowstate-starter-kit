
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Play, Pause, Archive, X } from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkAction: (action: string) => void;
  disabled?: boolean;
}

const BulkActionsBar = ({ 
  selectedCount, 
  onClearSelection, 
  onBulkAction, 
  disabled = false 
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{selectedCount} selected</Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('activate')}
            disabled={disabled}
          >
            <Play className="w-4 h-4 mr-2" />
            Activate
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('pause')}
            disabled={disabled}
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('archive')}
            disabled={disabled}
          >
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onBulkAction('delete')}
            disabled={disabled}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;

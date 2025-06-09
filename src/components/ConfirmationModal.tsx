
import { AlertTriangle, Trash2, Power, PowerOff } from 'lucide-react';
import { ConfirmationModal } from './TransitionalScreens';

interface DestructiveConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName?: string;
  action: 'delete' | 'deactivate' | 'activate' | 'custom';
  isLoading?: boolean;
}

export const DestructiveConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  action,
  isLoading = false
}: DestructiveConfirmationProps) => {
  const getActionText = () => {
    switch (action) {
      case 'delete':
        return 'Delete';
      case 'deactivate':
        return 'Deactivate';
      case 'activate':
        return 'Activate';
      default:
        return 'Confirm';
    }
  };

  const getActionIcon = () => {
    switch (action) {
      case 'delete':
        return <Trash2 className="w-4 h-4" />;
      case 'deactivate':
        return <PowerOff className="w-4 h-4" />;
      case 'activate':
        return <Power className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const enhancedDescription = itemName 
    ? `${description}\n\nItem: ${itemName}`
    : description;

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      description={enhancedDescription}
      confirmText={getActionText()}
      variant={action === 'delete' ? 'destructive' : 'default'}
      isLoading={isLoading}
    />
  );
};

export default ConfirmationModal;

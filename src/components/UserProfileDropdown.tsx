
import { useState } from 'react';
import { User, Settings, LogOut, CreditCard, HelpCircle } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfileDropdownProps {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
    plan: 'free' | 'pro' | 'enterprise';
  };
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onBillingClick?: () => void;
  onHelpClick?: () => void;
  onLogout?: () => void;
}

const UserProfileDropdown = ({
  user = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    plan: 'free'
  },
  onProfileClick,
  onSettingsClick,
  onBillingClick,
  onHelpClick,
  onLogout
}: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'pro': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'enterprise': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleMenuItemClick = (action?: () => void) => {
    setIsOpen(false);
    action?.();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <EnhancedButton 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`User menu for ${user.firstName} ${user.lastName}`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="text-sm">{getInitials(user.firstName, user.lastName)}</AvatarFallback>
          </Avatar>
        </EnhancedButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">
                {user.firstName} {user.lastName}
              </p>
              <Badge 
                variant="secondary" 
                className={`text-xs ${getPlanColor(user.plan)}`}
              >
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onProfileClick)}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <User className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onSettingsClick)}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onBillingClick)}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <CreditCard className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Billing & Plans</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onHelpClick)}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <HelpCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(onLogout)}
          className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import NotificationCenter from "./NotificationCenter";
import UserProfileDropdown from "./UserProfileDropdown";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabaseAuthService } from "@/shared/services/supabaseAuthService";

interface NavbarProps {
  onSectionChange?: (section: string) => void;
}

const Navbar = ({ onSectionChange }: NavbarProps) => {
  const navigate = useNavigate();
  const [user] = useState(supabaseAuthService.getCurrentUser());

  const handleProfileClick = () => {
    onSectionChange?.("profile");
    toast({
      title: "Navigation",
      description: "Switched to Profile page",
    });
  };

  const handleSettingsClick = () => {
    onSectionChange?.("settings");
    toast({
      title: "Navigation",
      description: "Switched to Settings page",
    });
  };

  const handleBillingClick = () => {
    onSectionChange?.("settings");
    toast({
      title: "Navigation",
      description: "Switched to Billing settings",
    });
  };

  const handleHelpClick = () => {
    onSectionChange?.("help");
    toast({
      title: "Navigation",
      description: "Switched to Help & Support",
    });
  };

  const handleLogout = async () => {
    try {
      await supabaseAuthService.logout();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const displayUser = user ? {
    id: user.id,
    firstName: user.user_metadata?.first_name || user.email?.split('@')[0] || 'User',
    lastName: user.user_metadata?.last_name || '',
    email: user.email || '',
    avatarUrl: user.user_metadata?.avatar_url,
    plan: 'free' as const
  } : {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatarUrl: "/placeholder.svg",
    plan: "free" as const
  };

  return (
    <div className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-foreground">FlowState Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <NotificationCenter />
        
        <EnhancedButton 
          variant="ghost" 
          size="sm"
          onClick={() => onSectionChange?.("settings")}
          className="hidden md:flex"
        >
          <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
          Settings
        </EnhancedButton>
        
        <ThemeToggle />
        
        <UserProfileDropdown
          user={displayUser}
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onBillingClick={handleBillingClick}
          onHelpClick={handleHelpClick}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;

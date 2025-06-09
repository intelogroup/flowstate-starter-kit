
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import NotificationCenter from "./NotificationCenter";
import UserProfileDropdown from "./UserProfileDropdown";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NavbarProps {
  onSectionChange?: (section: string) => void;
}

const Navbar = ({ onSectionChange }: NavbarProps) => {
  const [user] = useState({
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatarUrl: "/placeholder.svg",
    plan: "free" as const
  });

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

  const handleLogout = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <div className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
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
          user={user}
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

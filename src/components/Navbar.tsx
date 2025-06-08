
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import NotificationCenter from "./NotificationCenter";
import { User, Settings, LogOut, CreditCard, HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NavbarProps {
  onSectionChange?: (section: string) => void;
}

const Navbar = ({ onSectionChange }: NavbarProps) => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg",
    plan: "Free"
  });

  const handleProfileClick = () => {
    onSectionChange?.("settings");
    toast({
      title: "Navigation",
      description: "Switched to Settings page",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <NotificationCenter />
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onSectionChange?.("settings")}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 hover:bg-accent">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} alt="User Avatar" />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium text-foreground">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.plan} Plan</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile & Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSectionChange?.("settings")} className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing & Plans
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSectionChange?.("help")} className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;

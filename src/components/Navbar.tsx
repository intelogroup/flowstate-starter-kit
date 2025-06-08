
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="h-16 bg-background border-b border-border flex items-center justify-end px-6 ml-64">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-sm text-foreground">John Doe</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

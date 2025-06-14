
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Brand */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">FlowState</span>
            <span className="text-xs text-muted-foreground">
              © 2024 All rights reserved
            </span>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="https://status.flowstate.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              System Status
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

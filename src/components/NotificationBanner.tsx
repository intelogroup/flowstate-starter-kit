
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotificationBanner = () => {
  return (
    <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Zap className="text-white w-4 h-4" />
            </div>
            <span className="text-blue-700 dark:text-blue-300">
              New! You can now request custom templates directly from the dashboard. Check out 'Request Template'!
            </span>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-700 dark:text-blue-300">×</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationBanner;

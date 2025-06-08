
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsErrors = () => {
  const errorCategories = [
    { category: "API Rate Limits", count: 45, percentage: 34 },
    { category: "Authentication", count: 28, percentage: 21 },
    { category: "Network Timeouts", count: 23, percentage: 17 },
    { category: "Data Validation", count: 19, percentage: 14 },
    { category: "Service Unavailable", count: 18, percentage: 14 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Error Categories</CardTitle>
            <CardDescription>Distribution of error types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {errorCategories.map((error, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm font-medium text-foreground">{error.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${error.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{error.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Resolution</CardTitle>
            <CardDescription>Recommended actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  High API Rate Limits
                </div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  Consider implementing exponential backoff or upgrading API plans
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Authentication Issues
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Set up automatic token refresh for connected services
                </div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">
                  Network Timeouts
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  Increase timeout values for external service calls
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsErrors;

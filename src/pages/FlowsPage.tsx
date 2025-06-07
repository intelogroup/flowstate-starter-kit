
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlowsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  // Get flow name from URL params or use default
  const flowName = searchParams.get('name') || 'Your Flow';
  const flowId = searchParams.get('id');

  useEffect(() => {
    // Simulate flow setup process
    const timer = setTimeout(() => {
      // 90% success rate for demo purposes
      const isSuccess = Math.random() > 0.1;
      setStatus(isSuccess ? 'success' : 'error');
      
      // Auto-redirect after 3 seconds
      const redirectTimer = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Setting up your flow...</h2>
              <p className="text-muted-foreground mb-6">
                We're configuring "{flowName}" and connecting your services.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span>Validating configuration</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span>Testing connections</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span>Activating flow</span>
                </div>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Flow created successfully!</h2>
              <p className="text-muted-foreground mb-6">
                "{flowName}" is now active and ready to automate your tasks.
              </p>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>All services connected</span>
                  </div>
                </div>
                <Button onClick={handleRedirect} className="w-full">
                  View My Automations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Redirecting automatically in a few seconds...
                </p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Setup failed</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't set up "{flowName}". This might be due to a connection issue.
              </p>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-left">
                  <div className="text-red-700 dark:text-red-400 font-medium mb-2">Common issues:</div>
                  <ul className="text-red-600 dark:text-red-400 space-y-1">
                    <li>• Authentication expired</li>
                    <li>• Service temporarily unavailable</li>
                    <li>• Network connection issue</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => navigate('/create-flow')} className="flex-1">
                    Try Again
                  </Button>
                  <Button onClick={handleRedirect} className="flex-1">
                    View Automations
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Redirecting automatically in a few seconds...
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FlowsPage;

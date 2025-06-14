import { useState, useEffect } from 'react';
import { supabaseAuthService } from '@/shared/services/supabaseAuthService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Shield, AlertCircle } from 'lucide-react';

export const AuthTestIndicator = () => {
  const [currentUser, setCurrentUser] = useState(supabaseAuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(supabaseAuthService.isAuthenticated());
  const [authHeaders, setAuthHeaders] = useState(supabaseAuthService.getAuthHeaders());

  useEffect(() => {
    console.log('TEST-001: AuthTestIndicator mounted, setting up auth listener');
    
    const { data: { subscription } } = supabaseAuthService.onAuthStateChange((user, session) => {
      console.log('TEST-001: Auth state changed:', { user, session });
      setCurrentUser(user);
      setIsAuthenticated(supabaseAuthService.isAuthenticated());
      setAuthHeaders(supabaseAuthService.getAuthHeaders());
    });

    return () => {
      console.log('TEST-001: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Auth Status (TEST-001)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant={isAuthenticated ? "default" : "secondary"}>
            {isAuthenticated ? "Authenticated" : "Not Authenticated"}
          </Badge>
        </div>
        
        {currentUser ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Current User</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <div>ID: {currentUser.id}</div>
              <div>Email: {currentUser.email}</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">No user logged in</span>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <div>Has Auth Token: {Object.keys(authHeaders).length > 0 ? 'Yes' : 'No'}</div>
        </div>
      </CardContent>
    </Card>
  );
};

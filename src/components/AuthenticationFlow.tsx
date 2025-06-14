
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { PasswordResetForm } from './PasswordResetForm';
import { AuthTestIndicator } from './AuthTestIndicator';
import { supabaseAuthService } from '@/shared/services/supabaseAuthService';

type AuthView = 'login' | 'register' | 'reset-password';

interface AuthenticationFlowProps {
  initialView?: AuthView;
  onAuthSuccess?: (user: any) => void;
  className?: string;
}

export const AuthenticationFlow = ({ 
  initialView = 'login', 
  onAuthSuccess,
  className = "" 
}: AuthenticationFlowProps) => {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to app
    if (supabaseAuthService.isAuthenticated()) {
      navigate('/app');
    }
  }, [navigate]);

  const handleAuthSuccess = (user: any) => {
    console.log('TEST-001: Authentication successful in flow:', user);
    
    if (onAuthSuccess) {
      onAuthSuccess(user);
    } else {
      // Default behavior: redirect to app
      navigate('/app');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 bg-background ${className}`}>
      {currentView === 'login' && (
        <LoginForm
          onSuccess={handleAuthSuccess}
          onForgotPassword={() => setCurrentView('reset-password')}
          onSignUpRedirect={() => setCurrentView('register')}
        />
      )}
      
      {currentView === 'register' && (
        <RegistrationForm
          onSuccess={handleAuthSuccess}
          onLoginRedirect={() => setCurrentView('login')}
        />
      )}
      
      {currentView === 'reset-password' && (
        <PasswordResetForm
          onSuccess={() => setCurrentView('login')}
          onBackToLogin={() => setCurrentView('login')}
        />
      )}
      
      <AuthTestIndicator />
    </div>
  );
};

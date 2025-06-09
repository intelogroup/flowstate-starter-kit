
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { PasswordResetForm } from './PasswordResetForm';

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

  const handleAuthSuccess = (user: any) => {
    console.log('Authentication successful:', user);
    onAuthSuccess?.(user);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 bg-background ${className}`}>
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
    </div>
  );
};

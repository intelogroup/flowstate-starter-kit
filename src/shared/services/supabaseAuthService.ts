
import { supabase } from './supabaseClient';
import { User, Session } from '@supabase/supabase-js';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  firstName?: string;
  lastName?: string;
}

interface PasswordResetRequest {
  email: string;
}

class SupabaseAuthService {
  private currentUser: User | null = null;
  private currentSession: Session | null = null;

  constructor() {
    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      this.currentSession = session;
      this.currentUser = session?.user || null;
    });

    // Initialize current session
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      this.currentSession = session;
      this.currentUser = session?.user || null;
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Login failed - no user returned');
      }

      this.currentUser = data.user;
      this.currentSession = data.session;
      
      console.log('Login successful:', data.user);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            first_name: credentials.firstName,
            last_name: credentials.lastName,
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Signup failed - no user returned');
      }

      console.log('Signup successful:', data.user);
      return data.user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }

      this.currentUser = null;
      this.currentSession = null;
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async resetPassword(request: PasswordResetRequest): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(request.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('Password reset email sent to:', request.email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.currentSession !== null;
  }

  getAuthHeaders(): Record<string, string> {
    if (!this.currentSession?.access_token) {
      return {};
    }

    return {
      'Authorization': `Bearer ${this.currentSession.access_token}`,
    };
  }

  // Subscribe to auth state changes
  onAuthStateChange(callback: (user: User | null, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null, session);
    });
  }
}

export const supabaseAuthService = new SupabaseAuthService();


import { supabase } from './supabaseClient';
import { supabaseAuthService } from './supabaseAuthService';

export interface GoogleCredentials {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  scope: string;
}

export interface GoogleServiceStatus {
  connected: boolean;
  email?: string;
  scopes: string[];
  lastAuth?: string;
  needsReauth: boolean;
}

class GoogleOAuthService {
  private readonly GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.readonly';
  private readonly DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
  
  async initiateGoogleAuth(): Promise<void> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // For MVP, we'll show instructions for manual OAuth setup
      // In production, this would redirect to Google OAuth flow
      console.log('Google OAuth flow would be initiated here');
      
      // Simulate OAuth success for development
      setTimeout(() => {
        this.handleOAuthCallback({
          access_token: 'mock_access_token',
          refresh_token: 'mock_refresh_token',
          expires_at: Date.now() + 3600000, // 1 hour
          scope: `${this.GMAIL_SCOPE} ${this.DRIVE_SCOPE}`
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error initiating Google auth:', error);
      throw error;
    }
  }

  private async handleOAuthCallback(credentials: GoogleCredentials): Promise<void> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Store credentials securely in Supabase
      const { error } = await supabase
        .from('user_service_credentials')
        .upsert({
          user_id: user.id,
          service_name: 'google',
          credentials: credentials,
          scopes: credentials.scope.split(' '),
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw new Error(`Failed to store credentials: ${error.message}`);
      }

      console.log('Google credentials stored successfully');
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      throw error;
    }
  }

  async getServiceStatus(): Promise<GoogleServiceStatus> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        return {
          connected: false,
          scopes: [],
          needsReauth: false
        };
      }

      const { data, error } = await supabase
        .from('user_service_credentials')
        .select('*')
        .eq('user_id', user.id)
        .eq('service_name', 'google')
        .single();

      if (error || !data) {
        return {
          connected: false,
          scopes: [],
          needsReauth: false
        };
      }

      const credentials = data.credentials as GoogleCredentials;
      const isExpired = credentials.expires_at < Date.now();
      const hasRequiredScopes = credentials.scope.includes(this.GMAIL_SCOPE) && 
                               credentials.scope.includes(this.DRIVE_SCOPE);

      return {
        connected: !isExpired && hasRequiredScopes,
        email: 'user@gmail.com', // Would get from Google API
        scopes: credentials.scope.split(' '),
        lastAuth: data.updated_at,
        needsReauth: isExpired || !hasRequiredScopes
      };
    } catch (error) {
      console.error('Error getting service status:', error);
      return {
        connected: false,
        scopes: [],
        needsReauth: false
      };
    }
  }

  async revokeAccess(): Promise<void> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('user_service_credentials')
        .delete()
        .eq('user_id', user.id)
        .eq('service_name', 'google');

      if (error) {
        throw new Error(`Failed to revoke access: ${error.message}`);
      }

      console.log('Google access revoked successfully');
    } catch (error) {
      console.error('Error revoking access:', error);
      throw error;
    }
  }
}

export const googleOAuthService = new GoogleOAuthService();

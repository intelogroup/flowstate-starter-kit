
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  emailVerified: boolean;
  lastLogin: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData extends LoginCredentials {
  name: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

class SecureAuthService {
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];
  private tokenRefreshTimer: NodeJS.Timeout | null = null;
  private readonly TOKEN_STORAGE_KEY = 'auth_tokens';
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    // Check for existing valid session on startup
    const tokens = this.getStoredTokens();
    if (tokens && this.isTokenValid(tokens)) {
      this.setupTokenRefresh(tokens);
      // In a real implementation, verify token with server
      console.log('Valid session found, user authenticated');
    } else {
      this.clearStoredTokens();
    }
  }

  private encryptData(data: string): string {
    // Simple XOR encryption for demo - replace with proper encryption in production
    const key = 'secure-key-should-be-env-var';
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted);
  }

  private decryptData(encryptedData: string): string {
    try {
      const key = 'secure-key-should-be-env-var';
      const data = atob(encryptedData);
      let decrypted = '';
      for (let i = 0; i < data.length; i++) {
        decrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return decrypted;
    } catch {
      return '';
    }
  }

  private storeTokensSecurely(tokens: AuthTokens): void {
    const encryptedTokens = this.encryptData(JSON.stringify(tokens));
    sessionStorage.setItem(this.TOKEN_STORAGE_KEY, encryptedTokens);
  }

  private getStoredTokens(): AuthTokens | null {
    try {
      const encryptedTokens = sessionStorage.getItem(this.TOKEN_STORAGE_KEY);
      if (!encryptedTokens) return null;
      
      const decryptedData = this.decryptData(encryptedTokens);
      return JSON.parse(decryptedData);
    } catch {
      return null;
    }
  }

  private clearStoredTokens(): void {
    sessionStorage.removeItem(this.TOKEN_STORAGE_KEY);
    localStorage.removeItem('auth_token'); // Clear old insecure storage
  }

  private isTokenValid(tokens: AuthTokens): boolean {
    return Date.now() < tokens.expiresAt;
  }

  private setupTokenRefresh(tokens: AuthTokens): void {
    const timeUntilExpiry = tokens.expiresAt - Date.now();
    const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 60 * 1000); // Refresh 5 min before expiry, min 1 min

    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }

    this.tokenRefreshTimer = setTimeout(() => {
      this.refreshTokens(tokens.refreshToken);
    }, refreshTime);
  }

  private async refreshTokens(refreshToken: string): Promise<void> {
    try {
      // In a real implementation, call your auth API
      console.log('Refreshing tokens...');
      
      // Mock token refresh - replace with actual API call
      const newTokens: AuthTokens = {
        accessToken: 'new_access_token_' + Date.now(),
        refreshToken: 'new_refresh_token_' + Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
      };

      this.storeTokensSecurely(newTokens);
      this.setupTokenRefresh(newTokens);
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
    }
  }

  private checkLoginAttempts(email: string): boolean {
    const attemptsKey = `login_attempts_${email}`;
    const attempts = JSON.parse(localStorage.getItem(attemptsKey) || '[]');
    const now = Date.now();
    
    // Remove old attempts (older than lockout duration)
    const recentAttempts = attempts.filter((timestamp: number) => 
      now - timestamp < this.LOCKOUT_DURATION
    );

    if (recentAttempts.length >= this.MAX_LOGIN_ATTEMPTS) {
      return false; // Account locked
    }

    return true;
  }

  private recordFailedLogin(email: string): void {
    const attemptsKey = `login_attempts_${email}`;
    const attempts = JSON.parse(localStorage.getItem(attemptsKey) || '[]');
    attempts.push(Date.now());
    localStorage.setItem(attemptsKey, JSON.stringify(attempts));
  }

  private clearFailedLogins(email: string): void {
    localStorage.removeItem(`login_attempts_${email}`);
  }

  private validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 12) {
      errors.push('Password must be at least 12 characters long');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check for common passwords
    const commonPasswords = [
      'password123', '123456789', 'qwerty123', 'admin123', 'welcome123',
      'password1234', 'letmein123', 'monkey123', '1234567890'
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push('Password is too common, please choose a different one');
    }

    return { isValid: errors.length === 0, errors };
  }

  private sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    const tokens = this.getStoredTokens();
    return this.currentUser !== null && tokens !== null && this.isTokenValid(tokens);
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const sanitizedEmail = this.sanitizeInput(credentials.email.toLowerCase());
    
    // Check for account lockout
    if (!this.checkLoginAttempts(sanitizedEmail)) {
      throw new Error('Account temporarily locked due to too many failed login attempts. Please try again in 15 minutes.');
    }

    // Validate input
    if (!sanitizedEmail || !credentials.password) {
      throw new Error('Email and password are required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      throw new Error('Please enter a valid email address');
    }

    try {
      // Mock login implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate authentication check
      if (sanitizedEmail === 'demo@example.com' && credentials.password === 'SecurePassword123!') {
        const tokens: AuthTokens = {
          accessToken: 'secure_access_token_' + Date.now(),
          refreshToken: 'secure_refresh_token_' + Date.now(),
          expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
        };

        const user: User = {
          id: '1',
          email: sanitizedEmail,
          name: 'Demo User',
          avatar: 'https://via.placeholder.com/40',
          emailVerified: true,
          lastLogin: new Date().toISOString()
        };

        this.currentUser = user;
        this.storeTokensSecurely(tokens);
        this.setupTokenRefresh(tokens);
        this.clearFailedLogins(sanitizedEmail);
        this.notifyListeners();
        
        return user;
      } else {
        this.recordFailedLogin(sanitizedEmail);
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Login failed. Please try again.');
    }
  }

  async signup(data: SignupData): Promise<User> {
    const sanitizedEmail = this.sanitizeInput(data.email.toLowerCase());
    const sanitizedName = this.sanitizeInput(data.name);
    
    // Validate input
    if (!sanitizedEmail || !data.password || !sanitizedName) {
      throw new Error('All fields are required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      throw new Error('Please enter a valid email address');
    }

    // Name validation
    if (sanitizedName.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    // Password validation
    const passwordValidation = this.validatePassword(data.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join('. '));
    }

    try {
      // Mock signup implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const tokens: AuthTokens = {
        accessToken: 'secure_access_token_' + Date.now(),
        refreshToken: 'secure_refresh_token_' + Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
      };

      const user: User = {
        id: Date.now().toString(),
        email: sanitizedEmail,
        name: sanitizedName,
        emailVerified: false,
        lastLogin: new Date().toISOString()
      };

      this.currentUser = user;
      this.storeTokensSecurely(tokens);
      this.setupTokenRefresh(tokens);
      this.notifyListeners();
      
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Signup failed. Please try again.');
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.clearStoredTokens();
    
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
      this.tokenRefreshTimer = null;
    }
    
    this.notifyListeners();
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  getAuthHeaders(): Record<string, string> {
    const tokens = this.getStoredTokens();
    if (tokens && this.isTokenValid(tokens)) {
      return {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json'
      };
    }
    return {};
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentUser));
  }
}

export const secureAuthService = new SecureAuthService();

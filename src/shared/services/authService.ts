
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData extends LoginCredentials {
  name: string;
}

class AuthService {
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    // Mock login implementation
    const user: User = {
      id: '1',
      email: credentials.email,
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40'
    };

    this.currentUser = user;
    this.notifyListeners();
    
    localStorage.setItem('auth_token', 'mock_token');
    return user;
  }

  async signup(data: SignupData): Promise<User> {
    // Mock signup implementation
    const user: User = {
      id: '1',
      email: data.email,
      name: data.name,
    };

    this.currentUser = user;
    this.notifyListeners();
    
    localStorage.setItem('auth_token', 'mock_token');
    return user;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.notifyListeners();
    localStorage.removeItem('auth_token');
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentUser));
  }
}

export const authService = new AuthService();

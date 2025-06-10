
export interface UserSettings {
  id: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  security: SecuritySettings;
  billing: BillingInfo;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  flowUpdates: boolean;
  systemAlerts: boolean;
  weeklyReports: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  ipWhitelist: string[];
  apiKeyExpiry: number;
}

export interface BillingInfo {
  plan: 'free' | 'pro' | 'enterprise';
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  paymentMethod: string;
  usage: UsageMetrics;
}

export interface UsageMetrics {
  flowsUsed: number;
  flowsLimit: number;
  executionsUsed: number;
  executionsLimit: number;
  storageUsed: number;
  storageLimit: number;
}

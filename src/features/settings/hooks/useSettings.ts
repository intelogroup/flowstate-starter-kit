
import { useState, useEffect } from 'react';
import { UserSettings } from '../types';

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load settings from storage or API
    const loadSettings = async () => {
      setIsLoading(true);
      
      // Mock settings data
      setTimeout(() => {
        setSettings({
          id: '1',
          theme: 'system',
          language: 'en',
          timezone: 'UTC',
          notifications: {
            email: true,
            push: false,
            flowUpdates: true,
            systemAlerts: true,
            weeklyReports: false,
          },
          security: {
            twoFactorEnabled: false,
            sessionTimeout: 30,
            ipWhitelist: [],
            apiKeyExpiry: 90,
          },
          billing: {
            plan: 'free',
            billingCycle: 'monthly',
            nextBillingDate: '2024-02-01',
            paymentMethod: 'Not set',
            usage: {
              flowsUsed: 5,
              flowsLimit: 10,
              executionsUsed: 1200,
              executionsLimit: 5000,
              storageUsed: 120,
              storageLimit: 1000,
            },
          },
        });
        setIsLoading(false);
      }, 500);
    };

    loadSettings();
  }, []);

  const updateSettings = async (updates: Partial<UserSettings>) => {
    setIsSaving(true);
    
    // Mock API call
    setTimeout(() => {
      setSettings(current => current ? { ...current, ...updates } : null);
      setIsSaving(false);
    }, 800);
  };

  return {
    settings,
    isLoading,
    isSaving,
    updateSettings,
  };
};

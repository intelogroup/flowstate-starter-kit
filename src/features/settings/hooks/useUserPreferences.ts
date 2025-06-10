
import { useState, useEffect } from 'react';

interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
}

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user preferences
    const loadPreferences = async () => {
      setIsLoading(true);
      
      // Mock data
      setTimeout(() => {
        setPreferences({
          language: 'en',
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          notifications: {
            email: true,
            push: false,
            desktop: true,
          },
        });
        setIsLoading(false);
      }, 300);
    };

    loadPreferences();
  }, []);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (preferences) {
      setPreferences({ ...preferences, ...updates });
    }
  };

  return {
    preferences,
    isLoading,
    updatePreferences,
  };
};

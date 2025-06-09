
import { createContext, useContext, useState, ReactNode } from 'react';

// Translation keys structure for internationalization readiness
interface Translations {
  common: {
    loading: string;
    error: string;
    retry: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    create: string;
    search: string;
    filter: string;
    clear: string;
    next: string;
    previous: string;
    close: string;
  };
  navigation: {
    dashboard: string;
    flows: string;
    templates: string;
    analytics: string;
    settings: string;
  };
  flows: {
    title: string;
    create: string;
    active: string;
    paused: string;
    error: string;
    lastRun: string;
    runsToday: string;
    totalRuns: string;
    successRate: string;
  };
  templates: {
    title: string;
    popular: string;
    category: string;
    useTemplate: string;
  };
  errors: {
    connectionFailed: string;
    authRequired: string;
    invalidInput: string;
    networkError: string;
    unexpectedError: string;
  };
}

// Default English translations
const defaultTranslations: Translations = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    retry: 'Try Again',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
  },
  navigation: {
    dashboard: 'Dashboard',
    flows: 'My Flows',
    templates: 'Templates',
    analytics: 'Analytics',
    settings: 'Settings',
  },
  flows: {
    title: 'My Flows',
    create: 'Create Flow',
    active: 'Active',
    paused: 'Paused',
    error: 'Error',
    lastRun: 'Last run',
    runsToday: 'runs today',
    totalRuns: 'Total runs',
    successRate: 'Success rate',
  },
  templates: {
    title: 'Templates',
    popular: 'Popular Templates',
    category: 'Category',
    useTemplate: 'Use Template',
  },
  errors: {
    connectionFailed: 'Connection failed. Please check your internet connection.',
    authRequired: 'Authentication required. Please log in again.',
    invalidInput: 'Please check your input and try again.',
    networkError: 'Network error. Please try again later.',
    unexpectedError: 'An unexpected error occurred. Please contact support if this persists.',
  },
};

interface I18nContextType {
  locale: string;
  translations: Translations;
  t: (key: string) => string;
  setLocale: (locale: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: string;
}

export const I18nProvider = ({ children, defaultLocale = 'en' }: I18nProviderProps) => {
  const [locale, setLocale] = useState(defaultLocale);
  const [translations] = useState<Translations>(defaultTranslations);

  // Translation function with dot notation support
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key; // Fallback to key if translation not found
  };

  const value: I18nContextType = {
    locale,
    translations,
    t,
    setLocale,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Hook for easier translation access
export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};

export default I18nProvider;


import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  isLoading: boolean;
  activeSection: string;
  isTransitioning: boolean;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
}

interface AppActions {
  setLoading: (loading: boolean) => void;
  setActiveSection: (section: string) => void;
  setTransitioning: (transitioning: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    (set) => ({
      // State
      isLoading: false,
      activeSection: 'dashboard',
      isTransitioning: false,
      sidebarCollapsed: false,
      theme: 'system',

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setActiveSection: (section) => set({ activeSection: section }),
      setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'app-store' }
  )
);

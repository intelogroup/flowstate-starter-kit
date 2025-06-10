
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Automation, AutomationFilters, AutomationStats } from '../types/automation';
import { Status } from '../types/common';

interface AutomationState {
  automations: Automation[];
  filteredAutomations: Automation[];
  filters: AutomationFilters;
  stats: AutomationStats;
  isLoading: boolean;
  error: string | null;
  selectedAutomation: Automation | null;
}

interface AutomationActions {
  setAutomations: (automations: Automation[]) => void;
  updateFilters: (filters: Partial<AutomationFilters>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedAutomation: (automation: Automation | null) => void;
  toggleAutomationStatus: (id: string | number) => void;
  deleteAutomation: (id: string | number) => void;
}

const initialFilters: AutomationFilters = {
  searchTerm: '',
  statusFilter: 'all',
  triggerFilter: 'all',
};

export const useAutomationStore = create<AutomationState & AutomationActions>()(
  devtools(
    (set, get) => ({
      // State
      automations: [],
      filteredAutomations: [],
      filters: initialFilters,
      stats: { total: 0, active: 0, paused: 0, error: 0, successRate: 0 },
      isLoading: false,
      error: null,
      selectedAutomation: null,

      // Actions
      setAutomations: (automations) => {
        const stats = calculateStats(automations);
        const filteredAutomations = filterAutomations(automations, get().filters);
        set({ automations, filteredAutomations, stats });
      },

      updateFilters: (newFilters) => {
        const filters = { ...get().filters, ...newFilters };
        const filteredAutomations = filterAutomations(get().automations, filters);
        set({ filters, filteredAutomations });
      },

      clearFilters: () => {
        const filteredAutomations = get().automations;
        set({ filters: initialFilters, filteredAutomations });
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setSelectedAutomation: (automation) => set({ selectedAutomation: automation }),

      toggleAutomationStatus: (id) => {
        const automations = get().automations.map(automation => {
          if (automation.id === id) {
            const newStatus: Status = automation.status === 'active' ? 'paused' : 'active';
            return { ...automation, status: newStatus };
          }
          return automation;
        });
        const stats = calculateStats(automations);
        const filteredAutomations = filterAutomations(automations, get().filters);
        set({ automations, filteredAutomations, stats });
      },

      deleteAutomation: (id) => {
        const automations = get().automations.filter(automation => automation.id !== id);
        const stats = calculateStats(automations);
        const filteredAutomations = filterAutomations(automations, get().filters);
        set({ automations, filteredAutomations, stats });
      },
    }),
    { name: 'automation-store' }
  )
);

// Helper functions
function calculateStats(automations: Automation[]): AutomationStats {
  const total = automations.length;
  const active = automations.filter(a => a.status === 'active').length;
  const paused = automations.filter(a => a.status === 'paused').length;
  const error = automations.filter(a => a.status === 'error').length;
  const successRate = total > 0 ? automations.reduce((sum, a) => sum + a.successRate, 0) / total : 0;

  return { total, active, paused, error, successRate: Math.round(successRate * 100) / 100 };
}

function filterAutomations(automations: Automation[], filters: AutomationFilters): Automation[] {
  return automations.filter(automation => {
    const matchesSearch = !filters.searchTerm || 
      automation.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      automation.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || automation.status === filters.statusFilter;
    const matchesTrigger = filters.triggerFilter === 'all' || automation.trigger.type === filters.triggerFilter;
    
    return matchesSearch && matchesStatus && matchesTrigger;
  });
}

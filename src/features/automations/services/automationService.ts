
import { Automation, AutomationFilters } from '@/shared/types/automation';

export const automationService = {
  async getAutomations(): Promise<Automation[]> {
    // Mock data for now - will be replaced with actual API calls
    return [
      {
        id: '1',
        name: 'Invoice Processing',
        description: 'Automatically extract data from invoices and save to spreadsheet',
        status: 'active',
        lastRun: '2 hours ago',
        successRate: 98.5,
        totalRuns: 45,
        trigger: { type: 'email', config: {} },
        actions: [{ 
          id: 'action1', 
          type: 'save-to-drive', 
          config: {}, 
          order: 1 
        }],
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Email to Drive',
        description: 'Save email attachments to Google Drive automatically',
        status: 'error',
        lastRun: '1 day ago',
        successRate: 0,
        totalRuns: 12,
        trigger: { type: 'email', config: {} },
        actions: [{ 
          id: 'action2', 
          type: 'save-to-drive', 
          config: {}, 
          order: 1 
        }],
        error: {
          type: 'connection',
          message: 'Unable to connect to Google Drive. Please reconnect your account.',
          actionRequired: true,
          timestamp: '2024-01-15'
        },
        createdAt: '2024-01-10',
        updatedAt: '2024-01-15'
      }
    ];
  },

  async createAutomation(automation: Omit<Automation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Automation> {
    // Mock implementation
    return {
      ...automation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  async updateAutomation(id: string, updates: Partial<Automation>): Promise<Automation> {
    // Mock implementation
    const automations = await this.getAutomations();
    const automation = automations.find(a => a.id === id);
    if (!automation) throw new Error('Automation not found');
    
    return {
      ...automation,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  },

  async deleteAutomation(id: string): Promise<void> {
    // Mock implementation
    console.log(`Deleting automation ${id}`);
  }
};

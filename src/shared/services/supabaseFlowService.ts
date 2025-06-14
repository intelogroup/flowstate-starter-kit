
import { supabase } from './supabaseClient';
import { supabaseAuthService } from './supabaseAuthService';

export interface Flow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  trigger_service: string;
  trigger_config: any;
  actions: any[];
  last_run: string | null;
  total_runs: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateFlowData {
  name: string;
  description: string;
  trigger_service: string;
  trigger_config?: any;
  actions?: any[];
}

export interface UpdateFlowData {
  name?: string;
  description?: string;
  status?: 'active' | 'paused' | 'error';
  trigger_service?: string;
  trigger_config?: any;
  actions?: any[];
}

class SupabaseFlowService {
  async getFlows(): Promise<Flow[]> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('flows')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch flows: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching flows:', error);
      throw error;
    }
  }

  async getFlow(id: string): Promise<Flow | null> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('flows')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Flow not found
        }
        throw new Error(`Failed to fetch flow: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error fetching flow:', error);
      throw error;
    }
  }

  async createFlow(flowData: CreateFlowData): Promise<Flow> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('flows')
        .insert({
          ...flowData,
          user_id: user.id,
          status: 'paused',
          total_runs: 0,
          success_rate: 0,
          actions: flowData.actions || [],
          trigger_config: flowData.trigger_config || {}
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create flow: ${error.message}`);
      }

      console.log('Flow created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating flow:', error);
      throw error;
    }
  }

  async updateFlow(id: string, updates: UpdateFlowData): Promise<Flow> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('flows')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update flow: ${error.message}`);
      }

      console.log('Flow updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error updating flow:', error);
      throw error;
    }
  }

  async deleteFlow(id: string): Promise<void> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('flows')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        throw new Error(`Failed to delete flow: ${error.message}`);
      }

      console.log('Flow deleted successfully');
    } catch (error) {
      console.error('Error deleting flow:', error);
      throw error;
    }
  }

  async toggleFlowStatus(id: string): Promise<Flow> {
    try {
      const flow = await this.getFlow(id);
      if (!flow) {
        throw new Error('Flow not found');
      }

      const newStatus = flow.status === 'active' ? 'paused' : 'active';
      return await this.updateFlow(id, { status: newStatus });
    } catch (error) {
      console.error('Error toggling flow status:', error);
      throw error;
    }
  }

  async duplicateFlow(id: string): Promise<Flow> {
    try {
      const originalFlow = await this.getFlow(id);
      if (!originalFlow) {
        throw new Error('Flow not found');
      }

      const duplicateData: CreateFlowData = {
        name: `${originalFlow.name} (Copy)`,
        description: originalFlow.description,
        trigger_service: originalFlow.trigger_service,
        trigger_config: originalFlow.trigger_config,
        actions: originalFlow.actions
      };

      return await this.createFlow(duplicateData);
    } catch (error) {
      console.error('Error duplicating flow:', error);
      throw error;
    }
  }

  // Subscribe to real-time flow changes
  subscribeToFlows(callback: (flows: Flow[]) => void) {
    const user = supabaseAuthService.getCurrentUser();
    if (!user) {
      console.error('User not authenticated for subscription');
      return null;
    }

    const subscription = supabase
      .channel('flows_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'flows',
          filter: `user_id=eq.${user.id}`
        },
        async () => {
          // Refetch flows when changes occur
          try {
            const flows = await this.getFlows();
            callback(flows);
          } catch (error) {
            console.error('Error refetching flows after change:', error);
          }
        }
      )
      .subscribe();

    return subscription;
  }
}

export const supabaseFlowService = new SupabaseFlowService();

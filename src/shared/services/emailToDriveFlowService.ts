
import { gmailService, EmailFilter } from './gmailService';
import { driveService } from './driveService';
import { supabaseFlowService, Flow } from './supabaseFlowService';
import { supabaseAuthService } from './supabaseAuthService';
import { supabase } from './supabaseClient';

export interface FlowConfig {
  emailFilter: EmailFilter;
  folderPath: string;
  autoGenerateFolder: boolean;
  fileTypes: string[];
  duplicateHandling: 'skip' | 'overwrite' | 'rename';
  maxFileSize: number; // in MB
}

export interface FlowExecution {
  id: string;
  flow_id: string;
  started_at: string;
  completed_at?: string;
  status: 'running' | 'completed' | 'failed';
  emails_processed: number;
  files_saved: number;
  errors: string[];
  logs: string[];
}

export interface ExecutionResult {
  success: boolean;
  emailsProcessed: number;
  filesSaved: number;
  errors: string[];
  logs: string[];
  executionTime: number;
}

class EmailToDriveFlowService {
  async executeFlow(flowId: string): Promise<ExecutionResult> {
    const startTime = Date.now();
    const logs: string[] = [];
    const errors: string[] = [];
    let emailsProcessed = 0;
    let filesSaved = 0;

    try {
      logs.push('🚀 Starting Email to Drive flow execution');
      
      // Get flow configuration
      const flow = await supabaseFlowService.getFlow(flowId);
      if (!flow) {
        throw new Error('Flow not found');
      }

      const config = flow.trigger_config as FlowConfig;
      logs.push(`📋 Flow configuration loaded: ${flow.name}`);

      // Test service connections
      const gmailConnected = await gmailService.testConnection();
      const driveConnected = await driveService.testConnection();
      
      if (!gmailConnected) {
        throw new Error('Gmail connection failed');
      }
      if (!driveConnected) {
        throw new Error('Google Drive connection failed');
      }
      
      logs.push('✅ Service connections verified');

      // Fetch emails matching the filter
      const emails = await gmailService.getEmails(config.emailFilter);
      logs.push(`📧 Found ${emails.length} emails matching filter`);

      if (emails.length === 0) {
        logs.push('ℹ️ No emails to process');
        return {
          success: true,
          emailsProcessed: 0,
          filesSaved: 0,
          errors,
          logs,
          executionTime: Date.now() - startTime
        };
      }

      // Process each email
      for (const email of emails) {
        try {
          logs.push(`📨 Processing email: ${email.subject}`);
          
          if (email.attachments.length === 0) {
            logs.push('⚠️ No attachments found, skipping');
            continue;
          }

          // Filter attachments by file type
          const validAttachments = email.attachments.filter(att => {
            if (config.fileTypes.length === 0) return true;
            return config.fileTypes.some(type => 
              att.filename.toLowerCase().endsWith(`.${type.toLowerCase()}`)
            );
          });

          if (validAttachments.length === 0) {
            logs.push('⚠️ No valid attachments found, skipping');
            continue;
          }

          // Determine folder path
          let folderPath = config.folderPath;
          if (config.autoGenerateFolder) {
            folderPath = await driveService.generateFolderPath(flow.name);
          }

          // Ensure folder exists
          const folder = await driveService.ensureFolderExists(folderPath);
          logs.push(`📁 Using folder: ${folder.path}`);

          // Process each attachment
          for (const attachment of validAttachments) {
            try {
              // Check file size
              const fileSizeMB = attachment.size / (1024 * 1024);
              if (fileSizeMB > config.maxFileSize) {
                errors.push(`File too large: ${attachment.filename} (${fileSizeMB.toFixed(2)}MB)`);
                continue;
              }

              // Download attachment
              const fileBlob = await gmailService.getAttachment(email.id, attachment.attachmentId);
              logs.push(`⬇️ Downloaded: ${attachment.filename}`);

              // Upload to Drive
              const driveFile = await driveService.uploadFile(
                fileBlob,
                attachment.filename,
                folder.id,
                attachment.mimeType
              );
              
              logs.push(`☁️ Uploaded to Drive: ${driveFile.name}`);
              filesSaved++;

            } catch (attachmentError) {
              const errorMsg = `Failed to process attachment ${attachment.filename}: ${attachmentError}`;
              errors.push(errorMsg);
              logs.push(`❌ ${errorMsg}`);
            }
          }

          emailsProcessed++;
          
        } catch (emailError) {
          const errorMsg = `Failed to process email ${email.subject}: ${emailError}`;
          errors.push(errorMsg);
          logs.push(`❌ ${errorMsg}`);
        }
      }

      logs.push(`✅ Flow execution completed: ${emailsProcessed} emails processed, ${filesSaved} files saved`);

      // Log execution to database
      await this.logExecution(flowId, {
        started_at: new Date(startTime).toISOString(),
        completed_at: new Date().toISOString(),
        status: 'completed',
        emails_processed: emailsProcessed,
        files_saved: filesSaved,
        errors,
        logs
      });

      return {
        success: true,
        emailsProcessed,
        filesSaved,
        errors,
        logs,
        executionTime: Date.now() - startTime
      };

    } catch (error) {
      const errorMsg = `Flow execution failed: ${error}`;
      errors.push(errorMsg);
      logs.push(`💥 ${errorMsg}`);

      // Log failed execution
      await this.logExecution(flowId, {
        started_at: new Date(startTime).toISOString(),
        completed_at: new Date().toISOString(),
        status: 'failed',
        emails_processed: emailsProcessed,
        files_saved: filesSaved,
        errors,
        logs
      });

      return {
        success: false,
        emailsProcessed,
        filesSaved,
        errors,
        logs,
        executionTime: Date.now() - startTime
      };
    }
  }

  private async logExecution(flowId: string, execution: Omit<FlowExecution, 'id' | 'flow_id'>): Promise<void> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) return;

      await supabase
        .from('flow_executions')
        .insert({
          flow_id: flowId,
          user_id: user.id,
          ...execution
        });
    } catch (error) {
      console.error('Failed to log execution:', error);
    }
  }

  async getExecutionHistory(flowId: string, limit: number = 10): Promise<FlowExecution[]> {
    try {
      const user = supabaseAuthService.getCurrentUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('flow_executions')
        .select('*')
        .eq('flow_id', flowId)
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(`Failed to fetch execution history: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching execution history:', error);
      return [];
    }
  }
}

export const emailToDriveFlowService = new EmailToDriveFlowService();

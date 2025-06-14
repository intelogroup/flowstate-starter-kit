
import { googleOAuthService } from './googleOAuthService';

export interface EmailAttachment {
  filename: string;
  mimeType: string;
  size: number;
  attachmentId: string;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  date: string;
  attachments: EmailAttachment[];
  snippet: string;
}

export interface EmailFilter {
  from?: string;
  subject?: string;
  hasAttachment?: boolean;
  fileTypes?: string[];
  after?: string; // date string
}

class GmailService {
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const status = await googleOAuthService.getServiceStatus();
    if (!status.connected) {
      throw new Error('Gmail not connected. Please authenticate first.');
    }
    
    // In production, would get actual access token
    return {
      'Authorization': 'Bearer mock_access_token',
      'Content-Type': 'application/json'
    };
  }

  async getEmails(filter: EmailFilter = {}): Promise<EmailMessage[]> {
    try {
      console.log('Fetching emails with filter:', filter);
      
      // Mock email data for development
      const mockEmails: EmailMessage[] = [
        {
          id: 'email_1',
          threadId: 'thread_1',
          subject: 'Invoice #12345 from Acme Corp',
          from: 'billing@acme.com',
          date: new Date().toISOString(),
          snippet: 'Thank you for your business. Please find attached invoice.',
          attachments: [
            {
              filename: 'invoice_12345.pdf',
              mimeType: 'application/pdf',
              size: 245760,
              attachmentId: 'att_1'
            }
          ]
        },
        {
          id: 'email_2',
          threadId: 'thread_2',
          subject: 'Monthly Report - December 2024',
          from: 'reports@company.com',
          date: new Date(Date.now() - 86400000).toISOString(),
          snippet: 'Please review the attached monthly report.',
          attachments: [
            {
              filename: 'monthly_report_dec_2024.xlsx',
              mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              size: 156890,
              attachmentId: 'att_2'
            }
          ]
        }
      ];

      // Apply filters
      let filteredEmails = mockEmails;
      
      if (filter.from) {
        filteredEmails = filteredEmails.filter(email => 
          email.from.toLowerCase().includes(filter.from!.toLowerCase())
        );
      }
      
      if (filter.subject) {
        filteredEmails = filteredEmails.filter(email => 
          email.subject.toLowerCase().includes(filter.subject!.toLowerCase())
        );
      }
      
      if (filter.hasAttachment) {
        filteredEmails = filteredEmails.filter(email => 
          email.attachments.length > 0
        );
      }
      
      if (filter.fileTypes && filter.fileTypes.length > 0) {
        filteredEmails = filteredEmails.filter(email => 
          email.attachments.some(att => 
            filter.fileTypes!.some(type => 
              att.filename.toLowerCase().endsWith(`.${type.toLowerCase()}`)
            )
          )
        );
      }

      return filteredEmails;
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw error;
    }
  }

  async getAttachment(messageId: string, attachmentId: string): Promise<Blob> {
    try {
      console.log(`Getting attachment ${attachmentId} from message ${messageId}`);
      
      // Mock attachment data for development
      const mockPdfContent = new Uint8Array([
        0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, // PDF header
        ...Array(1000).fill(0x20) // Mock content
      ]);
      
      return new Blob([mockPdfContent], { type: 'application/pdf' });
    } catch (error) {
      console.error('Error getting attachment:', error);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.getAuthHeaders();
      console.log('Gmail connection test successful');
      return true;
    } catch (error) {
      console.error('Gmail connection test failed:', error);
      return false;
    }
  }
}

export const gmailService = new GmailService();

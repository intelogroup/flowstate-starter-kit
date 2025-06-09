
import { useState, useEffect } from 'react';

export interface DataField {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'email' | 'boolean';
  description?: string;
}

export interface FlowStep {
  id: string;
  name: string;
  type: string;
  outputs: DataField[];
}

export const useDynamicDataMapping = () => {
  const [steps, setSteps] = useState<FlowStep[]>([
    {
      id: 'step_1',
      name: 'Filter Gmail Emails',
      type: 'gmail_filter',
      outputs: [
        { key: 'sender_email', label: "Sender's Email", type: 'email', description: 'The email address of the sender' },
        { key: 'sender_name', label: "Sender's Name", type: 'string', description: 'The display name of the sender' },
        { key: 'subject', label: 'Email Subject', type: 'string', description: 'The subject line of the email' },
        { key: 'date_received', label: 'Date Received', type: 'date', description: 'When the email was received' },
        { key: 'attachment_count', label: 'Attachment Count', type: 'number', description: 'Number of attachments in the email' },
        { key: 'body_text', label: 'Email Body', type: 'string', description: 'The text content of the email' }
      ]
    },
    {
      id: 'step_2',
      name: 'Process Attachments',
      type: 'attachment_processor',
      outputs: [
        { key: 'file_name', label: 'File Name', type: 'string', description: 'Name of the processed file' },
        { key: 'file_size', label: 'File Size', type: 'number', description: 'Size of the file in bytes' },
        { key: 'file_type', label: 'File Type', type: 'string', description: 'MIME type of the file' },
        { key: 'download_url', label: 'Download URL', type: 'string', description: 'Temporary URL to download the file' }
      ]
    }
  ]);

  const getAvailableData = (currentStepIndex: number) => {
    return steps.slice(0, currentStepIndex);
  };

  const formatPlaceholder = (stepId: string, fieldKey: string) => {
    return `{{${stepId}.output.${fieldKey}}}`;
  };

  return {
    steps,
    setSteps,
    getAvailableData,
    formatPlaceholder
  };
};

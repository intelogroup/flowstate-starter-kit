
export const AUTOMATION_STATUSES = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'paused', label: 'Paused', color: 'yellow' },
  { value: 'error', label: 'Error', color: 'red' },
  { value: 'draft', label: 'Draft', color: 'gray' },
] as const;

export const TRIGGER_TYPES = [
  { value: 'webhook', label: 'Webhook', icon: 'Globe' },
  { value: 'schedule', label: 'Schedule', icon: 'Clock' },
  { value: 'email', label: 'Email', icon: 'Mail' },
  { value: 'file_upload', label: 'File Upload', icon: 'Upload' },
  { value: 'database_change', label: 'Database Change', icon: 'Database' },
] as const;

export const ACTION_TYPES = [
  { value: 'email', label: 'Send Email', icon: 'Mail' },
  { value: 'webhook', label: 'Call Webhook', icon: 'Globe' },
  { value: 'database', label: 'Database Operation', icon: 'Database' },
  { value: 'file_operation', label: 'File Operation', icon: 'FileText' },
  { value: 'notification', label: 'Send Notification', icon: 'Bell' },
] as const;

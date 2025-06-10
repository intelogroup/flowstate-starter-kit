
export const AUTOMATION_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  ERROR: 'error',
  DRAFT: 'draft'
} as const;

export const AUTOMATION_TRIGGERS = {
  GMAIL_NEW_EMAIL: 'gmail-new-email',
  GOOGLE_DRIVE_NEW_FILE: 'google-drive-new-file',
  CALENDAR_EVENT: 'calendar-event',
  WEBHOOK: 'webhook'
} as const;

export const AUTOMATION_ACTIONS = {
  SAVE_TO_DRIVE: 'save-to-drive',
  SEND_EMAIL: 'send-email',
  CREATE_CALENDAR_EVENT: 'create-calendar-event',
  SEND_SLACK_MESSAGE: 'send-slack-message'
} as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10
} as const;

export const REFRESH_INTERVALS = {
  AUTOMATIONS: 30000, // 30 seconds
  ANALYTICS: 60000,   // 1 minute
  NOTIFICATIONS: 15000 // 15 seconds
} as const;

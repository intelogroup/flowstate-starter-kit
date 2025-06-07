
export interface Flow {
  id: number;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  lastRun: string;
  runsToday: number;
  totalRuns: number;
  successRate: string;
  createdAt: string;
}

export const mockFlows: Flow[] = [
  {
    id: 1,
    name: "Email Invoice Processing",
    description: "Automatically process invoices from email attachments and save to Google Drive",
    trigger: "Gmail",
    actions: ["Google Drive", "Google Sheets", "Slack"],
    lastRun: "2 min ago",
    runsToday: 12,
    totalRuns: 1247,
    successRate: "98.5%",
    createdAt: "2 weeks ago"
  },
  {
    id: 2,
    name: "Customer Support Flow",
    description: "Route support emails to appropriate Slack channels and create Notion tickets",
    trigger: "Gmail",
    actions: ["Slack", "Notion", "Email"],
    lastRun: "15 min ago",
    runsToday: 8,
    totalRuns: 892,
    successRate: "99.2%",
    createdAt: "1 month ago"
  },
  {
    id: 3,
    name: "Lead Qualification",
    description: "Qualify leads from contact forms and add to CRM with follow-up emails",
    trigger: "Webhook",
    actions: ["CRM", "Email", "Google Sheets"],
    lastRun: "2 hours ago",
    runsToday: 0,
    totalRuns: 456,
    successRate: "96.8%",
    createdAt: "3 weeks ago"
  },
  {
    id: 4,
    name: "Social Media Monitor",
    description: "Monitor brand mentions and send alerts to marketing team",
    trigger: "Twitter API",
    actions: ["Slack", "Email", "Database"],
    lastRun: "1 day ago",
    runsToday: 0,
    totalRuns: 234,
    successRate: "94.1%",
    createdAt: "1 week ago"
  }
];

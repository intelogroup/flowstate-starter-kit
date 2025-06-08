
import { toast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle, Info, XCircle, Zap, Clock, Users } from "lucide-react";

export const showFlowToasts = {
  executing: (flowName: string) => {
    toast({
      title: "Flow Started",
      description: `"${flowName}" is now executing...`,
      duration: 3000,
    });
  },

  completed: (flowName: string, duration: string) => {
    toast({
      title: "Flow Completed",
      description: `"${flowName}" executed successfully in ${duration}`,
      duration: 5000,
    });
  },

  failed: (flowName: string, error: string) => {
    toast({
      title: "Flow Failed",
      description: `"${flowName}" encountered an error: ${error}`,
      variant: "destructive",
      duration: 7000,
    });
  },

  paused: (flowName: string) => {
    toast({
      title: "Flow Paused",
      description: `"${flowName}" has been paused`,
      duration: 4000,
    });
  },

  activated: (flowName: string) => {
    toast({
      title: "Flow Activated",
      description: `"${flowName}" is now active and monitoring for triggers`,
      duration: 4000,
    });
  }
};

export const showConnectionToasts = {
  connecting: (serviceName: string) => {
    toast({
      title: "Connecting...",
      description: `Establishing connection to ${serviceName}`,
      duration: 3000,
    });
  },

  connected: (serviceName: string) => {
    toast({
      title: "Connection Successful",
      description: `Successfully connected to ${serviceName}`,
      duration: 4000,
    });
  },

  disconnected: (serviceName: string) => {
    toast({
      title: "Connection Lost",
      description: `Lost connection to ${serviceName}. Attempting to reconnect...`,
      variant: "destructive",
      duration: 6000,
    });
  },

  authExpired: (serviceName: string) => {
    toast({
      title: "Authentication Expired",
      description: `Please re-authenticate your ${serviceName} connection`,
      variant: "destructive",
      duration: 8000,
    });
  }
};

export const showSystemToasts = {
  saving: () => {
    toast({
      title: "Saving...",
      description: "Your changes are being saved",
      duration: 2000,
    });
  },

  saved: () => {
    toast({
      title: "Saved Successfully",
      description: "All changes have been saved",
      duration: 3000,
    });
  },

  autoSaved: () => {
    toast({
      title: "Auto-saved",
      description: "Your work has been automatically saved",
      duration: 2000,
    });
  },

  exportStarted: () => {
    toast({
      title: "Export Started",
      description: "Preparing your data for download...",
      duration: 3000,
    });
  },

  exportReady: () => {
    toast({
      title: "Export Ready",
      description: "Your download is ready and will start shortly",
      duration: 4000,
    });
  },

  quotaWarning: (percentage: number) => {
    toast({
      title: "Usage Warning",
      description: `You've used ${percentage}% of your monthly quota`,
      variant: "destructive",
      duration: 8000,
    });
  }
};

export const showAnalyticsToasts = {
  dataRefreshed: () => {
    toast({
      title: "Data Refreshed",
      description: "Analytics data has been updated with the latest information",
      duration: 3000,
    });
  },

  reportGenerated: (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report is ready for download`,
      duration: 5000,
    });
  }
};


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, Clock, RefreshCw, Download, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const FlowExecutionLogs = () => {
  const [selectedLogLevel, setSelectedLogLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const executionLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:32:15",
      level: "success",
      message: "Flow executed successfully",
      duration: "2.3s",
      itemsProcessed: 5,
      details: {
        trigger: "New email received",
        steps: [
          { step: "Email Detection", status: "success", duration: "0.2s", message: "Found 1 email with attachments" },
          { step: "File Processing", status: "success", duration: "1.1s", message: "Processed 3 PDF files" },
          { step: "Drive Upload", status: "success", duration: "1.0s", message: "Uploaded to /Invoices/2024/" }
        ]
      }
    },
    {
      id: 2,
      timestamp: "2024-01-15 13:15:42",
      level: "warning",
      message: "Flow completed with warnings",
      duration: "4.7s",
      itemsProcessed: 2,
      details: {
        trigger: "Scheduled execution",
        steps: [
          { step: "Email Detection", status: "success", duration: "0.3s", message: "Found 2 emails with attachments" },
          { step: "File Processing", status: "warning", duration: "3.2s", message: "Large file detected, compressed before upload" },
          { step: "Drive Upload", status: "success", duration: "1.2s", message: "Uploaded to /Invoices/2024/" }
        ]
      }
    },
    {
      id: 3,
      timestamp: "2024-01-15 12:05:18",
      level: "error",
      message: "Flow execution failed",
      duration: "1.1s",
      itemsProcessed: 0,
      details: {
        trigger: "New email received",
        error: "Google Drive API quota exceeded",
        steps: [
          { step: "Email Detection", status: "success", duration: "0.2s", message: "Found 1 email with attachments" },
          { step: "File Processing", status: "success", duration: "0.8s", message: "Processed 1 PDF file" },
          { step: "Drive Upload", status: "error", duration: "0.1s", message: "API quota exceeded. Retry in 1 hour." }
        ]
      }
    }
  ];

  const getStatusIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'success': return 'border-green-200 bg-green-50 dark:bg-green-950';
      case 'warning': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950';
      case 'error': return 'border-red-200 bg-red-50 dark:bg-red-950';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-950';
    }
  };

  const filteredLogs = executionLogs.filter(log => {
    const matchesLevel = selectedLogLevel === "all" || log.level === selectedLogLevel;
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.details.trigger.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Execution Logs</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "success", "warning", "error"].map(level => (
              <Button
                key={level}
                variant={selectedLogLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLogLevel(level)}
              >
                {level === "all" ? "All" : level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredLogs.map(log => (
            <div key={log.id} className={`border rounded-lg p-4 ${getStatusColor(log.level)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(log.level)}
                  <span className="font-medium text-foreground">{log.message}</span>
                  <Badge variant="outline" className="text-xs">{log.level}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">{log.timestamp}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-2 font-medium">{log.duration}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Items:</span>
                  <span className="ml-2 font-medium">{log.itemsProcessed}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Trigger:</span>
                  <span className="ml-2 font-medium">{log.details.trigger}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium text-foreground">Execution Steps:</h5>
                {log.details.steps.map((step, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background rounded text-sm">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(step.status)}
                      <span>{step.step}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{step.duration}</span>
                      <span>•</span>
                      <span>{step.message}</span>
                    </div>
                  </div>
                ))}
                {log.details.error && (
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded text-sm">
                    <span className="font-medium text-red-800 dark:text-red-200">Error: </span>
                    <span className="text-red-700 dark:text-red-300">{log.details.error}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowExecutionLogs;

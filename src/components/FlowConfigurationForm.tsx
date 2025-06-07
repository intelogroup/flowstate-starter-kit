
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RotateCcw, Copy, FileText, Clock, Filter, AlertTriangle } from "lucide-react";

const FlowConfigurationForm = () => {
  const [config, setConfig] = useState({
    flowName: "Email to Drive Automation",
    description: "Automatically save email attachments to Google Drive",
    folderPath: "/Invoices/2024",
    schedule: "realtime",
    emailFilter: "has:attachment from:invoices@company.com",
    fileTypes: ["PDF", "DOCX", "XLSX"],
    maxFileSize: 25,
    retryAttempts: 3,
    notifications: true,
    duplicateHandling: "skip",
    preserveStructure: true,
    customNaming: false,
    namingPattern: "{date}_{sender}_{filename}"
  });

  const scheduleOptions = [
    { value: "realtime", label: "Real-time (as emails arrive)", description: "Immediate processing" },
    { value: "15min", label: "Every 15 minutes", description: "Batch processing" },
    { value: "hourly", label: "Hourly", description: "Once per hour" },
    { value: "daily", label: "Daily at 9 AM", description: "Once per day" },
    { value: "custom", label: "Custom schedule", description: "Define your own schedule" }
  ];

  const fileTypeOptions = ["PDF", "DOCX", "XLSX", "PNG", "JPG", "GIF", "TXT", "CSV"];
  
  const duplicateOptions = [
    { value: "skip", label: "Skip duplicates", description: "Don't process files that already exist" },
    { value: "overwrite", label: "Overwrite", description: "Replace existing files" },
    { value: "rename", label: "Rename with suffix", description: "Add number suffix to filename" },
    { value: "version", label: "Create versions", description: "Keep both files with version numbers" }
  ];

  const handleFileTypeToggle = (fileType: string) => {
    setConfig(prev => ({
      ...prev,
      fileTypes: prev.fileTypes.includes(fileType)
        ? prev.fileTypes.filter(t => t !== fileType)
        : [...prev.fileTypes, fileType]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Flow Configuration</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="triggers">Triggers</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="flowName">Flow Name *</Label>
                    <Input
                      id="flowName"
                      value={config.flowName}
                      onChange={(e) => setConfig(prev => ({ ...prev, flowName: e.target.value }))}
                      placeholder="Enter flow name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={config.description}
                      onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Optional description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="folderPath">Destination Folder</Label>
                    <Input
                      id="folderPath"
                      value={config.folderPath}
                      onChange={(e) => setConfig(prev => ({ ...prev, folderPath: e.target.value }))}
                      placeholder="/path/to/folder"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use variables: {"{year}"}, {"{month}"}, {"{sender}"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>File Types</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {fileTypeOptions.map(type => (
                        <Badge
                          key={type}
                          variant={config.fileTypes.includes(type) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleFileTypeToggle(type)}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={config.maxFileSize}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxFileSize: parseInt(e.target.value) }))}
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="triggers" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Trigger Schedule</Label>
                  <div className="grid gap-3 mt-2">
                    {scheduleOptions.map(option => (
                      <div
                        key={option.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          config.schedule === option.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setConfig(prev => ({ ...prev, schedule: option.value }))}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="emailFilter">Email Filter</Label>
                  <Input
                    id="emailFilter"
                    value={config.emailFilter}
                    onChange={(e) => setConfig(prev => ({ ...prev, emailFilter: e.target.value }))}
                    placeholder="Gmail search syntax"
                  />
                  <div className="mt-2 p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Filter className="w-4 h-4" />
                      <span className="text-sm font-medium">Filter Examples:</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• <code>has:attachment</code> - Emails with attachments</div>
                      <div>• <code>from:specific@email.com</code> - From specific sender</div>
                      <div>• <code>subject:invoice</code> - Subject contains "invoice"</div>
                      <div>• <code>filename:pdf</code> - Attachments with PDF files</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="processing" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <Label>Duplicate File Handling</Label>
                  <div className="grid gap-3 mt-2">
                    {duplicateOptions.map(option => (
                      <div
                        key={option.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          config.duplicateHandling === option.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setConfig(prev => ({ ...prev, duplicateHandling: option.value }))}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Custom File Naming</Label>
                      <p className="text-sm text-muted-foreground">Apply custom naming pattern to files</p>
                    </div>
                    <Switch
                      checked={config.customNaming}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, customNaming: checked }))}
                    />
                  </div>
                  
                  {config.customNaming && (
                    <div>
                      <Label htmlFor="namingPattern">Naming Pattern</Label>
                      <Input
                        id="namingPattern"
                        value={config.namingPattern}
                        onChange={(e) => setConfig(prev => ({ ...prev, namingPattern: e.target.value }))}
                        placeholder="e.g., {date}_{sender}_{filename}"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Variables: {"{date}"}, {"{time}"}, {"{sender}"}, {"{subject}"}, {"{filename}"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="retryAttempts">Retry Attempts</Label>
                    <Input
                      id="retryAttempts"
                      type="number"
                      value={config.retryAttempts}
                      onChange={(e) => setConfig(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) }))}
                      min="0"
                      max="10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Number of retry attempts on failure
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications on flow events</p>
                    </div>
                    <Switch
                      checked={config.notifications}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, notifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Preserve Folder Structure</Label>
                      <p className="text-sm text-muted-foreground">Maintain original folder hierarchy</p>
                    </div>
                    <Switch
                      checked={config.preserveStructure}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, preserveStructure: checked }))}
                    />
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800 dark:text-yellow-200">Advanced Settings</span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    These settings affect flow performance and behavior. Changes may require reauthorization of connected services.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlowConfigurationForm;

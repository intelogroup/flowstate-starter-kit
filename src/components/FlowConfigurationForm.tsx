
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RotateCcw, Copy, FileText, Clock, Filter, AlertTriangle } from "lucide-react";
import DynamicInput from "./DynamicInput";
import { useDynamicDataMapping } from "@/hooks/useDynamicDataMapping";
import { toast } from "@/hooks/use-toast";

const FlowConfigurationForm = () => {
  const { getAvailableData } = useDynamicDataMapping();
  const currentStepIndex = 2; // Simulating that we're on step 3, so steps 1-2 are available
  const availableSteps = getAvailableData(currentStepIndex);

  const [config, setConfig] = useState({
    flowName: "Email to Drive Automation",
    description: "Automatically save email attachments to Google Drive",
    folderPath: "/Invoices/{{step_1.output.date_received}}/{{step_1.output.sender_name}}",
    schedule: "realtime",
    emailFilter: "has:attachment from:{{step_1.output.sender_email}}",
    fileTypes: ["PDF", "DOCX", "XLSX"],
    maxFileSize: 25,
    retryAttempts: 3,
    notifications: true,
    duplicateHandling: "skip",
    preserveStructure: true,
    customNaming: true,
    namingPattern: "{{step_1.output.date_received}}_{{step_1.output.sender_name}}_{{step_2.output.file_name}}"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    let error = "";
    
    switch (field) {
      case "flowName":
        if (!value.trim()) {
          error = "A flow name is required.";
        }
        break;
      case "maxFileSize":
        const size = parseInt(value);
        if (isNaN(size) || size <= 0) {
          error = "File size must be a positive number.";
        } else if (size > 100) {
          error = "File size cannot exceed 100 MB.";
        }
        break;
      case "retryAttempts":
        const attempts = parseInt(value);
        if (isNaN(attempts) || attempts < 0) {
          error = "Retry attempts must be a non-negative number.";
        } else if (attempts > 10) {
          error = "Maximum 10 retry attempts allowed.";
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSave = () => {
    toast({
      title: "Flow Saved Successfully",
      description: "Your flow configuration has been saved.",
    });
  };

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
              <Button size="sm" onClick={handleSave}>
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
                    <DynamicInput
                      value={config.flowName}
                      onChange={(value) => handleInputChange('flowName', value)}
                      placeholder="Enter flow name"
                      availableSteps={availableSteps}
                      className={errors.flowName ? "border-destructive" : ""}
                    />
                    {errors.flowName && (
                      <p className="text-sm text-destructive mt-1">{errors.flowName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <DynamicInput
                      value={config.description}
                      onChange={(value) => setConfig(prev => ({ ...prev, description: value }))}
                      placeholder="Optional description"
                      availableSteps={availableSteps}
                      multiline
                    />
                  </div>
                  <div>
                    <Label htmlFor="folderPath">Destination Folder</Label>
                    <DynamicInput
                      value={config.folderPath}
                      onChange={(value) => setConfig(prev => ({ ...prev, folderPath: value }))}
                      placeholder="/path/to/folder"
                      availableSteps={availableSteps}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use the {"{..."} button to insert dynamic data from previous steps
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
                    <DynamicInput
                      type="number"
                      value={config.maxFileSize.toString()}
                      onChange={(value) => handleInputChange('maxFileSize', value)}
                      availableSteps={availableSteps}
                      className={errors.maxFileSize ? "border-destructive" : ""}
                    />
                    {errors.maxFileSize && (
                      <p className="text-sm text-destructive mt-1">{errors.maxFileSize}</p>
                    )}
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
                  <DynamicInput
                    value={config.emailFilter}
                    onChange={(value) => setConfig(prev => ({ ...prev, emailFilter: value }))}
                    placeholder="Gmail search syntax"
                    availableSteps={availableSteps}
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
                      <DynamicInput
                        value={config.namingPattern}
                        onChange={(value) => setConfig(prev => ({ ...prev, namingPattern: value }))}
                        placeholder="e.g., {date}_{sender}_{filename}"
                        availableSteps={availableSteps}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Click the {"{..."} button to insert dynamic data from previous steps
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
                    <DynamicInput
                      type="number"
                      value={config.retryAttempts.toString()}
                      onChange={(value) => handleInputChange('retryAttempts', value)}
                      availableSteps={availableSteps}
                      className={errors.retryAttempts ? "border-destructive" : ""}
                    />
                    {errors.retryAttempts && (
                      <p className="text-sm text-destructive mt-1">{errors.retryAttempts}</p>
                    )}
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

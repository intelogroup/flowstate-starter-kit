import { ArrowLeft, ArrowRight, Check, Mail, FileSpreadsheet, Settings, Play, Clock, AlertTriangle, CheckCircle, Loader, RefreshCw, Database, MessageSquare, Calendar, Zap, Globe, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FlowWizard = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [flowName, setFlowName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [testResults, setTestResults] = useState(null);

  // Enhanced template data with more options
  const templates = [
    {
      id: 1,
      title: "Email to Drive",
      description: "Save email attachments to Google Drive folders",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      category: "Productivity",
      rating: 4.8,
      users: 1247,
      complexity: "Beginner",
      estimatedTime: "5 min setup",
      tags: ["email", "drive", "attachments"],
      isPopular: true
    },
    {
      id: 2,
      title: "Invoice Processing",
      description: "Extract data from invoice PDFs and save to spreadsheet",
      icon: FileSpreadsheet,
      targetIcon: Database,
      category: "Finance",
      rating: 4.9,
      users: 892,
      complexity: "Intermediate",
      estimatedTime: "10 min setup",
      tags: ["invoices", "pdf", "data extraction"],
      isNew: true
    },
    {
      id: 3,
      title: "Social Media Monitor",
      description: "Track mentions and send Slack notifications",
      icon: MessageSquare,
      targetIcon: MessageSquare,
      category: "Marketing",
      rating: 4.6,
      users: 634,
      complexity: "Advanced",
      estimatedTime: "15 min setup",
      tags: ["social media", "monitoring", "notifications"]
    }
  ];

  const template = templates.find(t => t.id === parseInt(templateId || "1")) || templates[0];

  const services = [
    {
      name: "Gmail",
      icon: Mail,
      status: "connected",
      lastAuth: "2 days ago",
      permissions: ["Read emails", "Access attachments"],
      healthStatus: "healthy"
    },
    {
      name: "Google Drive",
      icon: FileSpreadsheet,
      status: "needs_reauth",
      lastAuth: "2 weeks ago",
      permissions: ["Create folders", "Upload files"],
      healthStatus: "warning"
    },
    {
      name: "Slack",
      icon: MessageSquare,
      status: "disconnected",
      lastAuth: "Never",
      permissions: ["Send messages", "Create channels"],
      healthStatus: "error"
    }
  ];

  const steps = [
    { name: "Template Selection", completed: currentStep > 1 },
    { name: "Flow Configuration", completed: currentStep > 2 },
    { name: "Connect Services", completed: currentStep > 3 },
    { name: "Test & Activate", completed: currentStep > 4 }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConnect = (serviceName: string) => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      // Simulate connection success
    }, 2000);
  };

  const handleTest = () => {
    setTestResults({ status: "running" });
    setTimeout(() => {
      setTestResults({
        status: "success",
        executionTime: "2.3s",
        itemsProcessed: 3,
        logs: [
          "✓ Connected to Gmail successfully",
          "✓ Found 3 emails with attachments",
          "✓ Uploaded files to Google Drive",
          "✓ Flow execution completed"
        ]
      });
    }, 3000);
  };

  const handleActivateFlow = () => {
    const finalFlowName = flowName || template.title;
    // Redirect to transitional page with flow details
    navigate(`/flows?name=${encodeURIComponent(finalFlowName)}&id=${Date.now()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 border-green-600';
      case 'needs_reauth': return 'text-yellow-600 border-yellow-600';
      case 'disconnected': return 'text-red-600 border-red-600';
      default: return 'text-gray-600 border-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'needs_reauth': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'disconnected': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Template</CardTitle>
                <CardDescription>Select from our library of pre-built automations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {templates.map((tmpl) => {
                    const Icon = tmpl.icon;
                    const TargetIcon = tmpl.targetIcon;
                    return (
                      <div 
                        key={tmpl.id} 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          tmpl.id === template.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedTemplate(tmpl)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-muted-foreground">→</div>
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                              <TargetIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{tmpl.title}</h3>
                              {tmpl.isPopular && <Badge variant="secondary">Popular</Badge>}
                              {tmpl.isNew && <Badge variant="outline">New</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{tmpl.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {tmpl.rating}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {tmpl.users} users
                              </div>
                              <Badge variant="outline" className="text-xs">{tmpl.complexity}</Badge>
                              <span>{tmpl.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configure Your Flow</CardTitle>
                <CardDescription>Set up the details and triggers for your automation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Flow Name *</label>
                      <Input 
                        placeholder="e.g., Invoice Processing Flow"
                        value={flowName}
                        onChange={(e) => setFlowName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                      <Input placeholder="Optional description of what this flow does..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Folder Path</label>
                      <Input placeholder="/Invoices/2024" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Trigger Schedule</label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Real-time (as emails arrive)</option>
                        <option>Every 15 minutes</option>
                        <option>Hourly</option>
                        <option>Daily at 9 AM</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Email Filter</label>
                      <Input placeholder="has:attachment from:invoices@company.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">File Types</label>
                      <div className="flex flex-wrap gap-2">
                        {['PDF', 'DOCX', 'XLSX', 'PNG', 'JPG'].map(type => (
                          <Badge key={type} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-foreground mb-3">Advanced Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Retry failed attempts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Send notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duplicate file handling</span>
                      <select className="text-sm border rounded px-2 py-1">
                        <option>Skip duplicates</option>
                        <option>Overwrite</option>
                        <option>Rename</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Max file size (MB)</span>
                      <Input type="number" defaultValue="25" className="w-20 h-8" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Services</CardTitle>
                <CardDescription>Authenticate with the services your flow will use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{service.name}</span>
                            {getStatusIcon(service.status)}
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>Last authenticated: {service.lastAuth}</div>
                            <div>Permissions: {service.permissions.join(", ")}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(service.status)}>
                          {service.status === 'connected' ? 'Connected' : 
                           service.status === 'needs_reauth' ? 'Needs Reauth' : 'Not Connected'}
                        </Badge>
                        {service.status !== 'connected' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleConnect(service.name)}
                            disabled={isConnecting}
                          >
                            {isConnecting ? <Loader className="w-4 h-4 animate-spin" /> : 'Connect'}
                          </Button>
                        )}
                        {service.status === 'connected' && (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Connection Health</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">1</div>
                      <div className="text-xs text-muted-foreground">Healthy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">1</div>
                      <div className="text-xs text-muted-foreground">Warning</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">1</div>
                      <div className="text-xs text-muted-foreground">Error</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test & Activate</CardTitle>
                <CardDescription>Run a test and activate your flow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-secondary rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Flow Summary</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your flow "{flowName || template.title}" will automatically process emails and save attachments to Google Drive.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">Gmail</Badge>
                    <span className="text-muted-foreground">→</span>
                    <Badge variant="outline">Google Drive</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Trigger: Real-time email monitoring</div>
                    <div>• Filter: Emails with attachments</div>
                    <div>• Destination: /Invoices/2024</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleTest}
                      disabled={testResults?.status === "running"}
                    >
                      {testResults?.status === "running" ? (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Test Flow
                    </Button>
                    <Button className="flex-1" onClick={handleActivateFlow}>
                      <Check className="w-4 h-4 mr-2" />
                      Activate Flow
                    </Button>
                  </div>

                  {testResults && (
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-medium text-foreground">Test Results</h4>
                        {testResults.status === "running" && <Loader className="w-4 h-4 animate-spin" />}
                        {testResults.status === "success" && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                      
                      {testResults.status === "running" && (
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      )}
                      
                      {testResults.status === "success" && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">Execution Time:</span>
                            <span className="font-medium">{testResults.executionTime}</span>
                            <span className="text-muted-foreground">Items Processed:</span>
                            <span className="font-medium">{testResults.itemsProcessed}</span>
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-foreground">Execution Log:</h5>
                            {testResults.logs.map((log, index) => (
                              <div key={index} className="text-sm text-muted-foreground font-mono bg-background p-2 rounded">
                                {log}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-foreground mb-3">Activation Options</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="activation" defaultChecked />
                      <span className="text-sm">Activate immediately</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="activation" />
                      <span className="text-sm">Schedule activation for later</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="activation" />
                      <span className="text-sm">Save as draft</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Flow</h1>
          <p className="text-muted-foreground">Set up your automation workflow step by step</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              index + 1 <= currentStep 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            }`}>
              {step.completed ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className={`ml-2 text-sm ${
              index + 1 <= currentStep ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${
                step.completed ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={currentStep === 4}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default FlowWizard;

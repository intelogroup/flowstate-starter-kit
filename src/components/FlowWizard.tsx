
import { ArrowLeft, ArrowRight, Check, Mail, FileSpreadsheet, Settings, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const FlowWizard = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [flowName, setFlowName] = useState("");

  // Mock template data
  const template = {
    id: parseInt(templateId || "1"),
    title: "Email to Drive",
    description: "Save email attachments to Google Drive folders",
    icon: Mail,
    targetIcon: FileSpreadsheet,
    steps: [
      { name: "Template Selection", completed: true },
      { name: "Flow Configuration", completed: false },
      { name: "Connect Services", completed: false },
      { name: "Test & Activate", completed: false }
    ]
  };

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

  const handleFinish = () => {
    // In real app, this would create the flow
    navigate('/flows');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Template Selection</CardTitle>
              <CardDescription>Review the selected template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{template.title}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Flow Configuration</CardTitle>
              <CardDescription>Set up your flow details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Flow Name</label>
                <Input 
                  placeholder="Enter a name for your flow..."
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                <Input placeholder="Optional description..." />
              </div>
            </CardContent>
          </Card>
        );
      
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Connect Services</CardTitle>
              <CardDescription>Authenticate with the required services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-foreground">Gmail</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-foreground">Google Drive</span>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Test & Activate</CardTitle>
              <CardDescription>Test your flow and activate it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Flow Summary</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your flow "{flowName || template.title}" will automatically save email attachments to Google Drive.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Gmail</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">Google Drive</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Test Flow
                </Button>
                <Button className="flex-1" onClick={handleFinish}>
                  <Check className="w-4 h-4 mr-2" />
                  Activate Flow
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <p className="text-muted-foreground">Set up your automation workflow</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {template.steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              index + 1 <= currentStep 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            }`}>
              {index + 1 < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className={`ml-2 text-sm ${
              index + 1 <= currentStep ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step.name}
            </span>
            {index < template.steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${
                index + 1 < currentStep ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="max-w-2xl mx-auto">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-2xl mx-auto">
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

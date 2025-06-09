
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionalScreen } from './TransitionalScreens';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, FileSpreadsheet, MessageSquare, Zap, Users, TrendingUp } from 'lucide-react';

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to FlowState',
      description: 'Get started with automation'
    },
    {
      id: 'templates',
      title: 'Choose a Template',
      description: 'Pick your first automation'
    },
    {
      id: 'setup',
      title: 'Quick Setup',
      description: 'Configure your automation'
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Start automating your workflows'
    }
  ];

  const templates = [
    {
      id: 1,
      title: "Email to Drive",
      description: "Automatically save email attachments to Google Drive",
      icon: Mail,
      difficulty: "Beginner",
      time: "5 min setup"
    },
    {
      id: 2,
      title: "Slack Notifications",
      description: "Send important updates to your team instantly",
      icon: MessageSquare,
      difficulty: "Beginner",
      time: "3 min setup"
    },
    {
      id: 3,
      title: "Data Sync",
      description: "Keep your spreadsheets and databases in sync",
      icon: FileSpreadsheet,
      difficulty: "Intermediate",
      time: "10 min setup"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/flows');
    }, 2000);
  };

  const handleSkipOnboarding = () => {
    navigate('/');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Automate Your Workflows</h3>
              <p className="text-muted-foreground">
                FlowState connects your favorite apps and automates repetitive tasks, 
                saving you hours of manual work every week.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm">Connect Apps</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm">Automate Tasks</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm">Save Time</p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground mb-6">
              Choose a template to create your first automation. You can customize it later.
            </p>
            <div className="space-y-3">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <div 
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{template.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">{template.difficulty}</Badge>
                          <Badge variant="outline">{template.time}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 2:
        const template = templates.find(t => t.id === selectedTemplate);
        return (
          <div className="space-y-6">
            {template && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <template.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{template.title}</h3>
                  <p className="text-muted-foreground">{template.description}</p>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-medium mb-2">What will happen:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• We'll guide you through connecting your accounts</li>
                  <li>• Set up the automation with default settings</li>
                  <li>• Test the flow to make sure it works</li>
                  <li>• You can customize it anytime later</li>
                </ul>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                This should take about {template?.time || "5 minutes"} to complete.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Congratulations!</h3>
              <p className="text-muted-foreground">
                Your first automation is ready. You can now manage all your flows 
                from the dashboard and create more automations.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => navigate('/templates')}>
                Browse Templates
              </Button>
              <Button onClick={() => navigate('/create-flow')}>
                Create Custom Flow
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <TransitionalScreen
      title="Get Started with FlowState"
      description="Let's set up your first automation in just a few steps"
      steps={steps}
      currentStep={currentStep}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onComplete={handleComplete}
      onCancel={handleSkipOnboarding}
      isLoading={isLoading}
      loadingMessage="Setting up your first automation..."
      allowSkip={currentStep === 1}
    >
      {renderStepContent()}
    </TransitionalScreen>
  );
};

export default OnboardingFlow;

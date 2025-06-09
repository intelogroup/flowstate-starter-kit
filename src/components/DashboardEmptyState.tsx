
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Zap, ArrowRight, Clock, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardEmptyState = () => {
  const navigate = useNavigate();

  const popularTemplates = [
    {
      icon: <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "Email to Drive",
      description: "Save Gmail attachments to Google Drive automatically",
      category: "Productivity",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />,
      title: "Slack Notifications",
      description: "Get notified in Slack when important emails arrive",
      category: "Communication", 
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: "Form to CRM",
      description: "Add contact form submissions directly to your CRM",
      category: "Sales",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-5 h-5 text-primary" />,
      title: "Save Time",
      description: "Automate repetitive tasks and focus on what matters"
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "Reduce Errors", 
      description: "Eliminate human error with consistent automation"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      title: "Scale Effortlessly",
      description: "Handle more work without increasing manual effort"
    }
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-12 bg-background">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-2xl">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Your automation dashboard is ready
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Create your first flow to put your repetitive tasks on autopilot. 
            Start with a popular template or build from scratch.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90"
            onClick={() => navigate('/templates')}
          >
            <Sparkles className="w-5 h-5 mr-3" />
            Explore Templates
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/create-flow')}
          >
            <Plus className="w-5 h-5 mr-3" />
            Create New Flow
          </Button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">
          Why automate with Flowstate?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Templates Section */}
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">Start with a popular template</h2>
          <p className="text-muted-foreground">Get up and running in minutes with these proven workflows</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularTemplates.map((template, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-border/50 group hover:border-primary/20"
              onClick={() => navigate('/templates')}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${template.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  {template.icon}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{template.title}</h3>
                    <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>
                  <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
                    <span>Use this template</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-col sm:flex-row gap-4 text-center">
        <Button variant="ghost" className="text-muted-foreground" onClick={() => navigate('/documentation')}>
          View Documentation
        </Button>
        <span className="text-muted-foreground hidden sm:block">•</span>
        <Button variant="ghost" className="text-muted-foreground" onClick={() => navigate('/help')}>
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default DashboardEmptyState;

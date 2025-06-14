
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Shield, Workflow, ArrowRight, Sparkles } from 'lucide-react';
import { supabaseAuthService } from '@/shared/services/supabaseAuthService';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to app
    if (supabaseAuthService.isAuthenticated()) {
      navigate('/app');
    }
  }, [navigate]);

  const features = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Visual Flow Builder",
      description: "Create powerful automations with our intuitive drag-and-drop interface"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Execute workflows in milliseconds with our optimized automation engine"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance"
    }
  ];

  const benefits = [
    "Save 10+ hours per week on repetitive tasks",
    "Connect 500+ apps and services",
    "No coding required - anyone can build automations",
    "Real-time monitoring and analytics",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FlowState</span>
          </div>
          <div className="flex gap-3">
            <EnhancedButton
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Sign In
            </EnhancedButton>
            <EnhancedButton
              onClick={() => navigate('/register')}
            >
              Get Started
            </EnhancedButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6">
          ✨ Now with AI-powered automation
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Automate Everything.
          <br />
          <span className="text-primary">Focus on What Matters.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          FlowState is the most powerful automation platform that helps teams eliminate repetitive work 
          and focus on innovation. Build workflows in minutes, not hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <EnhancedButton
            size="lg"
            onClick={() => navigate('/register')}
            className="text-lg px-8 py-6"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </EnhancedButton>
          <EnhancedButton
            variant="outline"
            size="lg"
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-6"
          >
            Sign In
          </EnhancedButton>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          No credit card required • Free 14-day trial • Cancel anytime
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Automate
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make automation accessible to everyone
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Join 10,000+ Teams Already Saving Time
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <EnhancedButton
                size="lg"
                onClick={() => navigate('/register')}
                className="px-8 py-6"
              >
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </EnhancedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">FlowState</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FlowState. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

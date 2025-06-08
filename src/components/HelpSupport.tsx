
import { HelpCircle, MessageSquare, FileText, Mail, ExternalLink, Book, Shield, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import KnowledgeBase from "./KnowledgeBase";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const HelpSupport = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const faqItems = [
    {
      question: "How do I create my first automation?",
      answer: "Click the 'Create Automation' button and follow our step-by-step wizard."
    },
    {
      question: "What's the execution limit?",
      answer: "Free plans include 500 executions per month. Upgrade for unlimited access."
    },
    {
      question: "How do I troubleshoot failed automations?",
      answer: "Check the logs in your automation details and verify all connections are active."
    }
  ];

  if (activeSection === 'knowledge-base') {
    return <KnowledgeBase />;
  }

  if (activeSection === 'privacy') {
    return <PrivacyPolicy />;
  }

  if (activeSection === 'terms') {
    return <TermsOfService />;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
        <p className="text-muted-foreground">Get help and find answers to your questions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveSection('knowledge-base')}
        >
          <CardHeader>
            <Book className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Knowledge Base</CardTitle>
            <CardDescription>Comprehensive guides and tutorials</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Browse Articles
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Technical documentation and API guides</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Docs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Community</CardTitle>
            <CardDescription>Connect with other users</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              Join Discord
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Mail className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get personalized help</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Send Message
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveSection('privacy')}
        >
          <CardHeader>
            <Shield className="w-8 h-8 text-green-600 mb-2" />
            <CardTitle>Privacy Policy</CardTitle>
            <CardDescription>How we protect and handle your data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Read Policy
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveSection('terms')}
        >
          <CardHeader>
            <Scale className="w-8 h-8 text-blue-600 mb-2" />
            <CardTitle>Terms of Service</CardTitle>
            <CardDescription>Legal agreement and usage terms</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Read Terms
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h4 className="font-medium mb-2">{item.question}</h4>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search Help</CardTitle>
            <CardDescription>Find specific information quickly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search for help..." className="pl-10" />
            </div>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm"
                onClick={() => setActiveSection('knowledge-base')}
              >
                How to connect Gmail?
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm"
                onClick={() => setActiveSection('knowledge-base')}
              >
                Setting up webhooks
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm"
                onClick={() => setActiveSection('knowledge-base')}
              >
                Troubleshooting errors
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpSupport;

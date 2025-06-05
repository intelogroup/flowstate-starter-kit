
import { HelpCircle, MessageSquare, FileText, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const HelpSupport = () => {
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
        <p className="text-muted-foreground">Get help and find answers to your questions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <FileText className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Comprehensive guides and tutorials</CardDescription>
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
              <Button variant="ghost" className="w-full justify-start text-sm">
                How to connect Gmail?
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Setting up webhooks
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
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

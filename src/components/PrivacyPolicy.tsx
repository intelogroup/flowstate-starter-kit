
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, Database, UserCheck, Globe, AlertTriangle, Calendar } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Account information (name, email, profile data)",
        "Usage data and analytics",
        "Device and browser information",
        "Flow and automation configurations",
        "Communication preferences"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide and improve our services",
        "Personalize your experience",
        "Send important service notifications",
        "Analyze usage patterns for optimization",
        "Ensure security and prevent fraud"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "End-to-end encryption for sensitive data",
        "Regular security audits and updates",
        "Secure data centers with 24/7 monitoring",
        "Access controls and authentication",
        "Compliance with industry standards"
      ]
    },
    {
      title: "Your Rights",
      icon: UserCheck,
      content: [
        "Access your personal data",
        "Correct inaccurate information",
        "Delete your account and data",
        "Export your data",
        "Opt-out of marketing communications"
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-2">
            How we collect, use, and protect your information
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Last updated: {lastUpdated}
        </Badge>
      </div>

      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Our Commitment to Privacy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            At FlowState, we understand that privacy is fundamental to trust. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our automation platform. We are committed to 
            protecting your personal information and being transparent about our data practices.
          </p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Key Principle:</strong> We only collect information that is necessary to provide and improve our services. 
              We never sell your personal data to third parties.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Data Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Account Data</h3>
              <p className="text-sm text-muted-foreground">Retained while your account is active</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Usage Analytics</h3>
              <p className="text-sm text-muted-foreground">Anonymized after 24 months</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Flow Data</h3>
              <p className="text-sm text-muted-foreground">30 days after account deletion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Third-Party Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Third-Party Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We work with trusted partners to provide our services. Here are the main categories:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Analytics Providers</h3>
              <p className="text-sm text-muted-foreground">Help us understand how our service is used</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Cloud Infrastructure</h3>
              <p className="text-sm text-muted-foreground">Secure hosting and data processing</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Payment Processors</h3>
              <p className="text-sm text-muted-foreground">Handle billing and subscription management</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Communication Tools</h3>
              <p className="text-sm text-muted-foreground">Email delivery and customer support</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Questions or Concerns?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Data Protection Officer</h3>
              <p className="text-sm text-muted-foreground mb-1">privacy@flowstate.com</p>
              <p className="text-sm text-muted-foreground">Response time: 48 hours</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">General Inquiries</h3>
              <p className="text-sm text-muted-foreground mb-1">support@flowstate.com</p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground">
            This privacy policy is effective as of {lastUpdated} and will remain in effect except with respect to any 
            changes in its provisions in the future, which will be in effect immediately after being posted on this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;

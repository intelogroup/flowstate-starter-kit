
import { Scale, FileText, AlertTriangle, CreditCard, Shield, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TermsOfService = () => {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Scale className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-lg text-muted-foreground">
          The legal agreement between you and Autoset for using our automation platform.
        </p>
        <Badge variant="secondary">Last updated: December 2024</Badge>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          By using Autoset, you agree to these terms. If you don't agree with any part of these terms, 
          please do not use our service.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              <CardTitle>User Responsibilities</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Account Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Maintain the confidentiality of your account credentials</li>
                <li>• Notify us immediately of any unauthorized access</li>
                <li>• Use strong passwords and enable two-factor authentication when available</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lawful Use</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Use the service only for lawful purposes</li>
                <li>• Comply with all applicable laws and regulations</li>
                <li>• Respect the rights and privacy of others</li>
                <li>• Do not use the service to send spam or malicious content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Accuracy</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Provide accurate and current information</li>
                <li>• Update your account information when necessary</li>
                <li>• Ensure you have proper authorization for all connected accounts</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <CardTitle>Acceptable Use Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Prohibited Activities</h4>
              <p className="text-sm text-muted-foreground mb-2">You may not use our service to:</p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Violate any laws or regulations</li>
                <li>• Infringe on intellectual property rights</li>
                <li>• Transmit malware, viruses, or harmful code</li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>• Interfere with or disrupt our service</li>
                <li>• Create fake accounts or impersonate others</li>
                <li>• Scrape or crawl our service without permission</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Rate Limits</h4>
              <p className="text-sm text-muted-foreground">
                We enforce reasonable rate limits to ensure service quality for all users. 
                Excessive usage may result in temporary restrictions or account suspension.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-green-600" />
              <CardTitle>Subscription & Billing</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Free Plan</h4>
              <p className="text-sm text-muted-foreground">
                Our free plan includes basic features with usage limits. We reserve the right 
                to modify free plan limits with reasonable notice.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Paid Subscriptions</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Subscriptions are billed monthly or annually in advance</li>
                <li>• All fees are non-refundable except as required by law</li>
                <li>• You can cancel your subscription at any time</li>
                <li>• Price changes will be communicated 30 days in advance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cancellation</h4>
              <p className="text-sm text-muted-foreground">
                You can cancel your subscription at any time through your account settings. 
                Your service will continue until the end of your current billing period.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-600" />
              <CardTitle>Limitations of Liability</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Availability</h4>
              <p className="text-sm text-muted-foreground">
                While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. 
                We are not liable for service interruptions, data loss, or consequential damages.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Third-Party Services</h4>
              <p className="text-sm text-muted-foreground">
                We integrate with third-party services (Gmail, Drive, etc.) but are not responsible 
                for their availability, security, or actions. Use third-party services at your own risk.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Maximum Liability</h4>
              <p className="text-sm text-muted-foreground">
                Our total liability for any claims shall not exceed the amount you paid us in the 
                12 months preceding the claim, or $100, whichever is greater.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-red-600" />
              <CardTitle>Intellectual Property</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Our Rights</h4>
              <p className="text-sm text-muted-foreground">
                Autoset and all related trademarks, logos, and intellectual property are owned by us. 
                You may not use our intellectual property without written permission.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Your Content</h4>
              <p className="text-sm text-muted-foreground">
                You retain ownership of your data and content. By using our service, you grant us 
                a limited license to process your data solely for providing the service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">DMCA Compliance</h4>
              <p className="text-sm text-muted-foreground">
                We respond to valid DMCA takedown notices. If you believe your copyright has been 
                infringed, please contact us with the required information.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-indigo-600" />
              <CardTitle>Dispute Resolution</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Governing Law</h4>
              <p className="text-sm text-muted-foreground">
                These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be 
                resolved in the courts of [Your Jurisdiction].
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Arbitration</h4>
              <p className="text-sm text-muted-foreground">
                For disputes under $10,000, we encourage resolution through binding arbitration 
                rather than court proceedings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Changes to Terms</h4>
              <p className="text-sm text-muted-foreground">
                We may update these terms occasionally. Material changes will be communicated 
                via email 30 days before taking effect.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Questions about these terms? Contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> legal@autoset.app</p>
              <p><strong>Address:</strong> 123 Automation St, Tech City, TC 12345</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;

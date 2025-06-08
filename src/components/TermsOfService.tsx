
import { Scale, FileText, AlertTriangle, CreditCard, Shield, Users, Gavel, Lock, Zap } from "lucide-react";
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
          The legal agreement between you and Flowstate for using our automation platform.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary">Last updated: June 8, 2025</Badge>
          <Badge variant="outline">Document Version: 1.1 (Draft)</Badge>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Note:</strong> This is a draft document and should be reviewed by a legal professional before being published.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Gavel className="w-6 h-6 text-blue-600" />
              <CardTitle>Agreement to Terms</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing or using the Flowstate application ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-green-600" />
              <CardTitle>Description of Service</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Flowstate provides a platform that allows users to create, manage, and execute automated workflows ("Flows") that interact with third-party services, beginning with the Google Workspace ecosystem.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-600" />
              <CardTitle>Beta Service</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You acknowledge that the Service is currently offered as a "Beta" version and is made available on an "As Is" and "As Available" basis. The Service may contain bugs, errors, and other problems. We do not guarantee that the Service will be uninterrupted or error-free.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-600" />
              <CardTitle>User Accounts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>
            <p className="text-sm text-muted-foreground">
              You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
            <p className="text-sm text-muted-foreground">
              You must provide us with information that is accurate, complete, and current at all times.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-600" />
              <CardTitle>Acceptable Use</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You agree not to use the Service in any way that violates any applicable law, to exploit or harm others, to impersonate others, or to interfere with the proper working of the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-indigo-600" />
              <CardTitle>Intellectual Property</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Flowstate and its licensors. Our trademarks may not be used in connection with any product or service without our prior written consent.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-teal-600" />
              <CardTitle>User-Generated Content</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your Flows and their configurations are your "User-Generated Content." You retain all ownership rights to your content.
            </p>
            <p className="text-sm text-muted-foreground">
              By creating Flows, you grant us the right and license to execute them on your behalf for the sole purpose of providing and operating the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-green-600" />
              <CardTitle>Subscriptions & Billing (Future Provision)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              While the Service is currently offered under a free beta plan, we reserve the right to introduce paid subscription plans in the future. We will provide you with reasonable prior notice of any new fees.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <CardTitle>Changes to Service</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-red-500" />
              <CardTitle>Termination</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. You may terminate your account at any time from your account settings page.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-600" />
              <CardTitle>Limitation of Liability</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              In no event shall Flowstate, nor its directors or employees, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your use of the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Gavel className="w-6 h-6 text-indigo-600" />
              <CardTitle>Governing Law</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-green-600" />
              <CardTitle>Contact Us</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> legal@flowstate.app</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;

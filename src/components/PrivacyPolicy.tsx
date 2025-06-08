
import { Shield, Database, Eye, Users, Lock, Mail, AlertTriangle, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">
          Your privacy is our priority. Here's how we protect and handle your data.
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
              <FileText className="w-6 h-6 text-blue-600" />
              <CardTitle>Introduction</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Welcome to Flowstate ("we," "our," "us"). We are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our application ("Service"). Please read this policy carefully. By using our 
              Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600" />
              <CardTitle>Information We Collect</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Identification Information</h4>
              <p className="text-sm text-muted-foreground">
                When you register, we collect your name and email address. If you sign up using Google, 
                we receive your basic profile information as provided by Google.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">User-Generated Content</h4>
              <p className="text-sm text-muted-foreground">
                We store the workflows ("Flows") you create, including their names, triggers, and the 
                configuration of each step. We also store the execution logs of your Flow runs for 
                history and debugging purposes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Third-Party Service Credentials</h4>
              <p className="text-sm text-muted-foreground">
                To perform actions on your behalf, we securely store OAuth 2.0 access and refresh 
                tokens provided by Google. These tokens are always encrypted at rest.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Usage Data</h4>
              <p className="text-sm text-muted-foreground">
                We may collect metadata related to your interaction with our Service, such as feature 
                usage, session duration, and performance analytics to improve our product. Our 
                infrastructure provider, Supabase, may collect IP addresses for security and abuse prevention.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-green-600" />
              <CardTitle>How We Use Your Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">We use the information we collect to:</p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Provide, operate, and maintain our Service</li>
              <li>• Execute your configured automation Flows</li>
              <li>• Communicate with you, including sending service updates and responding to support requests</li>
              <li>• Improve and personalize our Service by analyzing usage patterns</li>
              <li>• Ensure the security of our platform and prevent fraud</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-purple-600" />
              <CardTitle>How We Protect Your Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We implement a variety of security measures to maintain the safety of your personal information:
            </p>
            <div>
              <h4 className="font-semibold mb-2">Encryption</h4>
              <p className="text-sm text-muted-foreground">
                All sensitive credentials are encrypted at rest using industry-standard security practices 
                (Supabase Vault). All data is encrypted in transit using TLS.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Access Control</h4>
              <p className="text-sm text-muted-foreground">
                We use strict access control policies (Row Level Security) to ensure that you are the 
                only person who can access your Flow definitions and logs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Minimization</h4>
              <p className="text-sm text-muted-foreground">
                We follow the principle of least privilege, only requesting the minimum Google account 
                permissions (scopes) necessary to perform your requested automations.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-orange-600" />
              <CardTitle>Data Retention & Deletion</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Transient Data</h4>
              <p className="text-sm text-muted-foreground">
                Data temporarily created to execute a Flow is automatically deleted via Object 
                Lifecycle Rules within 24 hours.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Sanitization</h4>
              <p className="text-sm text-muted-foreground">
                We sanitize execution logs to remove or redact potentially sensitive information (PII) 
                before it is stored for debugging purposes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Account Deletion</h4>
              <p className="text-sm text-muted-foreground">
                You have the right to delete your account at any time from your account settings. 
                This action is irreversible and will permanently delete all your personal data from our systems.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-600" />
              <CardTitle>Third-Party Subprocessors</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground mb-3">
              We use the following third-party services as subprocessors to provide our application:
            </p>
            <div>
              <h4 className="font-semibold mb-2">Supabase</h4>
              <p className="text-sm text-muted-foreground">
                Our core backend infrastructure provider for our database, authentication, and serverless functions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Google</h4>
              <p className="text-sm text-muted-foreground">
                Our primary integration partner for providing automation services. Your use of Google 
                services through our application is subject to Google's own Privacy Policy.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-600" />
              <CardTitle>Children's Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our Service is not intended for use by anyone under the age of 13. We do not knowingly 
              collect personally identifiable information from children under 13.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-green-600" />
              <CardTitle>Contact Us</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@flowstate.app</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

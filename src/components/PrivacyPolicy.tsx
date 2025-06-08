
import { Shield, Database, Eye, Users, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <Badge variant="secondary">Last updated: December 2024</Badge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600" />
              <CardTitle>What Data We Collect</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Account Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Email address and name for account creation</li>
                <li>• Profile information you choose to provide</li>
                <li>• Subscription and billing information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Automation Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Flow configurations and settings you create</li>
                <li>• Execution logs and performance metrics</li>
                <li>• Data you choose to process through automations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Connected Services</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• OAuth tokens for services you connect (Gmail, Drive, etc.)</li>
                <li>• Only the specific data your flows are configured to access</li>
                <li>• Service metadata needed for flow execution</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-green-600" />
              <CardTitle>How We Use Your Data</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Provision</h4>
              <p className="text-sm text-muted-foreground">
                We use your data solely to provide the automation services you've configured. 
                This includes executing your flows, storing execution history, and maintaining 
                your account.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Service Improvement</h4>
              <p className="text-sm text-muted-foreground">
                Aggregated, anonymized usage data helps us improve our platform's performance 
                and reliability. We never use personal data for this purpose.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Communication</h4>
              <p className="text-sm text-muted-foreground">
                We'll send you important service updates, security alerts, and billing notifications. 
                Marketing communications are always opt-in.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-purple-600" />
              <CardTitle>Data Protection</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Encryption</h4>
              <p className="text-sm text-muted-foreground">
                All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. 
                Your OAuth tokens are stored in encrypted form and never logged in plain text.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Access Controls</h4>
              <p className="text-sm text-muted-foreground">
                Access to your data is strictly limited to authorized personnel for support purposes only. 
                All access is logged and monitored for security compliance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Third-Party Services</h4>
              <p className="text-sm text-muted-foreground">
                We use Supabase for database hosting and Google Cloud for some infrastructure. 
                These providers meet enterprise security standards and process data only as instructed.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-orange-600" />
              <CardTitle>Your Rights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Data Access & Portability</h4>
              <p className="text-sm text-muted-foreground">
                You can export your flow configurations and execution data at any time through 
                your account settings or by contacting support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Correction</h4>
              <p className="text-sm text-muted-foreground">
                You can update your account information and flow configurations directly in the app. 
                Contact us if you need help correcting any data.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Deletion</h4>
              <p className="text-sm text-muted-foreground">
                You can delete your account and all associated data at any time. We'll retain 
                billing records as required by law, but all other data is permanently deleted.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Withdrawal of Consent</h4>
              <p className="text-sm text-muted-foreground">
                You can revoke permissions for connected services at any time through your account 
                settings or the respective service's authorization settings.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-red-600" />
              <CardTitle>Contact Us</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you have questions about this privacy policy or your data, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@autoset.app</p>
              <p><strong>Address:</strong> 123 Automation St, Tech City, TC 12345</p>
              <p><strong>Data Protection Officer:</strong> dpo@autoset.app</p>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              This policy complies with GDPR, CCPA, and other applicable privacy regulations. 
              We'll notify you of material changes via email and update the "Last updated" date above.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

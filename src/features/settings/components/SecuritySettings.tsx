
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useSettings } from "../hooks/useSettings";

const SecuritySettings = () => {
  const { settings, updateSettings, isSaving } = useSettings();

  if (!settings) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
          <Switch
            id="two-factor"
            checked={settings.security.twoFactorEnabled}
            onCheckedChange={(checked) => 
              updateSettings({ 
                security: { ...settings.security, twoFactorEnabled: checked }
              })
            }
            disabled={isSaving}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
          <Input
            id="session-timeout"
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => 
              updateSettings({ 
                security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
              })
            }
            disabled={isSaving}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="api-key-expiry">API Key Expiry (days)</Label>
          <Input
            id="api-key-expiry"
            type="number"
            value={settings.security.apiKeyExpiry}
            onChange={(e) => 
              updateSettings({ 
                security: { ...settings.security, apiKeyExpiry: parseInt(e.target.value) }
              })
            }
            disabled={isSaving}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "../hooks/useSettings";

const NotificationSettings = () => {
  const { settings, updateSettings, isSaving } = useSettings();

  if (!settings) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch
            id="email-notifications"
            checked={settings.notifications.email}
            onCheckedChange={(checked) => 
              updateSettings({ 
                notifications: { ...settings.notifications, email: checked }
              })
            }
            disabled={isSaving}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <Switch
            id="push-notifications"
            checked={settings.notifications.push}
            onCheckedChange={(checked) => 
              updateSettings({ 
                notifications: { ...settings.notifications, push: checked }
              })
            }
            disabled={isSaving}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="flow-updates">Flow Updates</Label>
          <Switch
            id="flow-updates"
            checked={settings.notifications.flowUpdates}
            onCheckedChange={(checked) => 
              updateSettings({ 
                notifications: { ...settings.notifications, flowUpdates: checked }
              })
            }
            disabled={isSaving}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="system-alerts">System Alerts</Label>
          <Switch
            id="system-alerts"
            checked={settings.notifications.systemAlerts}
            onCheckedChange={(checked) => 
              updateSettings({ 
                notifications: { ...settings.notifications, systemAlerts: checked }
              })
            }
            disabled={isSaving}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="weekly-reports">Weekly Reports</Label>
          <Switch
            id="weekly-reports"
            checked={settings.notifications.weeklyReports}
            onCheckedChange={(checked) => 
              updateSettings({ 
                notifications: { ...settings.notifications, weeklyReports: checked }
              })
            }
            disabled={isSaving}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;

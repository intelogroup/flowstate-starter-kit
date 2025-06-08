
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Clock, Trash2 } from "lucide-react";

interface FlowSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flowName: string;
  flowId: number;
}

const FlowSettingsModal = ({ isOpen, onClose, flowName, flowId }: FlowSettingsModalProps) => {
  const [settings, setSettings] = useState({
    name: flowName,
    description: "Automatically sync emails to Slack channel",
    enabled: true,
    notifications: {
      onSuccess: true,
      onError: true,
      onWarning: false,
      digest: true
    },
    scheduling: {
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
      timezone: "UTC",
      workdays: true
    },
    security: {
      requireApproval: false,
      logRetention: 30,
      encryption: true
    }
  });

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Flow Settings - {settings.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
                <CardDescription>
                  Update your flow's name and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Flow Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={settings.description}
                    onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Flow Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable this flow
                    </p>
                  </div>
                  <Switch
                    checked={settings.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, enabled: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose when you want to be notified about this flow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries({
                  onSuccess: "Successful executions",
                  onError: "Errors and failures",
                  onWarning: "Warnings and issues",
                  digest: "Daily digest summary"
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label>{label}</Label>
                    <Switch
                      checked={settings.notifications[key as keyof typeof settings.notifications]}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ 
                          ...prev, 
                          notifications: { ...prev.notifications, [key]: checked }
                        }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduling" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Schedule Settings
                </CardTitle>
                <CardDescription>
                  Control when this flow can run
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Scheduling</Label>
                    <p className="text-sm text-muted-foreground">
                      Restrict flow execution to specific hours
                    </p>
                  </div>
                  <Switch
                    checked={settings.scheduling.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ 
                        ...prev, 
                        scheduling: { ...prev.scheduling, enabled: checked }
                      }))
                    }
                  />
                </div>
                
                {settings.scheduling.enabled && (
                  <>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={settings.scheduling.startTime}
                          onChange={(e) => setSettings(prev => ({ 
                            ...prev, 
                            scheduling: { ...prev.scheduling, startTime: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={settings.scheduling.endTime}
                          onChange={(e) => setSettings(prev => ({ 
                            ...prev, 
                            scheduling: { ...prev.scheduling, endTime: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Workdays Only</Label>
                      <Switch
                        checked={settings.scheduling.workdays}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ 
                            ...prev, 
                            scheduling: { ...prev.scheduling, workdays: checked }
                          }))
                        }
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security & Privacy
                </CardTitle>
                <CardDescription>
                  Configure security settings for this flow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Require Manual Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      Require approval before executing sensitive actions
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.requireApproval}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ 
                        ...prev, 
                        security: { ...prev.security, requireApproval: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logRetention">Log Retention (days)</Label>
                  <Input
                    id="logRetention"
                    type="number"
                    value={settings.security.logRetention}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      security: { ...prev.security, logRetention: parseInt(e.target.value) }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">
                      Encrypt sensitive data in logs
                    </p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>

                <Separator />
                
                <div className="space-y-3">
                  <Label className="text-destructive">Danger Zone</Label>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Flow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlowSettingsModal;

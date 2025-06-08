
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsUsage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Peak Usage Hours</CardTitle>
            <CardDescription>When your automations are most active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "9:00 - 10:00 AM", usage: 85, executions: 387 },
                { time: "2:00 - 3:00 PM", usage: 78, executions: 456 },
                { time: "10:00 - 11:00 AM", usage: 72, executions: 445 },
                { time: "1:00 - 2:00 PM", usage: 68, executions: 423 }
              ].map((period, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{period.time}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${period.usage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">{period.executions}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
            <CardDescription>System resource consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">CPU Usage</span>
                <span className="text-sm font-medium">34%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '34%' }} />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Memory Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }} />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Storage Usage</span>
                <span className="text-sm font-medium">23%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '23%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsUsage;

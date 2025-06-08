
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsOverview = () => {
  const hourlyActivity = [
    { hour: "00", executions: 45 }, { hour: "01", executions: 32 }, { hour: "02", executions: 28 },
    { hour: "03", executions: 19 }, { hour: "04", executions: 15 }, { hour: "05", executions: 23 },
    { hour: "06", executions: 78 }, { hour: "07", executions: 156 }, { hour: "08", executions: 234 },
    { hour: "09", executions: 387 }, { hour: "10", executions: 445 }, { hour: "11", executions: 398 },
    { hour: "12", executions: 365 }, { hour: "13", executions: 423 }, { hour: "14", executions: 456 },
    { hour: "15", executions: 398 }, { hour: "16", executions: 334 }, { hour: "17", executions: 278 },
    { hour: "18", executions: 198 }, { hour: "19", executions: 145 }, { hour: "20", executions: 123 },
    { hour: "21", executions: 98 }, { hour: "22", executions: 76 }, { hour: "23", executions: 58 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Execution Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Execution Trends</CardTitle>
            <CardDescription>Daily execution volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {[...Array(7)].map((_, i) => {
                const height = Math.random() * 80 + 20;
                const value = Math.floor(Math.random() * 500 + 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div className="text-xs font-medium text-foreground">{value}</div>
                    <div 
                      className="bg-primary rounded-t-sm w-full transition-all duration-500 hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-muted-foreground">
                      {new Date(Date.now() - (6-i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Success Rate Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Success Rate Trends</CardTitle>
            <CardDescription>Success rate percentage over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {[98.2, 97.8, 98.9, 99.1, 98.5, 98.7, 99.2].map((rate, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className="text-xs font-medium text-foreground">{rate}%</div>
                  <div 
                    className="bg-green-500 rounded-t-sm w-full"
                    style={{ height: `${rate}%` }}
                  />
                  <div className="text-xs text-muted-foreground">
                    {new Date(Date.now() - (6-i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Activity Distribution</CardTitle>
          <CardDescription>Execution volume by hour of day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-1">
            {hourlyActivity.map((item, index) => {
              const intensity = (item.executions / 500) * 100;
              return (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div 
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium cursor-pointer hover:scale-110 transition-transform"
                    style={{ 
                      backgroundColor: `hsl(var(--primary) / ${Math.max(intensity, 10)}%)`,
                      color: intensity > 50 ? 'white' : 'hsl(var(--foreground))'
                    }}
                    title={`${item.hour}:00 - ${item.executions} executions`}
                  >
                    {item.executions}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.hour}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;

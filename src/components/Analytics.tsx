
import { BarChart3, TrendingUp, Users, Zap, Clock, CheckCircle, XCircle, Activity, Calendar, Download, RefreshCw, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const metrics = {
    totalExecutions: { value: 12845, change: 15.2, trend: "up" },
    successRate: { value: 98.7, change: 2.1, trend: "up" },
    activeUsers: { value: 573, change: 8.7, trend: "up" },
    avgExecutionTime: { value: 2.3, change: -12.5, trend: "down" },
    totalFlows: { value: 47, change: 6.8, trend: "up" },
    errorRate: { value: 1.3, change: -15.2, trend: "down" }
  };

  const topFlows = [
    { name: "Email Invoice Processing", executions: 2847, successRate: 99.2, avgTime: "2.1s" },
    { name: "Lead Qualification", executions: 1923, successRate: 97.8, avgTime: "1.8s" },
    { name: "Document Analysis", executions: 1654, successRate: 96.5, avgTime: "4.2s" },
    { name: "Social Media Monitor", executions: 1432, successRate: 98.9, avgTime: "1.2s" },
    { name: "Customer Onboarding", executions: 987, successRate: 95.3, avgTime: "3.5s" }
  ];

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

  const errorCategories = [
    { category: "API Rate Limits", count: 45, percentage: 34 },
    { category: "Authentication", count: 28, percentage: 21 },
    { category: "Network Timeouts", count: 23, percentage: 17 },
    { category: "Data Validation", count: 19, percentage: 14 },
    { category: "Service Unavailable", count: 18, percentage: 14 }
  ];

  const getMetricIcon = (key: string) => {
    const icons = {
      totalExecutions: Zap,
      successRate: CheckCircle,
      activeUsers: Users,
      avgExecutionTime: Clock,
      totalFlows: Activity,
      errorRate: XCircle
    };
    return icons[key as keyof typeof icons] || Activity;
  };

  const formatMetricValue = (key: string, value: number) => {
    switch (key) {
      case 'successRate':
      case 'errorRate':
        return `${value}%`;
      case 'avgExecutionTime':
        return `${value}s`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor your automation performance and usage patterns.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Object.entries(metrics).map(([key, metric]) => {
          const Icon = getMetricIcon(key);
          const isPositive = (key === 'errorRate') ? metric.trend === 'down' : metric.trend === 'up';
          
          return (
            <Card key={key} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${
                    key === 'errorRate' ? 'text-red-500' : 
                    key === 'successRate' ? 'text-green-500' : 'text-blue-500'
                  }`} />
                  <div className={`flex items-center text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {formatMetricValue(key, metric.value)}
                </div>
                <p className="text-xs text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flows">Top Flows</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="flows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Flows</CardTitle>
              <CardDescription>Your most active automation flows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFlows.map((flow, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{flow.name}</h4>
                        <p className="text-sm text-muted-foreground">{flow.executions.toLocaleString()} executions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-green-600">{flow.successRate}%</div>
                        <div className="text-muted-foreground">Success</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-foreground">{flow.avgTime}</div>
                        <div className="text-muted-foreground">Avg Time</div>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Categories</CardTitle>
                <CardDescription>Distribution of error types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorCategories.map((error, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-sm font-medium text-foreground">{error.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${error.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{error.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Resolution</CardTitle>
                <CardDescription>Recommended actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      High API Rate Limits
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      Consider implementing exponential backoff or upgrading API plans
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Authentication Issues
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Set up automatic token refresh for connected services
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <div className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      Network Timeouts
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      Increase timeout values for external service calls
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;

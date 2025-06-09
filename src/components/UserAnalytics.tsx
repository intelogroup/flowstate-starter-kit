
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Download, Calendar, RefreshCw, Clock, Zap, CheckCircle, AlertTriangle, Award, Target, BookOpen } from "lucide-react";

const UserAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Enhanced realistic dummy data
  const personalMetrics = {
    totalExecutions: { value: 1247, change: 12.3, trend: "up" as const },
    successRate: { value: 97.8, change: 2.1, trend: "up" as const },
    timeSaved: { value: 42.5, change: 8.7, trend: "up" as const }, // hours this week
    automationROI: { value: 340, change: 15.2, trend: "up" as const }, // dollars saved
    averageProcessingTime: { value: 1.8, change: -12.5, trend: "down" as const },
    activeFlows: { value: 8, change: 0, trend: "up" as const }
  };

  const myFlowPerformance = [
    { name: "Invoice Email Processing", executions: 284, successRate: 98.9, timeSaved: 12.3, errorCount: 3, avgDuration: "1.2s", roi: 85 },
    { name: "Document Backup Flow", executions: 156, successRate: 99.4, timeSaved: 8.7, errorCount: 1, avgDuration: "2.1s", roi: 62 },
    { name: "Lead Notification Setup", executions: 89, successRate: 95.5, timeSaved: 4.2, errorCount: 4, avgDuration: "0.8s", roi: 28 },
    { name: "Weekly Report Generator", executions: 42, successRate: 100, timeSaved: 6.8, errorCount: 0, avgDuration: "3.4s", roi: 95 },
    { name: "Social Media Monitor", executions: 678, successRate: 97.2, timeSaved: 10.5, errorCount: 19, avgDuration: "0.5s", roi: 70 }
  ];

  const weeklyActivity = [
    { day: "Mon", executions: 187, successes: 182, failures: 5, timeSaved: 6.2 },
    { day: "Tue", executions: 234, successes: 229, failures: 5, timeSaved: 7.8 },
    { day: "Wed", executions: 156, successes: 151, failures: 5, timeSaved: 5.1 },
    { day: "Thu", executions: 298, successes: 291, failures: 7, timeSaved: 9.4 },
    { day: "Fri", executions: 245, successes: 240, failures: 5, timeSaved: 8.2 },
    { day: "Sat", executions: 89, successes: 87, failures: 2, timeSaved: 3.1 },
    { day: "Sun", executions: 38, successes: 37, failures: 1, timeSaved: 1.7 }
  ];

  const errorInsights = [
    { type: "Gmail Rate Limit", count: 12, impact: "Low", suggestion: "Spread executions over longer periods" },
    { type: "File Access Permission", count: 8, impact: "Medium", suggestion: "Re-authorize Google Drive connection" },
    { type: "Network Timeout", count: 5, impact: "Low", suggestion: "Increase timeout duration in flow settings" },
    { type: "Invalid Email Format", count: 3, impact: "Medium", suggestion: "Add email validation step before processing" }
  ];

  const productivityInsights = [
    { 
      title: "Peak Productivity Hours", 
      description: "Your flows save you the most time between 9-11 AM", 
      action: "Schedule important automations during this window",
      type: "tip"
    },
    { 
      title: "Optimization Opportunity", 
      description: "Invoice processing could be 23% faster with batch processing", 
      action: "Enable batch mode in flow settings",
      type: "optimization"
    },
    { 
      title: "Great Success Rate!", 
      description: "Your automation success rate is 15% above average", 
      action: "Consider sharing your setup as a template",
      type: "achievement"
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  const formatMetricValue = (key: string, value: number) => {
    switch (key) {
      case 'timeSaved': return `${value}h`;
      case 'automationROI': return `$${value}`;
      case 'successRate': return `${value}%`;
      case 'averageProcessingTime': return `${value}s`;
      default: return value.toLocaleString();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Automation Analytics</h1>
          <p className="text-muted-foreground">Track your personal automation performance and productivity gains</p>
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

      {/* Key Personal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Object.entries(personalMetrics).map(([key, metric]) => {
          const isPositive = key === 'averageProcessingTime' ? metric.trend === 'down' : metric.trend === 'up';
          const icons = {
            totalExecutions: Zap,
            successRate: CheckCircle,
            timeSaved: Clock,
            automationROI: TrendingUp,
            averageProcessingTime: Clock,
            activeFlows: Target
          };
          const Icon = icons[key as keyof typeof icons];
          
          return (
            <Card key={key}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                  {metric.change !== 0 && (
                    <div className={`flex items-center text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(metric.change)}%
                    </div>
                  )}
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

      <Tabs defaultValue="flows" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flows">My Flows</TabsTrigger>
          <TabsTrigger value="activity">Weekly Activity</TabsTrigger>
          <TabsTrigger value="insights">Insights & Tips</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="flows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Flow Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myFlowPerformance.map((flow, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{flow.name}</h4>
                        <p className="text-sm text-muted-foreground">{flow.executions} executions • Saved {flow.timeSaved}h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-green-600">{flow.successRate}%</div>
                        <div className="text-muted-foreground">Success</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-foreground">{flow.avgDuration}</div>
                        <div className="text-muted-foreground">Avg Time</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-primary">${flow.roi}</div>
                        <div className="text-muted-foreground">Value</div>
                      </div>
                      <Badge variant={flow.errorCount > 5 ? "destructive" : "outline"}>
                        {flow.errorCount} errors
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-foreground w-12">{day.day}</span>
                      <Badge variant="outline">{day.executions} runs</Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-green-600">
                        ✓ {day.successes}
                      </div>
                      <div className="text-red-600">
                        ✗ {day.failures}
                      </div>
                      <div className="text-primary font-medium">
                        +{day.timeSaved}h saved
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            {productivityInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      insight.type === 'achievement' ? 'bg-green-100 dark:bg-green-900' :
                      insight.type === 'optimization' ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-yellow-100 dark:bg-yellow-900'
                    }`}>
                      {insight.type === 'achievement' && <Award className="w-6 h-6 text-green-600" />}
                      {insight.type === 'optimization' && <Target className="w-6 h-6 text-blue-600" />}
                      {insight.type === 'tip' && <BookOpen className="w-6 h-6 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{insight.title}</h3>
                      <p className="text-muted-foreground mb-3">{insight.description}</p>
                      <Button variant="outline" size="sm">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Error Analysis & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {errorInsights.map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`w-5 h-5 ${
                        error.impact === 'High' ? 'text-red-500' :
                        error.impact === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <div>
                        <span className="font-medium text-foreground">{error.type}</span>
                        <div className="text-sm text-muted-foreground">{error.count} occurrences</div>
                      </div>
                    </div>
                    <div className="text-right max-w-md">
                      <Badge variant={error.impact === 'High' ? 'destructive' : error.impact === 'Medium' ? 'default' : 'secondary'}>
                        {error.impact} Impact
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{error.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAnalytics;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Download, Calendar, BarChart3, PieChart, Activity, RefreshCw } from "lucide-react";
import FlowMetricsCard from "./FlowMetricsCard";

const FlowAnalytics = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const performanceData = [
    { date: "2024-01-10", executions: 45, success: 42, failures: 3, avgDuration: 2.1 },
    { date: "2024-01-11", executions: 52, success: 50, failures: 2, avgDuration: 1.9 },
    { date: "2024-01-12", executions: 38, success: 36, failures: 2, avgDuration: 2.3 },
    { date: "2024-01-13", executions: 61, success: 58, failures: 3, avgDuration: 2.0 },
    { date: "2024-01-14", executions: 47, success: 45, failures: 2, avgDuration: 2.2 },
    { date: "2024-01-15", executions: 55, success: 53, failures: 2, avgDuration: 1.8 }
  ];

  const errorTypes = [
    { type: "API Rate Limit", count: 8, percentage: 42 },
    { type: "Authentication", count: 5, percentage: 26 },
    { type: "File Too Large", count: 4, percentage: 21 },
    { type: "Network Timeout", count: 2, percentage: 11 }
  ];

  const fileProcessingStats = [
    { type: "PDF", count: 234, size: "45.2 MB", percentage: 52 },
    { type: "DOCX", count: 123, size: "23.1 MB", percentage: 27 },
    { type: "XLSX", count: 89, size: "15.8 MB", percentage: 20 },
    { type: "Other", count: 5, size: "1.2 MB", percentage: 1 }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Updating...' : 'Refresh'}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FlowMetricsCard
          title="Total Executions"
          value="1,247"
          change={{ value: 12, period: "last week", trend: "up" }}
          status="healthy"
          icon={Activity}
        />
        <FlowMetricsCard
          title="Success Rate"
          value="97.2%"
          change={{ value: 2.1, period: "last week", trend: "up" }}
          status="healthy"
          icon={TrendingUp}
        />
        <FlowMetricsCard
          title="Avg Duration"
          value="2.1s"
          change={{ value: 0.3, period: "last week", trend: "down" }}
          status="healthy"
          subtitle="Processing time"
          icon={BarChart3}
        />
        <FlowMetricsCard
          title="Files Processed"
          value="451"
          change={{ value: 8, period: "last week", trend: "up" }}
          status="healthy"
          subtitle="Total attachments"
          icon={PieChart}
        />
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="errors">Error Analysis</TabsTrigger>
            <TabsTrigger value="files">File Processing</TabsTrigger>
            <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 7 days
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="performance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Execution Trends
                  {isRefreshing && (
                    <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-foreground">{data.date}</span>
                        <Badge variant="outline">{data.executions} runs</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-green-600">
                          ✓ {data.success}
                        </div>
                        <div className="text-red-600">
                          ✗ {data.failures}
                        </div>
                        <div className="text-muted-foreground">
                          {data.avgDuration}s avg
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">9:00 - 10:00 AM</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">2:00 - 3:00 PM</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }} />
                        </div>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">11:00 - 12:00 PM</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }} />
                        </div>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="text-sm font-medium text-green-800 dark:text-green-200">
                        Excellent Performance
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        97.2% success rate, well above average
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Optimization Opportunity
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        Consider batch processing during peak hours
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="errors">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorTypes.map((error, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <span className="font-medium text-foreground">{error.type}</span>
                        <div className="text-sm text-muted-foreground">{error.count} occurrences</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${error.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{error.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      API Rate Limit (42% of errors)
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      Consider implementing exponential backoff or upgrading API plan
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Authentication Issues (26% of errors)
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Set up automatic token refresh or reauthorization alerts
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="files">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>File Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fileProcessingStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{stat.type}</Badge>
                        <div>
                          <div className="font-medium text-foreground">{stat.count} files</div>
                          <div className="text-sm text-muted-foreground">{stat.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${stat.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{stat.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">PDF Processing:</span>
                      <span className="font-medium">2.8s avg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">DOCX Processing:</span>
                      <span className="font-medium">1.2s avg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">XLSX Processing:</span>
                      <span className="font-medium">1.8s avg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Image Processing:</span>
                      <span className="font-medium">0.9s avg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Stored:</span>
                      <span className="font-medium">85.3 MB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">This Month:</span>
                      <span className="font-medium">23.7 MB</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '34%' }} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      34% of monthly quota used
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="text-muted-foreground">Usage pattern analytics coming soon...</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlowAnalytics;

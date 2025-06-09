
import { useState } from "react";
import { ArrowLeft, Download, RefreshCw, Calendar, TrendingUp, Activity, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface AnalyticsDetailViewProps {
  metricType: string;
  onBack: () => void;
}

const AnalyticsDetailView = ({ metricType, onBack }: AnalyticsDetailViewProps) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock detailed data based on metric type
  const getDetailedData = () => {
    const mockData = {
      executions: {
        title: "Flow Executions",
        description: "Detailed breakdown of flow execution metrics",
        totalValue: "2,847",
        change: "+12.5%",
        data: Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 50,
          success: Math.floor(Math.random() * 80) + 40,
          failed: Math.floor(Math.random() * 20) + 5
        }))
      },
      successRate: {
        title: "Success Rate",
        description: "Success rate trends and failure analysis",
        totalValue: "94.2%",
        change: "+2.1%",
        data: Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          value: Math.random() * 10 + 90,
          baseline: 95
        }))
      },
      avgResponseTime: {
        title: "Average Response Time",
        description: "Performance metrics and response time analysis",
        totalValue: "1.8s",
        change: "-0.3s",
        data: Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          value: Math.random() * 2 + 1,
          target: 2
        }))
      }
    };

    return mockData[metricType as keyof typeof mockData] || mockData.executions;
  };

  const detailData = getDetailedData();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleExport = () => {
    console.log('Exporting analytics data...');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Analytics
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{detailData.title}</h1>
            <p className="text-muted-foreground">{detailData.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold">{detailData.totalValue}</p>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{detailData.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Range</p>
                <p className="text-lg font-semibold">Last 30 days</p>
              </div>
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Points</p>
                <p className="text-lg font-semibold">{detailData.data.length}</p>
              </div>
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Time Range:</span>
        {['24h', '7d', '30d', '90d'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="trend" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trend">Trend Analysis</TabsTrigger>
          <TabsTrigger value="breakdown">Data Breakdown</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="trend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trend Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={detailData.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                    />
                    {metricType === 'executions' && (
                      <>
                        <Line 
                          type="monotone" 
                          dataKey="success" 
                          stroke="#10b981" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="failed" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                        />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={detailData.data.slice(-10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">This Period</h4>
                    <p className="text-2xl font-bold text-primary">{detailData.totalValue}</p>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Previous Period</h4>
                    <p className="text-2xl font-bold">2,534</p>
                    <p className="text-sm text-muted-foreground">30 days before</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.3% improvement
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDetailView;

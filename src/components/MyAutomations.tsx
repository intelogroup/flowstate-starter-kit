
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Pause, 
  Settings, 
  MoreHorizontal, 
  Search, 
  Filter,
  Plus,
  Workflow,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { FlowCardWithErrorHandling } from "./FlowCardWithErrorHandling";
import { EmptyState } from "./EmptyStates";
import LoadingSkeleton from "./LoadingSkeleton";
import { useNavigate } from "react-router-dom";

const MyAutomations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  // Mock data - will be replaced with actual Supabase data
  const automations = [
    {
      id: 1,
      name: "Invoice Processing",
      description: "Automatically extract data from invoices and save to spreadsheet",
      status: 'active' as const,
      lastRun: "2 hours ago",
      runsToday: 12,
      successRate: 98.5,
      tags: ["finance", "automation"],
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Email to Drive",
      description: "Save email attachments to Google Drive automatically",
      status: 'error' as const,
      lastRun: "1 day ago",
      runsToday: 0,
      successRate: 0,
      tags: ["email", "storage"],
      createdAt: "2024-01-10",
      error: {
        type: 'connection' as const,
        message: "Unable to connect to Google Drive. Please reconnect your account.",
        actionRequired: true
      }
    },
    {
      id: 3,
      name: "Social Media Monitor",
      description: "Track brand mentions across social platforms",
      status: 'paused' as const,
      lastRun: "3 days ago",
      runsToday: 0,
      successRate: 94.2,
      tags: ["social", "monitoring"],
      createdAt: "2024-01-08"
    }
  ];

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || automation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleAutomation = (id: number) => {
    console.log(`Toggle automation ${id}`);
    // Will be implemented with Supabase
  };

  const handleSettingsClick = (id: number) => {
    console.log(`Settings for automation ${id}`);
    navigate(`/flows/${id}/settings`);
  };

  const handleRetry = (id: number) => {
    console.log(`Retry automation ${id}`);
    // Will be implemented with Supabase
  };

  const handleReconnect = (id: number) => {
    console.log(`Reconnect automation ${id}`);
    // Will be implemented with Supabase
  };

  const getStatusStats = () => {
    return {
      total: automations.length,
      active: automations.filter(a => a.status === 'active').length,
      paused: automations.filter(a => a.status === 'paused').length,
      error: automations.filter(a => a.status === 'error').length
    };
  };

  const stats = getStatusStats();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSkeleton type="page-header" />
        <LoadingSkeleton type="filters" />
        <LoadingSkeleton type="cards" count={3} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Automations</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your personal automation flows
          </p>
        </div>
        <Button onClick={() => navigate('/create-flow')} className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Flow
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Workflow className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Flows</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <Pause className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.paused}</p>
                <p className="text-sm text-muted-foreground">Paused</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.error}</p>
                <p className="text-sm text-muted-foreground">Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-input bg-background px-3 py-2 rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      {/* Automations List */}
      {filteredAutomations.length === 0 ? (
        <EmptyState
          icon={Workflow}
          title={searchQuery || statusFilter !== "all" ? "No automations found" : "No automations yet"}
          description={
            searchQuery || statusFilter !== "all" 
              ? "Try adjusting your search or filters"
              : "Create your first automation to get started with workflow automation"
          }
          actionLabel="Create New Flow"
          onAction={() => navigate('/create-flow')}
        />
      ) : (
        <div className="space-y-4">
          {filteredAutomations.map((automation) => (
            <FlowCardWithErrorHandling
              key={automation.id}
              flow={automation}
              onToggle={handleToggleAutomation}
              onSettings={handleSettingsClick}
              onRetry={handleRetry}
              onReconnect={handleReconnect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAutomations;

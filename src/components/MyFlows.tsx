
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Pause, 
  Settings, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Unplug
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DestructiveConfirmationModal from "./DestructiveConfirmationModal";

const MyFlows = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<{ id: number; name: string } | null>(null);

  const flows = [
    {
      id: 1,
      name: "Email to Drive Backup",
      description: "Automatically save email attachments to Google Drive",
      status: "active",
      lastRun: "2 hours ago",
      totalRuns: 45,
      successRate: 98
    },
    {
      id: 2,
      name: "Slack Notifications",
      description: "Send important updates to team Slack channel",
      status: "paused",
      lastRun: "1 day ago",
      totalRuns: 23,
      successRate: 100
    },
    {
      id: 3,
      name: "Data Sync Process",
      description: "Synchronize data between different platforms",
      status: "error",
      lastRun: "3 hours ago",
      totalRuns: 12,
      successRate: 85
    }
  ];

  const handleFlowClick = (flowId: number) => {
    navigate(`/flow/${flowId}`);
  };

  const handleEditFlow = (flowId: number, flowName: string) => {
    console.log(`Editing flow ${flowId}: ${flowName}`);
    // Navigate to edit page or open edit modal
  };

  const handleDeleteFlow = (flowId: number, flowName: string) => {
    setSelectedFlow({ id: flowId, name: flowName });
    setShowDeleteModal(true);
  };

  const handleDisconnectService = () => {
    setShowDisconnectModal(true);
  };

  const handleDuplicateFlow = (flowId: number, flowName: string) => {
    console.log(`Duplicating flow ${flowId}: ${flowName}`);
    // Create duplicate
  };

  const confirmDeleteFlow = () => {
    if (selectedFlow) {
      console.log(`Deleting flow ${selectedFlow.id}: ${selectedFlow.name}`);
      // Actual delete logic would go here
    }
    setShowDeleteModal(false);
    setSelectedFlow(null);
  };

  const confirmDisconnectService = () => {
    console.log('Disconnecting Google service');
    // Actual disconnect logic would go here
    setShowDisconnectModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'error': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredFlows = flows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || flow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="p-6 space-y-6 bg-background">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Flows</h1>
            <p className="text-muted-foreground">Manage and monitor your automation flows</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/create-flow')}>
              Create New Flow
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDisconnectService}
              className="text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <Unplug className="w-4 h-4 mr-2" />
              Disconnect Google
            </Button>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search flows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "paused", "error"].map(status => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                <Filter className="w-4 h-4 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredFlows.map(flow => (
            <Card key={flow.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1" onClick={() => handleFlowClick(flow.id)}>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center relative">
                      <Play className="w-6 h-6 text-primary" />
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(flow.status)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{flow.name}</h3>
                        <Badge variant={getStatusBadge(flow.status) as any}>
                          {flow.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{flow.description}</p>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <span>Last run: {flow.lastRun}</span>
                        <span>Total runs: {flow.totalRuns}</span>
                        <span>Success rate: {flow.successRate}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle flow status
                      }}
                    >
                      {flow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditFlow(flow.id, flow.name)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateFlow(flow.id, flow.name)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteFlow(flow.id, flow.name)} 
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <DestructiveConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={confirmDeleteFlow}
        type="delete-flow"
        itemName={selectedFlow?.name || ""}
        requireNameConfirmation={true}
      />

      <DestructiveConfirmationModal
        open={showDisconnectModal}
        onOpenChange={setShowDisconnectModal}
        onConfirm={confirmDisconnectService}
        type="disconnect-service"
        itemName="Google Account"
        serviceName="Google"
        requireNameConfirmation={false}
      />
    </>
  );
};

export default MyFlows;

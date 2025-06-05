
import { Plus, Play, Pause, MoreHorizontal, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyAutomations = () => {
  const automations = [
    {
      id: 1,
      name: "Email to Drive - Invoices",
      description: "Save invoice attachments to Drive",
      status: "paused",
      lastRun: "2 hours ago",
      executions: 124,
      success: "98%"
    },
    {
      id: 2,
      name: "Slack Notifications",
      description: "Send important emails to Slack",
      status: "active",
      lastRun: "5 minutes ago",
      executions: 89,
      success: "100%"
    },
    {
      id: 3,
      name: "Contact Form to CRM",
      description: "Add website contacts to CRM",
      status: "active",
      lastRun: "1 hour ago",
      executions: 45,
      success: "96%"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Automations</h1>
          <p className="text-gray-400">Manage and monitor your active automations.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <div key={automation.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{automation.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    automation.status === 'active' 
                      ? 'bg-green-900 text-green-300 border border-green-700'
                      : 'bg-red-900 text-red-300 border border-red-700'
                  }`}>
                    {automation.status}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{automation.description}</p>
                
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <span className="text-gray-500">Last Run</span>
                    <div className="text-white font-medium">{automation.lastRun}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Executions</span>
                    <div className="text-white font-medium">{automation.executions}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Success Rate</span>
                    <div className="text-white font-medium">{automation.success}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  {automation.status === 'active' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  <Activity className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAutomations;

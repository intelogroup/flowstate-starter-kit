
import { Search, Plus, TrendingUp, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search..." 
              className="pl-10 w-80 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-white">John Doe</div>
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✨</span>
          </div>
          <span className="text-blue-200">
            New! You can now request custom templates directly from the dashboard. Check out 'Request Template'!
          </span>
        </div>
        <button className="text-blue-400 hover:text-blue-300">×</button>
      </div>

      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John</h1>
          <p className="text-gray-400">Here's what's happening with your automations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-medium">Active Automations</h3>
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">8</div>
            <div className="text-sm text-green-400">+2 from last month</div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-medium">Executions This Month</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">1,284</div>
            <div className="text-sm text-gray-400">127 / 500 limit</div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-medium">Success Rate</h3>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">98.5%</div>
            <div className="text-sm text-green-400">+0.5% from last week</div>
          </div>
        </div>
      </div>

      {/* Attention Required */}
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-red-400 font-semibold text-lg">Attention Required</h3>
              <div className="mt-2 text-gray-300">
                <p className="font-medium">Gmail access expired for "Email to Drive - Invoices"</p>
                <p className="text-gray-400 text-sm mt-1">This automation has been paused</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/50">
            Reconnect Gmail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

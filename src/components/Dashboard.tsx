
import EnhancedDashboard from "./EnhancedDashboard";

interface DashboardProps {
  onNavigate?: (section: string, filter?: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  return <EnhancedDashboard onNavigate={onNavigate} />;
};

export default Dashboard;

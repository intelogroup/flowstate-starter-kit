
import { DashboardContainer } from "@/features/dashboard";

interface DashboardProps {
  onNavigate: (section: string, filter?: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  return <DashboardContainer />;
};

export default Dashboard;

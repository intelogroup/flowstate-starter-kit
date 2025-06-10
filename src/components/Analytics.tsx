
import { AnalyticsContainer } from "@/features/analytics";

interface AnalyticsProps {
  initialFilter?: string;
}

const Analytics = ({ initialFilter }: AnalyticsProps) => {
  return <AnalyticsContainer initialFilter={initialFilter} />;
};

export default Analytics;

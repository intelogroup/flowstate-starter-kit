
import { AutomationContainer } from '@/features/automations';

const MyAutomations = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Automations</h1>
        <p className="text-muted-foreground">Manage and monitor your automated workflows</p>
      </div>
      <AutomationContainer />
    </div>
  );
};

export default MyAutomations;

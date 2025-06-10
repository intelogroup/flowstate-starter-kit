
import FlowCard from "./FlowCard";
import { Flow, FlowActions } from "../types";

interface FlowsListProps extends FlowActions {
  flows: Flow[];
}

const FlowsList = ({ flows, ...actions }: FlowsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {flows.map(flow => (
        <FlowCard
          key={flow.id}
          flow={flow}
          {...actions}
        />
      ))}
    </div>
  );
};

export default FlowsList;

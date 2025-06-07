
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FlowFilters = () => {
  return (
    <div className="flex items-center gap-4">
      <Input 
        placeholder="Search flows..." 
        className="max-w-md"
      />
      <Button variant="outline">All Status</Button>
      <Button variant="outline">All Triggers</Button>
    </div>
  );
};

export default FlowFilters;

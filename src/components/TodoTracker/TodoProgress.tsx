
import { TodoPhase } from '@/types/todo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface TodoProgressProps {
  phases: TodoPhase[];
  overallProgress: {
    total: number;
    completed: number;
    percentage: number;
  };
}

const TodoProgress = ({ phases, overallProgress }: TodoProgressProps) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            FlowState Implementation Progress
            <Badge variant="secondary" className="text-sm">
              {overallProgress.completed}/{overallProgress.total} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall completion</span>
              <span className="font-medium">{overallProgress.percentage}%</span>
            </div>
            <Progress 
              value={overallProgress.percentage} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Phase Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phases.map(phase => {
          const percentage = phase.totalItems > 0 
            ? Math.round((phase.completedItems / phase.totalItems) * 100) 
            : 0;
          
          return (
            <Card key={phase.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <div>
                    <div className="font-medium">{phase.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">
                      {phase.weeks}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {phase.completedItems}/{phase.totalItems}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{phase.description}</span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TodoProgress;

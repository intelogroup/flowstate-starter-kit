
import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { TodoItem } from '@/types/todo';
import TodoProgress from './TodoProgress';
import TodoFilters from './TodoFilters';
import TodoCard from './TodoCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TodoTracker = () => {
  const { 
    todos, 
    phases, 
    filters, 
    progress, 
    toggleTodo, 
    updateFilters, 
    clearFilters 
  } = useTodos();

  const [selectedPhase, setSelectedPhase] = useState<string>('');

  const handleToggleTodo = (id: string) => {
    toggleTodo(id);
  };

  const handleEditTodo = (todo: TodoItem) => {
    console.log('Edit todo:', todo);
    // TODO: Implement edit modal
  };

  const handleDeleteTodo = (id: string) => {
    console.log('Delete todo:', id);
    // TODO: Implement delete confirmation
  };

  const groupedTodos = todos.reduce((groups, todo) => {
    const key = `${todo.phase}-week-${todo.week}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(todo);
    return groups;
  }, {} as Record<string, TodoItem[]>);

  const getWeekTitle = (phase: string, week: number) => {
    const phaseNames = {
      foundation: 'Foundation & MVP',
      templates: 'Template System', 
      'ai-integration': 'AI Integration'
    };
    return `${phaseNames[phase as keyof typeof phaseNames]} - Week ${week}`;
  };

  const getPendingTodos = () => todos.filter(todo => !todo.completed);
  const getHighPriorityTodos = () => todos.filter(todo => !todo.completed && todo.priority === 'high');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">FlowState Implementation Tracker</h1>
          <p className="text-muted-foreground">
            Track progress on the FlowState automation platform development
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Todo
        </Button>
      </div>

      {/* Progress Overview */}
      <TodoProgress phases={phases} overallProgress={progress} />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{getPendingTodos().length}</div>
                <div className="text-sm text-muted-foreground">Pending Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold">{getHighPriorityTodos().length}</div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{progress.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <TodoFilters 
        filters={filters}
        onUpdateFilters={updateFilters}
        onClearFilters={clearFilters}
      />

      {/* Todos by Week */}
      <div className="space-y-6">
        {Object.entries(groupedTodos)
          .sort(([a], [b]) => {
            const [phaseA, , weekA] = a.split('-');
            const [phaseB, , weekB] = b.split('-');
            
            const phaseOrder = { foundation: 1, templates: 2, 'ai-integration': 3 };
            const phaseComparison = phaseOrder[phaseA as keyof typeof phaseOrder] - phaseOrder[phaseB as keyof typeof phaseOrder];
            
            if (phaseComparison !== 0) return phaseComparison;
            return parseInt(weekA) - parseInt(weekB);
          })
          .map(([groupKey, weekTodos]) => {
            const [phase, , week] = groupKey.split('-');
            const weekNumber = parseInt(week);
            
            return (
              <Card key={groupKey}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{getWeekTitle(phase, weekNumber)}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        {weekTodos.filter(t => t.completed).length}/{weekTodos.length} completed
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={
                          phase === 'foundation' ? 'border-blue-500' :
                          phase === 'templates' ? 'border-green-500' :
                          'border-purple-500'
                        }
                      >
                        {phase.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {weekTodos.map(todo => (
                      <TodoCard
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggleTodo}
                        onEdit={handleEditTodo}
                        onDelete={handleDeleteTodo}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {todos.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No todos found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TodoTracker;

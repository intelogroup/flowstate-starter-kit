
import { useState } from 'react';
import { TodoItem } from '@/types/todo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, User, Tag } from 'lucide-react';

interface TodoCardProps {
  todo: TodoItem;
  onToggle: (id: string) => void;
  onEdit: (todo: TodoItem) => void;
  onDelete: (id: string) => void;
}

const TodoCard = ({ todo, onToggle, onEdit, onDelete }: TodoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'foundation': return 'bg-blue-100 text-blue-800';
      case 'templates': return 'bg-green-100 text-green-800';
      case 'ai-integration': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${todo.completed ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 
                className={`font-medium text-sm leading-tight cursor-pointer hover:text-primary ${
                  todo.completed ? 'line-through text-muted-foreground' : ''
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {todo.title}
              </h3>
              <div className="flex gap-1 flex-shrink-0">
                <Badge className={getPriorityColor(todo.priority)} variant="secondary">
                  {todo.priority}
                </Badge>
                <Badge className={getPhaseColor(todo.phase)} variant="secondary">
                  Week {todo.week}
                </Badge>
              </div>
            </div>
            
            {todo.description && (
              <p className={`text-xs text-muted-foreground mt-1 ${
                !isExpanded ? 'line-clamp-2' : ''
              }`}>
                {todo.description}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-3">
          {/* Tags */}
          {todo.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3 h-3 text-muted-foreground" />
              {todo.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            {todo.estimatedHours && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {todo.estimatedHours}h estimated
              </div>
            )}
            
            {todo.assignee && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {todo.assignee}
              </div>
            )}
            
            {todo.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(todo.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onEdit(todo)}
              className="text-xs"
            >
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onDelete(todo.id)}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default TodoCard;

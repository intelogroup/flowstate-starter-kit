
import { useState, useEffect } from 'react';
import { TodoItem, TodoPhase, TodoFilters } from '@/types/todo';
import { todoService } from '@/shared/services/todoService';

export const useTodos = (initialFilters: TodoFilters = {}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [phases, setPhases] = useState<TodoPhase[]>([]);
  const [filters, setFilters] = useState<TodoFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = () => {
    setTodos(todoService.getTodos());
    setPhases(todoService.getPhases());
  };

  useEffect(() => {
    refreshData();
    setIsLoading(false);
  }, []);

  const filteredTodos = todoService.filterTodos(filters);

  const addTodo = (todo: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    todoService.addTodo(todo);
    refreshData();
  };

  const updateTodo = (id: string, updates: Partial<TodoItem>) => {
    todoService.updateTodo(id, updates);
    refreshData();
  };

  const deleteTodo = (id: string) => {
    todoService.deleteTodo(id);
    refreshData();
  };

  const toggleTodo = (id: string) => {
    todoService.toggleTodo(id);
    refreshData();
  };

  const updateFilters = (newFilters: Partial<TodoFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const progress = todoService.getProgress();

  return {
    todos: filteredTodos,
    allTodos: todos,
    phases,
    filters,
    isLoading,
    progress,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    updateFilters,
    clearFilters,
    refreshData
  };
};

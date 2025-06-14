import { TodoItem, TodoPhase, TodoFilters } from '@/types/todo';

class TodoService {
  private storageKey = 'flowstate_todos';
  private phaseStorageKey = 'flowstate_phases';

  // Initialize with FlowState implementation plan data
  private defaultTodos: TodoItem[] = [
    // Phase 1: Foundation (Weeks 1-3)
    {
      id: '1',
      title: 'Rename project to FlowState',
      description: 'Update all branding/naming references across the codebase',
      completed: false,
      phase: 'foundation',
      week: 1,
      priority: 'high',
      tags: ['branding', 'setup'],
      estimatedHours: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Setup Supabase project integration',
      description: 'Connect Lovable project to Supabase using native integration',
      completed: false,
      phase: 'foundation',
      week: 1,
      priority: 'high',
      tags: ['backend', 'setup'],
      estimatedHours: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Configure Supabase authentication',
      description: 'Setup email/password authentication with Supabase',
      completed: false,
      phase: 'foundation',
      week: 1,
      priority: 'high',
      tags: ['auth', 'backend'],
      dependencies: ['2'],
      estimatedHours: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Create initial database schema',
      description: 'Design and implement core database tables for FlowState',
      completed: false,
      phase: 'foundation',
      week: 1,
      priority: 'high',
      tags: ['database', 'schema'],
      dependencies: ['2'],
      estimatedHours: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Week 2
    {
      id: '5',
      title: 'Implement Supabase Auth integration',
      description: 'Replace mock auth with real Supabase authentication',
      completed: false,
      phase: 'foundation',
      week: 2,
      priority: 'high',
      tags: ['auth', 'integration'],
      dependencies: ['3'],
      estimatedHours: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Update navigation for FlowState context',
      description: 'Redesign navigation to reflect automation platform context',
      completed: false,
      phase: 'foundation',
      week: 2,
      priority: 'medium',
      tags: ['ui', 'navigation'],
      estimatedHours: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '7',
      title: 'Create basic dashboard layout',
      description: 'Build core dashboard structure for automation management',
      completed: false,
      phase: 'foundation',
      week: 2,
      priority: 'medium',
      tags: ['ui', 'dashboard'],
      estimatedHours: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '8',
      title: 'Setup user profile management',
      description: 'Implement user profile creation and management features',
      completed: false,
      phase: 'foundation',
      week: 2,
      priority: 'medium',
      tags: ['user', 'profile'],
      dependencies: ['5'],
      estimatedHours: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Week 3
    {
      id: '9',
      title: 'Create n8n API client service',
      description: 'Build service layer for n8n API communication',
      completed: false,
      phase: 'foundation',
      week: 3,
      priority: 'high',
      tags: ['n8n', 'api', 'integration'],
      estimatedHours: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '10',
      title: 'Implement credential management system',
      description: 'Build secure system for managing OAuth and API credentials',
      completed: false,
      phase: 'foundation',
      week: 3,
      priority: 'high',
      tags: ['security', 'credentials'],
      estimatedHours: 16,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Phase 2: Template System
    {
      id: '11',
      title: 'Design flow_templates table schema',
      description: 'Create comprehensive database schema for template management',
      completed: false,
      phase: 'templates',
      week: 4,
      priority: 'high',
      tags: ['database', 'templates'],
      estimatedHours: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '12',
      title: 'Create template CRUD operations',
      description: 'Implement create, read, update, delete operations for templates',
      completed: false,
      phase: 'templates',
      week: 4,
      priority: 'high',
      tags: ['templates', 'crud'],
      dependencies: ['11'],
      estimatedHours: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Phase 3: AI Integration
    {
      id: '13',
      title: 'Setup OpenAI integration',
      description: 'Configure OpenAI API for AI-powered flow generation',
      completed: false,
      phase: 'ai-integration',
      week: 7,
      priority: 'high',
      tags: ['ai', 'openai', 'integration'],
      estimatedHours: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '14',
      title: 'Create AI interpretation Edge Function',
      description: 'Build Supabase Edge Function for processing AI conversations',
      completed: false,
      phase: 'ai-integration',
      week: 7,
      priority: 'high',
      tags: ['ai', 'edge-functions'],
      dependencies: ['13'],
      estimatedHours: 14,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  private defaultPhases: TodoPhase[] = [
    {
      id: 'foundation',
      name: 'Foundation & MVP',
      description: 'Project setup, authentication, and core infrastructure',
      weeks: 'Weeks 1-3',
      color: 'bg-blue-500',
      totalItems: 0,
      completedItems: 0
    },
    {
      id: 'templates',
      name: 'Template System',
      description: 'Template library, dynamic forms, and workflow provisioning',
      weeks: 'Weeks 4-6',
      color: 'bg-green-500',
      totalItems: 0,
      completedItems: 0
    },
    {
      id: 'ai-integration',
      name: 'AI Integration',
      description: 'Conversational interface and AI-powered flow generation',
      weeks: 'Weeks 7-10',
      color: 'bg-purple-500',
      totalItems: 0,
      completedItems: 0
    }
  ];

  getTodos(): TodoItem[] {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
      }
    }
    
    // Initialize with default todos
    this.saveTodos(this.defaultTodos);
    return this.defaultTodos;
  }

  getPhases(): TodoPhase[] {
    const todos = this.getTodos();
    const phases = [...this.defaultPhases];
    
    // Calculate counts for each phase
    phases.forEach(phase => {
      const phaseItems = todos.filter(todo => todo.phase === phase.id);
      phase.totalItems = phaseItems.length;
      phase.completedItems = phaseItems.filter(todo => todo.completed).length;
    });
    
    return phases;
  }

  saveTodos(todos: TodoItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  addTodo(todo: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>): TodoItem {
    const todos = this.getTodos();
    const newTodo: TodoItem = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    this.saveTodos(todos);
    return newTodo;
  }

  updateTodo(id: string, updates: Partial<TodoItem>): TodoItem | null {
    const todos = this.getTodos();
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index === -1) return null;
    
    todos[index] = {
      ...todos[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveTodos(todos);
    return todos[index];
  }

  deleteTodo(id: string): boolean {
    const todos = this.getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    if (filteredTodos.length === todos.length) return false;
    
    this.saveTodos(filteredTodos);
    return true;
  }

  toggleTodo(id: string): TodoItem | null {
    const todos = this.getTodos();
    const todo = todos.find(t => t.id === id);
    
    if (!todo) return null;
    
    return this.updateTodo(id, { completed: !todo.completed });
  }

  filterTodos(filters: TodoFilters): TodoItem[] {
    const todos = this.getTodos();
    
    return todos.filter(todo => {
      if (filters.phase && todo.phase !== filters.phase) return false;
      if (filters.completed !== undefined && todo.completed !== filters.completed) return false;
      if (filters.priority && todo.priority !== filters.priority) return false;
      if (filters.assignee && todo.assignee !== filters.assignee) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return todo.title.toLowerCase().includes(searchLower) ||
               todo.description?.toLowerCase().includes(searchLower) ||
               todo.tags.some(tag => tag.toLowerCase().includes(searchLower));
      }
      return true;
    });
  }

  getProgress(): { total: number; completed: number; percentage: number } {
    const todos = this.getTodos();
    const completed = todos.filter(todo => todo.completed).length;
    const total = todos.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, percentage };
  }
}

export const todoService = new TodoService();

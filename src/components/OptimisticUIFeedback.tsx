
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, Bell } from 'lucide-react';

interface OptimisticItem {
  id: string;
  name: string;
  status: 'synced' | 'pending' | 'error';
  isOptimistic?: boolean;
}

export const OptimisticUIDemo = () => {
  const [items, setItems] = useState<OptimisticItem[]>([
    { id: '1', name: 'Welcome Email Template', status: 'synced' },
    { id: '2', name: 'Order Confirmation Flow', status: 'synced' },
  ]);

  const addItem = async () => {
    const optimisticId = `temp-${Date.now()}`;
    const newItem: OptimisticItem = {
      id: optimisticId,
      name: `New Flow ${Date.now()}`,
      status: 'pending',
      isOptimistic: true,
    };

    // Optimistically add the item
    setItems(prev => [...prev, newItem]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure
      if (Math.random() > 0.3) {
        // Success: replace optimistic item with real one
        setItems(prev => prev.map(item => 
          item.id === optimisticId 
            ? { ...item, id: `real-${Date.now()}`, status: 'synced', isOptimistic: false }
            : item
        ));
      } else {
        // Error: mark item as failed
        setItems(prev => prev.map(item => 
          item.id === optimisticId 
            ? { ...item, status: 'error' }
            : item
        ));
      }
    } catch (error) {
      // Handle error by marking item as failed
      setItems(prev => prev.map(item => 
        item.id === optimisticId 
          ? { ...item, status: 'error' }
          : item
      ));
    }
  };

  const retryItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: 'pending' }
        : item
    ));

    // Simulate retry logic
    setTimeout(() => {
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, status: Math.random() > 0.5 ? 'synced' : 'error' }
          : item
      ));
    }, 1500);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'synced': return <Badge variant="secondary" className="text-green-700">Synced</Badge>;
      case 'pending': return <Badge variant="secondary" className="text-blue-700">Syncing...</Badge>;
      case 'error': return <Badge variant="destructive">Failed</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Optimistic UI Demo
          <Button onClick={addItem} size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Add Flow
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className={`flex items-center justify-between p-3 border rounded-lg ${
              item.isOptimistic ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200' : ''
            }`}>
              <div className="flex items-center gap-3">
                {getStatusIcon(item.status)}
                <span className={item.isOptimistic ? 'text-blue-700 dark:text-blue-300' : ''}>
                  {item.name}
                </span>
                {getStatusBadge(item.status)}
              </div>
              <div className="flex gap-2">
                {item.status === 'error' && (
                  <Button variant="outline" size="sm" onClick={() => retryItem(item.id)}>
                    Retry
                  </Button>
                )}
                {item.status === 'error' && (
                  <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            Optimistic UI Benefits
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• <strong>Immediate Feedback:</strong> UI updates instantly without waiting for server</li>
            <li>• <strong>Better Perceived Performance:</strong> App feels faster and more responsive</li>
            <li>• <strong>Error Handling:</strong> Failed operations are clearly marked with retry options</li>
            <li>• <strong>Visual Distinction:</strong> Pending items are visually distinguished</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

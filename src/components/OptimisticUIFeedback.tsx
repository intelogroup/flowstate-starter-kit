
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, AlertCircle, Loader, RefreshCw, Wifi, WifiOff, CloudSync } from 'lucide-react';
import { cn } from '@/lib/utils';

// Optimistic UI state types
type SyncState = 'synced' | 'pending' | 'failed' | 'offline';

interface OptimisticItem {
  id: string;
  name: string;
  isActive: boolean;
  syncState: SyncState;
  pendingChanges?: Partial<OptimisticItem>;
}

// Sync status indicator component
export const SyncStatusIndicator = ({ 
  state, 
  className 
}: { 
  state: SyncState; 
  className?: string; 
}) => {
  const getStatusConfig = (state: SyncState) => {
    switch (state) {
      case 'synced':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-100 dark:bg-green-900/20',
          label: 'Synced'
        };
      case 'pending':
        return {
          icon: Loader,
          color: 'text-blue-600',
          bg: 'bg-blue-100 dark:bg-blue-900/20',
          label: 'Syncing...',
          animate: 'animate-spin'
        };
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bg: 'bg-red-100 dark:bg-red-900/20',
          label: 'Sync Failed'
        };
      case 'offline':
        return {
          icon: WifiOff,
          color: 'text-gray-600',
          bg: 'bg-gray-100 dark:bg-gray-900/20',
          label: 'Offline'
        };
    }
  };

  const config = getStatusConfig(state);
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium",
      config.bg,
      config.color,
      className
    )}>
      <Icon className={cn("w-3 h-3", config.animate)} />
      {config.label}
    </div>
  );
};

// Optimistic list item component
export const OptimisticListItem = ({
  item,
  onToggle,
  onRetry
}: {
  item: OptimisticItem;
  onToggle: (id: string, newValue: boolean) => void;
  onRetry: (id: string) => void;
}) => {
  const isPending = item.syncState === 'pending';
  const hasFailed = item.syncState === 'failed';
  const displayValue = item.pendingChanges?.isActive ?? item.isActive;

  return (
    <Card className={cn(
      "transition-all duration-200",
      isPending && "opacity-75",
      hasFailed && "border-red-200 bg-red-50/50 dark:bg-red-950/20"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-2 h-2 rounded-full transition-colors",
              displayValue ? "bg-green-500" : "bg-gray-300"
            )} />
            <span className={cn(
              "font-medium transition-opacity",
              isPending && "opacity-60"
            )}>
              {item.name}
            </span>
            {item.pendingChanges && (
              <Badge variant="outline" className="text-xs">
                <CloudSync className="w-3 h-3 mr-1" />
                Updating
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <SyncStatusIndicator state={item.syncState} />
            
            <Switch
              checked={displayValue}
              onCheckedChange={(checked) => onToggle(item.id, checked)}
              disabled={isPending}
            />
            
            {hasFailed && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRetry(item.id)}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Demo component showing optimistic UI patterns
export const OptimisticUIDemo = () => {
  const [items, setItems] = useState<OptimisticItem[]>([
    { id: '1', name: 'Email Notifications', isActive: true, syncState: 'synced' },
    { id: '2', name: 'Daily Backups', isActive: false, syncState: 'synced' },
    { id: '3', name: 'Auto Updates', isActive: true, syncState: 'synced' },
  ]);

  const [isOnline, setIsOnline] = useState(true);

  // Simulate network connection status
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly simulate going offline for demo
      if (Math.random() < 0.1) {
        setIsOnline(false);
        setTimeout(() => setIsOnline(true), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const simulateAsyncUpdate = (itemId: string, newValue: boolean): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!isOnline) {
          reject(new Error('Network error'));
          return;
        }
        
        // Simulate occasional failures
        if (Math.random() < 0.2) {
          reject(new Error('Server error'));
        } else {
          resolve();
        }
      }, 1000 + Math.random() * 2000);
    });
  };

  const handleToggle = async (itemId: string, newValue: boolean) => {
    // Optimistic update
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            syncState: 'pending' as const,
            pendingChanges: { isActive: newValue }
          }
        : item
    ));

    try {
      await simulateAsyncUpdate(itemId, newValue);
      
      // Success: commit the change
      setItems(prev => prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              isActive: newValue,
              syncState: 'synced' as const,
              pendingChanges: undefined
            }
          : item
      ));
    } catch (error) {
      // Failure: revert and mark as failed
      setItems(prev => prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              syncState: 'failed' as const,
              pendingChanges: undefined
            }
          : item
      ));
    }
  };

  const handleRetry = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item && item.syncState === 'failed') {
      // Retry with the current display value
      handleToggle(itemId, !item.isActive);
    }
  };

  // Simulate offline state
  useEffect(() => {
    if (!isOnline) {
      setItems(prev => prev.map(item => 
        item.syncState === 'pending' 
          ? { ...item, syncState: 'offline' as const }
          : item
      ));
    }
  }, [isOnline]);

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Optimistic UI Demo</h2>
          <p className="text-muted-foreground">
            Showing how UI updates immediately while syncing with Supabase
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium",
            isOnline 
              ? "bg-green-100 text-green-700 dark:bg-green-900/20" 
              : "bg-red-100 text-red-700 dark:bg-red-900/20"
          )}>
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOnline(!isOnline)}
          >
            Toggle Connection
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <OptimisticListItem
            key={item.id}
            item={item}
            onToggle={handleToggle}
            onRetry={handleRetry}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-semibold mb-2">How This Works:</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• <strong>Immediate feedback:</strong> UI updates instantly when you toggle switches</li>
          <li>• <strong>Sync indicators:</strong> Shows when changes are being saved to Supabase</li>
          <li>• <strong>Error handling:</strong> Failed operations can be retried</li>
          <li>• <strong>Offline support:</strong> Changes queue when connection is lost</li>
        </ul>
      </div>
    </div>
  );
};

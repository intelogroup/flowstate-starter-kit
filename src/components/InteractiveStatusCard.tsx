
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Activity, TrendingUp, TrendingDown, Play, Pause, Settings, MoreHorizontal, RefreshCw } from 'lucide-react';

interface InteractiveStatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  status?: 'active' | 'inactive' | 'warning' | 'error' | 'success';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  progress?: number;
  toggleable?: boolean;
  actionable?: boolean;
  refreshable?: boolean;
  onToggle?: (enabled: boolean) => void;
  onAction?: () => void;
  onRefresh?: () => void;
  className?: string;
}

const InteractiveStatusCard = ({
  title,
  value,
  description,
  status = 'active',
  trend = 'neutral',
  trendValue,
  progress,
  toggleable = false,
  actionable = false,
  refreshable = false,
  onToggle,
  onAction,
  onRefresh,
  className
}: InteractiveStatusCardProps) => {
  const [isEnabled, setIsEnabled] = useState(status === 'active');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleToggle = (enabled: boolean) => {
    setIsEnabled(enabled);
    onToggle?.(enabled);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'inactive': return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-600" />;
      default: return <Activity className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor()}>
            {status}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {refreshable && (
                <DropdownMenuItem onClick={handleRefresh}>
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Refresh
                </DropdownMenuItem>
              )}
              {actionable && (
                <DropdownMenuItem onClick={onAction}>
                  <Settings className="h-3 w-3 mr-2" />
                  Configure
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{value}</div>
            {toggleable && (
              <div className="flex items-center gap-2">
                <Switch
                  checked={isEnabled}
                  onCheckedChange={handleToggle}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={onAction}
                >
                  {isEnabled ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
              </div>
            )}
          </div>
          
          {trendValue && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {getTrendIcon()}
              <span className={trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : ''}>
                {trendValue}
              </span>
              <span>vs last period</span>
            </div>
          )}
          
          {progress !== undefined && (
            <div className="space-y-1">
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-muted-foreground">{progress}% complete</div>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          
          {actionable && (
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={onAction}>
                Configure
              </Button>
              {refreshable && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveStatusCard;

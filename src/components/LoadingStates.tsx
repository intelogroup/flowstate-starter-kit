
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader } from "lucide-react";

// Skeleton loaders for different content types
export const AutomationCardSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 border-b">
    <Skeleton className="h-4 w-4" />
    <Skeleton className="h-4 flex-1" />
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-8 w-8" />
  </div>
);

export const StatsCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-32" />
      </div>
    </CardContent>
  </Card>
);

export const ListItemSkeleton = () => (
  <div className="flex items-center space-x-3 p-3 border-b">
    <Skeleton className="h-8 w-8 rounded-full" />
    <div className="space-y-1 flex-1">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
    <Skeleton className="h-6 w-16" />
  </div>
);

// Page-level loading components
interface PageLoadingProps {
  message?: string;
}

export const PageLoading = ({ message = "Loading..." }: PageLoadingProps) => (
  <div className="flex items-center justify-center min-h-64 flex-col space-y-4">
    <Loader className="h-8 w-8 animate-spin text-primary" />
    <p className="text-muted-foreground">{message}</p>
  </div>
);

export const SectionLoading = ({ message = "Loading..." }: PageLoadingProps) => (
  <div className="flex items-center justify-center py-12 flex-col space-y-3">
    <Loader className="h-6 w-6 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

// Grid skeleton layouts
export const AutomationGridSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <AutomationCardSkeleton key={i} />
    ))}
  </div>
);

export const StatsGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <StatsCardSkeleton key={i} />
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-0 border rounded-lg">
    {Array.from({ length: rows }).map((_, i) => (
      <TableRowSkeleton key={i} />
    ))}
  </div>
);

import { Skeleton } from "@/components/ui/skeleton";

export const PageLoadingFallback = () => {
  return (
    <div className="w-full h-full min-h-[400px] p-6 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-3 mt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-20" />
            <Skeleton className="h-12 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

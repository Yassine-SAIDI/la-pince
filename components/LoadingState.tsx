import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  type?: "table" | "card" | "stats" | "chart";
  rows?: number;
}

export default function LoadingState({
  type = "card",
  rows = 3,
}: LoadingStateProps) {
  switch (type) {
    case "table":
      return (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      );

    case "stats":
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      );

    case "chart":
      return <Skeleton className="h-[300px] w-full" />;

    default:
      return (
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      );
  }
}

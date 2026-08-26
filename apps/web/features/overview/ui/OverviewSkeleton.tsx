import { Card, CardContent, CardHeader } from "@/shared/components/Card";
import { Skeleton } from "@/shared/components/Skeleton";

export function OverviewSkeleton() {
  return (
    <div className="grid gap-4 md:gap-6">
      <Card className="min-h-36 shadow-sm">
        <CardHeader className="gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-56" />
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="shadow-xs">
            <CardHeader className="gap-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-7 w-28" />
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="shadow-xs">
        <CardHeader className="gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-72 w-full rounded-lg" />
        </CardContent>
      </Card>

      <Card className="shadow-xs">
        <CardHeader className="gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-56" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
}

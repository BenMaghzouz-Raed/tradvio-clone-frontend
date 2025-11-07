import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function StatsCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Card className="p-2 md:p-4 flex flex-col gap-2 bg-accent w-40 md:w-64">
      <h6 className="text-sm md:text-sm font-normal text-muted-foreground">
        {label}
      </h6>
      <h3 className="text-xl md:text-2xl font-semibold">{value}</h3>
    </Card>
  );
}

export function StatsCardLoader() {
  return (
    <Card className="p-4 flex flex-col gap-2 bg-accent w-64">
      <Skeleton className="h-3 md:h-4 w-16 bg-loading-background" />
      <Skeleton className="h-6 md:h-8 w-32 bg-loading-background" />
    </Card>
  );
}

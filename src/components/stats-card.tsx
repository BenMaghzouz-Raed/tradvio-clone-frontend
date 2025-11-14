import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "neutral" | "success" | "warning" | "error";
  loading?: boolean;
  className?: string;
};

export default function StatsCard({
  label,
  value,
  icon,
  variant = "neutral",
  loading = false,
  className,
}: StatsCardProps) {
  if (loading) return <StatsCardLoader />;

  const variantClasses =
    variant === "success"
      ? "from-emerald-50 to-emerald-100"
      : variant === "warning"
      ? "from-amber-50 to-amber-100"
      : variant === "error"
      ? "from-rose-50 to-rose-100"
      : "from-slate-50 to-slate-100";

  return (
    <Card
      className={cn(
        "p-3 md:p-4 flex items-start gap-3 md:gap-4 w-44 md:w-64",
        "bg-gradient-to-br",
        variantClasses,
        "border border-border/60 shadow-sm",
        className
      )}
    >
      {icon ? (
        <div className="shrink-0 rounded-md bg-white/60 p-2 text-gray-700">{icon}</div>
      ) : null}
      <div className="flex flex-col gap-1">
        <h6 className="text-xs md:text-sm font-medium text-muted-foreground">{label}</h6>
        <h3 className="text-lg md:text-2xl font-semibold text-gray-900 leading-tight">{value}</h3>
      </div>
    </Card>
  );
}

export function StatsCardLoader() {
  return (
    <Card className="p-4 flex items-start gap-3 bg-accent w-64">
      <Skeleton className="h-8 w-8 rounded-md bg-loading-background" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-3 md:h-4 w-20 bg-loading-background" />
        <Skeleton className="h-6 md:h-8 w-32 bg-loading-background" />
      </div>
    </Card>
  );
}

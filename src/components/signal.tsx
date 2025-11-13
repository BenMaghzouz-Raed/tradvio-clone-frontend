import { cn } from "@/lib/utils";

const VARIANT_COLOR_MAP = {
  success: "#22C55E",
  error: "#FF383C",
  warning: "#F97316",
  neutral: "gray",
};

export function Signal({
  label,
  variant,
  className,
}: {
  label: string;
  variant: "success" | "error" | "warning" | "neutral";
  className?: string;
}) {
  return (
    <div
      className={cn("w-fit py-1 px-4 rounded-md", className)}
      style={{
        backgroundColor: VARIANT_COLOR_MAP[variant],
      }}
    >
      <h3 className="text-white">{label}</h3>
    </div>
  );
}

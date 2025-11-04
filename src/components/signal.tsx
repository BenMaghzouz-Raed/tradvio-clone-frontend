import { cn } from "@/lib/utils";

const VARIANT_COLOR_MAP = {
  success: "bg-[#22C55E]",
  error: "bg-[#FF383C]",
  warning: "bg-[#F97316]",
  neutural: "bg-[#737373]",
};

export function Signal({
  label,
  variant,
}: {
  label: string;
  variant: "success" | "error" | "warning" | "neutural";
}) {
  return (
    <div
      className={cn("w-fit py-1 px-4 rounded-md", VARIANT_COLOR_MAP[variant])}
    >
      <h3 className="text-white">{label}</h3>
    </div>
  );
}

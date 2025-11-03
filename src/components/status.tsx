import { cn } from "@/lib/utils";

const VARIANT_CONTAINER_MAP = {
  success: "bg-[#F0FDF4]",
  warning: "bg-[#FFEDD5]",
  error: "bg-[#FF383C33]",
  neutural: "bg-[#E5E5E5]",
};

const VARIANT_TEXT_MAP = {
  success: "text-[#14B8A6]",
  warning: "text-[#F97316]",
  error: "text-[#FF383C]",
  neutural: "text-[#737373]",
};

export default function Status({
  label,
  variant,
}: {
  label: string;
  variant: "success" | "error" | "warning" | "neutural";
}) {
  return (
    <div className={cn("w-fit p-2 rounded-md", VARIANT_CONTAINER_MAP[variant])}>
      <h3 className={cn("", VARIANT_TEXT_MAP[variant])}>{label}</h3>
    </div>
  );
}

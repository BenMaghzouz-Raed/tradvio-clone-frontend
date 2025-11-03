import { cn } from "@/lib/utils";

const VARIANT_CONTAINER_MAP = {
  success: "bg-teal-50 border-teal-100",
  error: "bg-[#FF383C24] border-[#FF383C33]",
  warning: "bg-orange-50 border-orange-100",
  neutural: "bg-white border-[#E5E5E5]",
};

const VARIANT_TEXT_MAP = {
  success: "text-teal-500",
  error: "text-[#FF383C]",
  warning: "text-orange-500",
  neutural: "text-[#737373]",
};

export default function Tag({
  label,
  variant,
}: {
  label: string;
  variant: "success" | "error" | "warning" | "neutural";
}) {
  return (
    <div
      className={cn(
        "border-1 w-fit p-2 rounded-md",
        VARIANT_CONTAINER_MAP[variant]
      )}
    >
      <p className={cn("font-medium text-xs ", VARIANT_TEXT_MAP[variant])}>
        {label}
      </p>
    </div>
  );
}

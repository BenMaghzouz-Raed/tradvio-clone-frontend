import { cn } from "@/lib/utils";

const VARIANT_CONTAINER_MAP = {
  success: "bg-teal-50 border-teal-100",
  error: "bg-[#FF383C24] border-[#FF383C33]",
  warning: "bg-orange-50 border-orange-100",
  neutral: "bg-white border-[#E5E5E5]",
};

const VARIANT_TEXT_MAP = {
  success: "text-teal-600",
  error: "text-[#FF383C]",
  warning: "text-orange-500",
  neutral: "text-gray",
};

export default function Tag({
  label,
  variant,
}: {
  label: string;
  variant: "success" | "error" | "warning" | "neutral";
}) {
  return (
    <div
      className={cn(
        "border w-fit px-2 py-1 rounded-md",
        VARIANT_CONTAINER_MAP[variant]
      )}
    >
      <p className={cn("font-medium text-xs", VARIANT_TEXT_MAP[variant])}>
        {label}
      </p>
    </div>
  );
}

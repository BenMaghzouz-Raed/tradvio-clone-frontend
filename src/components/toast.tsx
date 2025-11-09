import { cn } from "@/lib/utils";
import { ToastProps, ToastType } from "@/types/common-types";
import { CircleAlert, CircleCheck, TriangleAlert, X } from "lucide-react";
import { ReactNode } from "react";

const TOAST_TYPE_MAP: Record<
  ToastType,
  { icon: ReactNode; color: string; darkColor: string }
> = {
  info: {
    icon: <CircleAlert className="rounded-full p-1 bg-[#3b82f6]" size={20} />,
    color: "#3b82f6",
    darkColor: "rgb(43 54 125)",
  },
  error: {
    icon: <X className="rounded-full p-1 bg-[#ef4444]" size={20} />,
    color: "#ef4444",
    darkColor: "#513b3b",
  },

  success: {
    icon: <CircleCheck className="rounded-full p-1 bg-[#22c55e]" size={20} />,
    color: "#22c55e",
    darkColor: "rgb(45 99 42)",
  },
  warning: {
    icon: <TriangleAlert className="rounded-full p-1 bg-[#eab308]" size={20} />,
    color: "#eab308",
    darkColor: "rgb(113 107 50)",
  },
};

export default function Toast({
  toast,
  onRemove,
  className = "",
  style = {},
}: {
  toast: ToastProps;
  onRemove: () => void;
  className?: string;
  style?: object;
}) {
  return (
    <div
      key={toast.id}
      className={cn(
        `bg-gray-900 p-4 rounded-lg text-white shadow-md flex gap-3 items-center justify-between`,
        className
      )}
      style={{
        ...style,
        background: `linear-gradient(to top right, ${
          TOAST_TYPE_MAP[toast.type].darkColor
        }, #02010ff5)`,
      }}
    >
      {TOAST_TYPE_MAP[toast.type].icon}
      {toast.message}
      <X
        onClick={() => onRemove()}
        className="cursor-pointer hover:text-gray-400"
      />
    </div>
  );
}

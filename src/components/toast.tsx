import { ToastProps, ToastType } from "@/types/common-types";
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  TriangleAlert,
  X,
} from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

const TOAST_TYPE_MAP: Record<ToastType, { icon: ReactNode; color: string }> = {
  error: { icon: <CircleX />, color: "bg-red-500" },
  info: { icon: <CircleAlert />, color: "bg-blue-500" },
  success: { icon: <CircleCheck />, color: "bg-green-500" },
  warning: { icon: <TriangleAlert />, color: "bg-yellow-500" },
};

export default function Toast({
  toast,
  onRemove,
}: {
  toast: ToastProps;
  onRemove: () => void;
}) {
  return (
    <div
      key={toast.id}
      className={`px-4 py-2 rounded-lg text-white shadow-md flex gap-3 items-center ${
        TOAST_TYPE_MAP[toast.type].color
      }`}
    >
      {TOAST_TYPE_MAP[toast.type].icon}
      {toast.message}
      <Button variant="ghost" size="icon" onClick={() => onRemove()}>
        <X />
      </Button>
    </div>
  );
}

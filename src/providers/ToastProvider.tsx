import { Button } from "@/components/ui/button";
import { registerToastFn } from "@/lib/toast";
import { Toast, ToastParams, ToastType } from "@/types/common-types";
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  TriangleAlert,
  X,
} from "lucide-react";
import { createContext, useState, ReactNode, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TOAST_TYPE_MAP: Record<ToastType, { icon: ReactNode; color: string }> = {
  error: { icon: <CircleX />, color: "bg-red-500" },
  info: { icon: <CircleAlert />, color: "bg-blue-500" },
  success: { icon: <CircleCheck />, color: "bg-green-500" },
  warning: { icon: <TriangleAlert />, color: "bg-yellow-500" },
};

interface ToastContextValue {
  addToast: (toast: ToastParams) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => [...prev].filter((item) => item.id != id));
  };

  const addToast = (toast: ToastParams) => {
    const id = uuidv4();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration ?? 5000);
  };

  useEffect(() => {
    registerToastFn(addToast);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg text-white shadow-md flex gap-3 items-center ${
              TOAST_TYPE_MAP[toast.type].color
            }`}
          >
            {TOAST_TYPE_MAP[toast.type].icon}
            {toast.message}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeToast(toast.id)}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

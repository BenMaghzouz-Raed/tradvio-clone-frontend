import Toast from "@/components/toast";
import { registerToastFn } from "@/lib/toast";
import { ToastProps, ToastParams } from "@/types/common-types";
import { createContext, useState, ReactNode, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface ToastContextValue {
  addToast: (toast: ToastParams) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

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
          <Toast onRemove={() => removeToast(toast.id)} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

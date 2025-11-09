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
  const [removedId, setRemovedId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const removeToast = (id: string) => {
    setRemovedId(id);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
      setRemovedId(null);
    }, 300); // match animation duration
  };

  const addToast = (toast: ToastParams) => {
    const id = uuidv4();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    setAddedId(id);
    setTimeout(() => {
      removeToast(id);
    }, toast.duration ?? 5000);
  };

  useEffect(() => {
    registerToastFn(addToast);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((toast) => {
          const isRemoving = toast.id === removedId;
          const isNew = toast.id === addedId;
          const className = isRemoving
            ? "animate-slide-out-right"
            : isNew
            ? "animate-slide-in-right"
            : removedId
            ? "animate-slide-up"
            : "animate-slide-down";

          return (
            <div className={className}>
              <Toast onRemove={() => removeToast(toast.id)} toast={toast} />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

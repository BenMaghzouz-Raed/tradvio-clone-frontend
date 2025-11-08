export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}
export type ToastParams = Omit<ToastProps, "id">;

export type ToastFn = (toast: Omit<ToastProps, "id">) => void;

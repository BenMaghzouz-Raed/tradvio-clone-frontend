export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}
export type ToastParams = Omit<Toast, "id">;

export type ToastFn = (toast: Omit<Toast, "id">) => void;

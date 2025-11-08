import { ToastProps } from "@/types/common-types";

type ToastFn = (toast: Omit<ToastProps, "id">) => void;

let showToast: ToastFn | null = null;

export const registerToastFn = (fn: ToastFn) => {
  showToast = fn;
};

export const toastNotification = (toast: Omit<ToastProps, "id">) => {
  if (showToast) {
    showToast(toast);
  } else {
    console.warn("Toast system not initialized yet.");
  }
};

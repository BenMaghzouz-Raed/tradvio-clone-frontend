import { Toast } from "@/types/common-types";

type ToastFn = (toast: Omit<Toast, "id">) => void;

let showToast: ToastFn | null = null;

export const registerToastFn = (fn: ToastFn) => {
  showToast = fn;
};

export const toastNotification = (toast: Omit<Toast, "id">) => {
  if (showToast) {
    showToast(toast);
  } else {
    console.warn("Toast system not initialized yet.");
  }
};

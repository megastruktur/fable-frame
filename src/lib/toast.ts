import type { ToastSettings, ToastStore } from "@skeletonlabs/skeleton";

export function toastShow(message: string, toastStore: ToastStore) {

  const t: ToastSettings = {
    message: message,
    timeout: 5000
  };
  
  toastStore.trigger(t)
}

export function toastShowError(message: string, toastStore: ToastStore) {

  const t: ToastSettings = {
    message: message,
    background: "bg-error-400 z-50",
    timeout: 5000
  };
  
  toastStore.trigger(t)
}

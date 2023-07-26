import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

export default function toastShow(message: string) {
  const t: ToastSettings = {
    message: message,
    timeout: 5000
  };
  
  toastStore.trigger(t)
}

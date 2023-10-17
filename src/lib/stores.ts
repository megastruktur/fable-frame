import { writable } from "svelte/store"
import type { FieldError } from "./types";

/**
 * Edit errors store. While it is not empty - won't allow to save.
 * @returns 
 */
function createEditErrorsStore(initial: []) {
  const { subscribe, set, update } = writable<FieldError[]>(initial);

  function addError(error: string, fieldId = "") {
    update((errorStore) => {
      errorStore.push({ fieldId: fieldId, message: error })
      return errorStore
    })
  }

  function removeErrorForField(fieldId: string) {
    update((errorStore) => {
      errorStore = errorStore.filter((error) => error.fieldId!== fieldId)
      return errorStore
    })
  }

  return {
    addError,
    removeErrorForField,
    subscribe,
    set,
    update,
    reset: () => set([])
  };
}

export const fieldErrors = createEditErrorsStore([]);

export const headerBanner = writable("");

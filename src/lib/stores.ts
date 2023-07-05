import { writable } from "svelte/store"
import type { CharactersResponse } from "./pocketbase-types"
import updateCharacterFieldValue from "./updateCharacterFieldValue";


function createCharacterStore() {

  const { subscribe, set, update } = writable();

  return {
    subscribe,
    setFieldValue: (fieldName: string, fieldValue: string) => {

      update((character) => {
        return updateCharacterFieldValue(character, fieldName, fieldValue)
      })
    },
    set: (character: CharactersResponse) => set(character),
    reset: () => set({})
  };
}

export const characterStore = createCharacterStore();

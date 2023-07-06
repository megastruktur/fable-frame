import { writable } from "svelte/store"
import updateCharacterFieldValue from "./updateCharacterFieldValue";


function createCharacterStore<CharactersResponse>() {

  const { subscribe, set, update } = writable();

  function setFieldValue(fieldName: string, fieldValue: string) {
    update((character) => {
      return updateCharacterFieldValue(character, fieldName, fieldValue)
    })
  }

  return {
    subscribe,
    setFieldValue,    
    set: (character: CharactersResponse) => set(character),
    reset: () => set({})
  };
}

export const characterStore = createCharacterStore();

export const editMode = writable(false);

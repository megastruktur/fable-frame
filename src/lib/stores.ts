import { writable } from "svelte/store"
import updateCharacterFieldValue from "./updateCharacterFieldValue";
import { Collections, type CharactersResponse } from "./pocketbase-types.d";


function createCharacterStore() {

  const { subscribe, set, update } = writable<CharactersResponse>();

  function setFieldValue(fieldName: string, fieldValue: string) {
    update((character) => {
      return updateCharacterFieldValue(character, fieldName, fieldValue)
    })
  }

  return {
    subscribe,
    setFieldValue,    
    set: (character: CharactersResponse) => set(character),
    reset: () => set({
      name: "",
      rpgSystem: "",
      campaign: "",
      avatar: "",
      creator: "",
      fields: [],
      hash: "",
      id: "",
      created: "",
      updated: "",
      collectionId: "",
      collectionName: Collections.Characters
    })
  };
}

export const characterStore = createCharacterStore();

export const editMode = writable(false);

export const theme = writable("luxury");

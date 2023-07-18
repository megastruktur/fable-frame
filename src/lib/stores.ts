import { writable } from "svelte/store"
import updateCharacterFieldValue from "./updateCharacterFieldValue";
import { Collections, type CharactersResponse } from "./pocketbase-types.d";
import type { Field } from "./types";
import addCharacterField from "./addCharacterField";


function createCharacterStore() {

  const { subscribe, set, update } = writable<CharactersResponse>();

  function setFieldValue(fieldId: string, fieldValue: string) {
    update((character) => {
      return updateCharacterFieldValue(character, fieldId, fieldValue)
    })
  }

  function addField(field: Field) {
    update((character) => {
      return addCharacterField(character, field)
    })
  }

  return {
    subscribe,
    setFieldValue,    
    addField,    
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

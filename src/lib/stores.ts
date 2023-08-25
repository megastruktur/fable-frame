import { writable } from "svelte/store"
import { Collections, type CharactersResponse, type CharacterNotesResponse } from "./pocketbase-types.d";
import type { CharacterNote, Field, FieldError } from "./types";
import { addCharacterField, removeCharacterField, updateCharacterField, updateCharacterFieldValue } from "$lib/characterFieldsOperations";
import { addCharacterNote, removeCharacterNote } from "./characterNotesOperations";
import { updateCharacterNotes } from "$models/character_notes";


function createCharacterStore() {

  const { subscribe, set, update } = writable<CharactersResponse>();

  function setFieldValue(fieldId: string, fieldValue: string) {
    update((character) => {
      return updateCharacterFieldValue(character, fieldId, fieldValue)
    })
  }

  function setField(field: Field) {
    update((character) => {
      return updateCharacterField(character, field)
    })
  }

  function rename(name: string) {
    update((character) => {
      character.name = name
      return character
    })
  }

  function addField(field: Field) {
    update((character) => {
      console.log(`Adding field ${field.name} to character ${character.name}`)
      return addCharacterField(character, field)
    })
  }

  function removeField(field: Field) {
    update((character) => {
      console.log(`Removing field ${field.name} from character ${character.name}`)
      return removeCharacterField(character, field)
    })
  }

  function setAvatar(avatar: string) {
    update((character) => {
      character.avatar = avatar
      return character
    })
  }

  return {
    subscribe,
    setFieldValue,
    rename,
    setField,
    addField,
    removeField,
    setAvatar,
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
      collectionName: Collections.Characters,
      expand: {
        rpgSystem: undefined
      }
    })
  };
}

export const characterStore = createCharacterStore();

export const editMode = writable(false);


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

// Character Notes Store
function createCharacterNotesStore() {

  const { subscribe, set, update } = writable<CharacterNotesResponse>();

  function addNote(note: CharacterNote) {
    update((characterNotes) => {
      console.log(`Adding note`)
      return addCharacterNote(characterNotes, note)
    })
  }

  function deleteNote(noteId: string) {
    update((characterNotes) => {
      console.log(`Removing note`)
      return removeCharacterNote(characterNotes, noteId)
    })
  }

  function updateNote(note: CharacterNote) {
    update((characterNotes) => {
      characterNotes.data = characterNotes.data.map((n: CharacterNote) => {
        if (n.id === note.id) {
          n = note
        }
        return n
      })
      console.log(`Updated note`)
      return characterNotes
    })
  }

  function save() {
    update((characterNotes) => {
      console.log(`Saving Character Notes`)
      updateCharacterNotes(characterNotes.id, characterNotes)
      return characterNotes 
    })
  }

  return {
    subscribe,
    set,
    update,
    save,
    reset: () => set({
      id: "",
      data: [],
      character: "",
      creator: "",
      created: "",
      updated: "",
      collectionId: "",
      collectionName: Collections.CharacterNotes
    }),
    addNote,
    deleteNote,
    updateNote,
  };
}
export const characterNotesStore = createCharacterNotesStore();


// Create a store to contain a background image
export const rpgSystemBanner = writable("");

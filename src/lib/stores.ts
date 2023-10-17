import { writable } from "svelte/store"
import { Collections, type CharacterNotesResponse } from "./pocketbase-types.d";
import type { CharacterNote, FieldError } from "./types";
import { addCharacterNote, removeCharacterNote } from "./characterNotesOperations";
import { updateCharacterNotes } from "$models/character_notes";

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

export const headerBanner = writable("");

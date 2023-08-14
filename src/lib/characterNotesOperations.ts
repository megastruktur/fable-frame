import type { CharacterNotesResponse } from "./pocketbase-types"
import type { CharacterNote } from "./types"
import { v4 as uuidv4 } from 'uuid'

export function addCharacterNote(characterNotes: CharacterNotesResponse, note: CharacterNote): CharacterNotesResponse {

  // Generate Field UUID.
  if (note.id === undefined || note.id === "") {
    note.id = uuidv4()
  }
  note.date = new Date().toISOString()
  note.weight = 1

  characterNotes.data.unshift(note)
  return characterNotes

}

export function removeCharacterNote(characterNotes: CharacterNotesResponse, noteId: string): CharacterNotesResponse {
  characterNotes.data = characterNotes.data.filter(note => note.id !== noteId)
  return characterNotes

}

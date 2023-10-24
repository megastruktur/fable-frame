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

  if (characterNotes.data === undefined || !characterNotes.data) {
    characterNotes.data = []
  }

  characterNotes.data = [note, ...characterNotes.data]
  return characterNotes

}

export function removeCharacterNote(characterNotes: CharacterNotesResponse, noteId: string): CharacterNotesResponse {
  characterNotes.data = characterNotes.data.filter((note: CharacterNote) => note.id !== noteId)
  return characterNotes

}

export function updateCharacterNote(characterNotes: CharacterNotesResponse, note: CharacterNote) {

  characterNotes.data = characterNotes.data.map((n: CharacterNote) => {
    if (n.id === note.id) {
      n = note
    }
    return n
  })

  return characterNotes
}

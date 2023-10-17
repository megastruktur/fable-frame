import { pb } from "$lib/pocketbase"
import type { CharacterNotesResponse, CharacterNotesRecord } from "$lib/pocketbase-types.d"
import type { CharacterNote } from "$lib/types";
export async function createCharacterNotes(data: Partial<CharacterNotesRecord>): Promise<CharacterNotesResponse> {
  if (!data.data) {
    data.data = [];
  }
  return await pb.collection("character_notes").create(data)
}

export async function getCharacterNotes(id: string, queryParams: any = {}): Promise<CharacterNotesResponse> {
  return await pb.collection("character_notes").getOne(id, queryParams)
}

export async function updateCharacterNotes(id: string, data: Partial<CharacterNotesRecord>): Promise<CharacterNotesResponse> {
  return await pb.collection("character_notes").update(id, data)
}

export async function getCharacterNotesByCharacterId(characterId: string): Promise<CharacterNotesResponse> {

  try {
    const characterNotes: CharacterNotesResponse = await pb.collection("character_notes").getFirstListItem(`character="${characterId}"`)
    return characterNotes
  } catch (e: any) {
    if (e.status === 404) {
      console.log("Character Notes not found. Creating a new one")
      return await createCharacterNotes({ character: characterId })
    }
  }
}

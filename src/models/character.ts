import { getRpgSystem } from "$models/rpg_system"
import { pb } from "$lib/pocketbase"
import type { SystemJSON, Field } from "$lib/types.d"
import type { CharactersResponse, CharactersRecord } from "$lib/pocketbase-types.d"

export async function createCharacter(data: Partial<CharactersRecord>): Promise<CharactersResponse> {
  return await pb.collection("characters").create(data)
}

export async function getCharacter(id: string): Promise<CharactersResponse> {
  return await pb.collection("characters").getOne(id)
}

export async function updateCharacter(id: string, data: Partial<CharactersRecord>): Promise<CharactersResponse> {
  return await pb.collection("characters").update(id, data)
}

export async function deleteCharacter(id: string) {
  await pb.collection("characters").delete(id)
}

export async function getAllCharacters(queryParams: any = {}): Promise<CharactersResponse[]> {
  return await pb.collection("characters").getFullList(queryParams)
}

export async function getAllCharactersWithSystem(): Promise<CharactersResponse[]> {
  return await getAllCharacters({expand: "systemId"})
}

// export async function createNewCharacter(systemId: string): Promise<CharactersResponse> {

//   const rpgSystem = await getRpgSystem(systemId)

//   if (!rpgSystem) {
//     throw new Error(`No RPG system found with id ${systemId}`)
//   }

//   const systemData: SystemJSON = rpgSystem.data

//   return await createCharacter({
//     name: "New Character",
//     systemId: systemId,
//     fields: systemData.fields.character
//   })
// }

export async function updateCharacterFieldValue(characterId: string, fieldName: string, fieldValue: string) {
  
  console.log(`Updating character ${characterId} with field ${fieldName} to ${fieldValue}`)
}

export function getCharacterField(character: CharactersResponse, fieldName: string): Field {
  const field = character.fields.find((field: Field) => field.name === fieldName)
  if (field) {
    return field
  }
  else {
    return {
      name: fieldName,
      type: "text",
      value: "",
      id: "",
      characterId: character.id
    }
  }
}

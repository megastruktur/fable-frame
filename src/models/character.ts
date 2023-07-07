import { getRpgSystem } from "$models/rpg_system"
import { pb } from "$lib/pocketbase"
import type { SystemJSON, Field } from "$lib/types.d"
import type { CharactersResponse, CharactersRecord } from "$lib/pocketbase-types.d"
import getStringHash from "$lib/getStringHash"

export async function createCharacter(data: Partial<CharactersRecord>): Promise<CharactersResponse> {
  return await pb.collection("characters").create(data)
}

export async function getCharacter(id: string, queryParams: any = {}): Promise<CharactersResponse> {
  return await pb.collection("characters").getOne(id, queryParams)
}

export async function updateCharacter(id: string, data: Partial<CharactersRecord>): Promise<CharactersResponse> {
  return await pb.collection("characters").update(id, data)
}


/**
 * Reduce the number of updates hashing Character Data.
 * @param id 
 * @param data 
 * @returns 
 */
export async function updateCharacterWithHash(id: string, data: Partial<CharactersRecord>): Promise<CharactersResponse> {

  const character = await getCharacter(id, {
    fields: "name, campaign, avatar, fields",
  })

  const dataToHash = {
    name: data.name || "",
    campaign: data.campaign || "",
    avatar: data.avatar || "",
    fields: data.fields || "",
  }
  const hashedData = await getStringHash(JSON.stringify(dataToHash))

  if (!character.hash || character.hash !== hashedData) {
    return await pb.collection("characters").update(id, {...dataToHash , hash: hashedData })
  }
  else {
    throw new Error(`No changes in user ${id} data`)
  }

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

export async function createNewCharacter(systemId: string): Promise<CharactersResponse> {

  const rpgSystem = await getRpgSystem(systemId)

  if (!rpgSystem) {
    throw new Error(`No RPG system found with id ${systemId}`)
  }

  const systemData: SystemJSON = rpgSystem.data

  return await createCharacter({
    name: "New Character",
    rpgSystem: systemId,
    hash: await getStringHash(JSON.stringify(systemData.fields.character)),
    fields: systemData.fields.character
  })
}

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

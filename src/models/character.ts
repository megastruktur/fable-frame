import { getRpgSystem } from "$models/rpg_system"
import { pb } from "$lib/pocketbase"
import type { SystemJSON, Field } from "$lib/types.d"
import type { CharactersResponse, CharactersRecord } from "$lib/pocketbase-types.d"
import getStringHash from "$lib/getStringHash"
import { v4 as uuidv4 } from 'uuid'

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
export async function updateCharacterWithHash(id: string, data: Partial<CharactersRecord>): Promise<void> {

  let character

  try {
    character = await getCharacter(id, {
      fields: "name, campaign, avatar, fields, hash",
    })
  } catch (error) {
    console.log(error)
  }

  if (character) {
    const dataToHash = {
      name: data.name || "",
      campaign: data.campaign || "",
      avatar: data.avatar || "",
      fields: data.fields || "",
    }

    const hashedData = await getStringHash(JSON.stringify(dataToHash))

    if (!character.hash || character.hash !== hashedData) {

      console.log([character.hash, hashedData])

      console.log(`Updating character ${id} with values:`)
      console.log(dataToHash)

      await pb.collection("characters").update(id, {...dataToHash , hash: hashedData })
    }
    else {
      console.log(`No changes in user ${id} data`)
    }
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

export async function createNewCharacter(systemId: string, name = "New Character"): Promise<CharactersResponse> {

  const rpgSystem = await getRpgSystem(systemId)

  if (!rpgSystem) {
    throw new Error(`No RPG system found with id ${systemId}`)
  }

  const systemData: SystemJSON = rpgSystem.data

  const fieldList: Array<Field> = systemData.fields.character.map(field => {
    return {...field, id: uuidv4() }
  });

  return await createCharacter({
    name: name,
    rpgSystem: systemId,
    hash: await getStringHash(JSON.stringify(fieldList)),
    fields: fieldList
  })
}

export function getCharacterField(character: CharactersResponse, fieldId: string): Field {
  const field = character.fields.find((field: Field) => field.id === fieldId)
  if (field) {
    return field
  }
  else {
    return {
      id: uuidv4(),
      name: "New Field",
      type: "text",
      value: "",
    }
  }
}

export function getCharacterAvatar(character: CharactersResponse) {
  if (character.avatar)
    return pb.files.getUrl(character, character.avatar, { thumb: '100x100' })
  else {
    return ""
  }
}

export function getCharacterFieldGroups(character: CharactersResponse) {
  // every character.field has a group attribute. Create a distinct list of all groups.
  const fieldGroups = character.fields.map((field: Field) => field.group)
  return [...new Set(fieldGroups)]
}

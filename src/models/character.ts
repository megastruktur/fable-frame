import { getRpgSystem } from "$models/rpg_system"
import { pb } from "$lib/pocketbase"
import type { SystemJSON, Field } from "$lib/types.d"
import type { CharactersResponse, CharactersRecord } from "$lib/pocketbase-types.d"
import getStringHash from "$lib/getStringHash"
import { v4 as uuidv4 } from 'uuid'
import { createCharacterNotes } from "./character_notes"

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
  console.log(`Deleted character ${id}`)
}

/**
 * Get current user's viewable characters
 * permissions are controlled by Pocketbase
 * @param queryParams 
 * @returns 
 */
export async function getAllCharacters(queryParams: any = {}): Promise<CharactersResponse[]> {
  return await pb.collection("characters").getFullList(queryParams)
}

/**
 * Get current user's characters
 * permissions are controlled by Pocketbase
 * @param queryParams 
 * @returns 
 */
export async function getMyCharacters(queryParams: any = {}): Promise<CharactersResponse[]> {
  queryParams.filter = `creator="${pb.authStore.model?.id}"`
  return await pb.collection("characters").getFullList(queryParams)
}

export async function getAllCharactersWithSystem(): Promise<CharactersResponse[]> {
  return await getAllCharacters({expand: "systemId"})
}

export async function createNewCharacter(systemId: string, name = "New Character"): Promise<CharactersResponse> {

  const characterStubData = await getCharacterStub(systemId)
  characterStubData.name = name

  const character = await createNewCharacterByCharacterData(characterStubData)

  return character
}


export async function createNewCharacterByCharacterData(data: Partial<CharactersRecord>) {

  data.hash = await getStringHash(JSON.stringify(data.fields))

  const character = await createCharacter(data)

  await createCharacterNotes({
    character: character.id,
    data: [],
  })

  return character
}


export async function getCharacterStub(systemId: string): Promise<CharactersResponse> {
  const rpgSystem = await getRpgSystem(systemId)

  if (!rpgSystem) {
    throw new Error(`No RPG system found with id ${systemId}`)
  }

  const systemData: SystemJSON = rpgSystem.data

  const fieldList: Array<Field> = systemData.fields.character.map(field => {
    return {...field, id: uuidv4() }
  });

  return {
    rpgSystem: systemId,
    name: "",
    fields: fieldList
  } as CharactersResponse
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
      weight: 1,
    }
  }
}

export function getCharacterAvatarThumb(character: CharactersResponse) {
  if (character.avatar)
    return pb.files.getUrl(character, character.avatar, { thumb: '100x100' })
  else {
    return ""
  }
}

export function getCharacterAvatar(character: CharactersResponse) {
  if (character.avatar)
    return pb.files.getUrl(character, character.avatar)
  else {
    return ""
  }
}

export function getCharacterFieldGroups(character: CharactersResponse) {
  // every character.field has a group attribute. Create a distinct list of all groups.
  const fieldGroups = character.fields.map((field: Field) => field.group)
  return [...new Set(fieldGroups)]
}

export function getCharacterTabs(character: CharactersResponse) {

  const tabs: {[key: string]: Field} = {}

  character.fields.filter((field: Field) => field.type === "tab").forEach((tab: Field) => {
    tabs[tab.name] = tab
  })

  return tabs
}

export async function characterUpdateAvatar(characterId: string, avatarMultipart: any): Promise<CharactersResponse> {
  return await pb.collection("characters").update(characterId, avatarMultipart);
}

export async function cloneCharacter(characterId: string) {

  const characterToClone = await getCharacter(characterId)
  const newCharacter = JSON.parse(JSON.stringify(characterToClone))
  // remove the Id to create a new one and avatar as it requires reuploading
  newCharacter["name"] = newCharacter["name"] + " (Clone)"
  delete(newCharacter["id"])
  delete(newCharacter["avatar"])
  return await createCharacter(newCharacter)
}

export function subscribeCharacterOperations() {
  pb.collection("characters").subscribe("*", async (e) => {
    console.log(e)
    console.log("New character created")
  });
}

export function unsubscribeCharacterOperations() {
  pb.collection("characters").unsubscribe("*");
}

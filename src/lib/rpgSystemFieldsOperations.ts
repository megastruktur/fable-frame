import type { RpgSystemsResponse } from "./pocketbase-types";
import type { Field } from "./types";

export function getCompendiumFieldsByGroup(rpgSystem: RpgSystemsResponse, groupName: string): Field[] {
  return rpgSystem.data.fields.compendium.filter((field: Field) => field.group === groupName)
}

export function getRpgSystemFieldsByGroup(rpgSystem: RpgSystemsResponse, groupName: string): Field[] {
  return rpgSystem.data.fields.character.filter((field: Field) => field.group === groupName)
}

import { getRpgSystemByIdentifier } from "$models/rpg_system";
import type { Field } from "./types";

export async function getCompendiumItems(systemIdentifier: string, itemsGroup = "") {
  
  const rpgSystem = await getRpgSystemByIdentifier(systemIdentifier)
  if (!rpgSystem) {
    return []
  }

  const compendiumItems = rpgSystem.data.fields.compendium;

  if (itemsGroup !== "") {
    return compendiumItems.filter((item: Field) => item.group === itemsGroup)
  }

  return compendiumItems

}

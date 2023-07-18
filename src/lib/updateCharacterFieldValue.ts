import type { CharactersResponse } from "./pocketbase-types";
import type { Field } from "./types";

export default function updateCharacterFieldValue(character: CharactersResponse, fieldId: string, fieldValue: string) {

  const foundIndex = character.fields.findIndex((f: Field) => f.id === fieldId);
  // Update
  if (foundIndex !== -1) {
    character.fields[foundIndex].value = fieldValue;
    return character
  }
  // Create
  else {
    throw new Error(`Field ${fieldId} not found in character`)
  }

}

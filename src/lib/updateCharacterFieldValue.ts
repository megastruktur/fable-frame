import type { Field } from "./types";

export default function updateCharacterFieldValue(character: any, fieldName: string, fieldValue: string) {

  const foundIndex = character.fields.findIndex((f: Field) => f.name === fieldName);
  // Update
  if (foundIndex) {
    character.fields[foundIndex].value = fieldValue;
    return character
  }
  // Create
  else {
    throw new Error(`Field ${fieldName} not found in character`)
  }

}

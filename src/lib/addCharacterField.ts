import type { CharactersResponse } from "./pocketbase-types";
import type { Field } from "./types";

export default function addCharacterField(character: CharactersResponse, field: Field) {

  const foundIndex = character.fields.findIndex((f: Field) => f.name === field.name);

  // Check if field exists. If so - notify.
  if (foundIndex !== -1) {
    console.log("Field already exists.")
  }
  // Create
  else {
    character.fields.push(field)
  }
  return character

}

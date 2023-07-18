import type { CharactersResponse } from "./pocketbase-types";
import type { Field } from "./types";
import { v4 as uuidv4 } from 'uuid'

export default function addCharacterField(character: CharactersResponse, field: Field): CharactersResponse {

  // Generate Field UUID.
  if (!field.id) {
    field.id = uuidv4()
  }

  character.fields.push(field)
  return character

}

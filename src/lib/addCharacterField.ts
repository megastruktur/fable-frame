import type { CharactersResponse } from "./pocketbase-types";
import type { Field } from "./types";

export default function addCharacterField(character: CharactersResponse, field: Field) {

  character.fields.push(field)
  return character

}

import type { CharactersResponse } from "./pocketbase-types";
import type { Field } from "./types";

export default function removeCharacterField(character: CharactersResponse, field: Field): CharactersResponse {

  // Remove an item from character.fields Array comparing by id
  character.fields = character.fields.filter(item => item.id!== field.id);

  return character;
}

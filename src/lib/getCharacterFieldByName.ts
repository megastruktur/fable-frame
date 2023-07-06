import type { CharactersResponse } from "./pocketbase-types";
import type { Field } from "./types";

export default function getCharacterFieldByName(character: CharactersResponse, fieldName: string): Field {
  
  const field = character.fields.find(f => f.name === fieldName);

  if (field !== undefined) {
    return field;
  }
  else {
    return {
      name: fieldName,
      type: "text",
      value: ""
    };
  }
}
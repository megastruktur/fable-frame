import type { Field } from "./types.d";
import type { CharactersResponse } from "./pocketbase-types";
import { v4 as uuidv4 } from 'uuid'

export function getFieldFromListByName(name: string, fields: Field[]): Field {
  const returnedField = fields.find(field => field.name === name);

  if (returnedField) {
    return returnedField;
  }
  else {
    return {
      id: "",
      name: name,
      type: "text",
      value: ""
    }
  }
}

export function getFieldsByGroup(group: string, fields: Field[]): Field[] {
  return fields.filter(field => field.group === group);
}


export function addCharacterField(character: CharactersResponse, field: Field): CharactersResponse {

  // Generate Field UUID.
  if (!field.id) {
    field.id = uuidv4()
  }

  character.fields.push(field)
  return character

}

export function removeCharacterField(character: CharactersResponse, field: Field): CharactersResponse {

  // Remove an item from character.fields Array comparing by id
  character.fields = character.fields.filter(item => item.id!== field.id);

  return character;
}

export function getCharacterFieldByName(character: CharactersResponse, fieldName: string): Field {
  
  const field = character.fields.find(f => f.name === fieldName);

  if (field !== undefined) {
    return field;
  }
  else {
    return {
      id: "",
      name: fieldName,
      type: "text",
      value: ""
    };
  }
}

export function updateCharacterFieldValue(character: CharactersResponse, fieldId: string, fieldValue: string) {

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

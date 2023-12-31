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
      value: "",
      weight: 1
    }
  }
}

export function getFieldsByGroup(group: string, fields: Field[]): Field[] {
  return fields.filter(field => field.group === group).sort((a, b) => {return a.weight - b.weight});
}

export function getCharacterFieldsByGroup(character: CharactersResponse, group: string): Field[] {
  return character.fields.filter(field => field.group === group).sort((a, b) => {return a.weight - b.weight});
}


export function addCharacterField(character: CharactersResponse, field: Field): CharactersResponse {

  // Generate Field UUID.
  if (field.id === undefined || field.id === "") {
    field.id = uuidv4()
  }
  field.weight = 1

  character.fields?.push(field)
  return character

}

export function removeCharacterField(character: CharactersResponse, field: Field): CharactersResponse {

  // Remove an item from character.fields Array comparing by id
  character.fields = character.fields.filter(item => item.id!== field.id);

  return character;
}

export function getCharacterFieldByName(character: CharactersResponse, fieldName: string): Field {
  
  const field = character.fields?.find(f => f.name === fieldName);

  if (field !== undefined) {
    return field;
  }
  else {
    return {
      id: "",
      name: fieldName,
      type: "text",
      value: "",
      weight: 1
    };
  }
}

export function getCharacterFieldsByName(character: CharactersResponse, fieldName: string): Field[] {
  
  const fields = character.fields.filter(f => f.name === fieldName);

  if (fields !== undefined) {
    return fields;
  }
  else {
    return [{
      id: "",
      name: fieldName,
      type: "text",
      value: "",
      weight: 1
    }];
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


export function updateCharacterField(character: CharactersResponse, field: Field) {

  const foundIndex = character.fields?.findIndex((f: Field) => f.id === field.id);
  // Update
  if (character.fields !== undefined && foundIndex !== undefined && foundIndex !== -1) {
    character.fields[foundIndex] = field;
    return character
  }
  // Create
  else {
    throw new Error(`Field ${field.id} not found in character`)
  }

}

export function getFieldByNameFromList(list: Field[], name: string): Field {
  const field = list.find(field => field.name === name)

  if (field === undefined) {
    console.log({list})
    throw new Error(`Field ${name} not found`)
  }

  return field
}

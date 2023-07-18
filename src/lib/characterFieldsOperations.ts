import { FieldType, type Field } from "./types.d";

export function getFieldFromListByName(name: string, fields: Field[]): Field {
  const returnedField = fields.find(field => field.name === name);

  if (returnedField) {
    return returnedField;
  }
  else {
    return {
      name: name,
      type: FieldType.Text,
      value: ""
    }
  }
}

export function getFieldsByGroup(group: string, fields: Field[]): Field[] {
  return fields.filter(field => field.group === group);
}

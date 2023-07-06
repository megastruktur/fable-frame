import type { Field } from "./types";

export function getFieldFromListByName(name: string, fields: Field[]): Field {
  const returnedField = fields.find(field => field.name === name);

  if (returnedField) {
    return returnedField;
  }
  else {
    return {
      name: name,
      type: "text",
      value: ""
    }
  }
}

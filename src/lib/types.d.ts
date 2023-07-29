export type Post = {
  id: string
  title: string
  date: string
}

export type SystemJSON = {
  id: string
  name: string
  description: string
  fields: SystemJSONFieldTypes
}

export type SystemJSONFieldTypes = {
  character: Field[]
  compendium: Field[]
}

/**
 * General field types are:
 * - text
 * - tag
 * - counter-min-max
 * - counter
 * - tab
 */

export type Field = {
  id: string // generally better I use the Unique ID.
  type: string // render type
  name: string // name can help rendering particular fields in template
  label?: string
  group?: string
  value: string
  data?: object
  icon?: string
  description?: string
  weight: number
}

type FieldError = {
  fieldId?: string,
  message: string
}

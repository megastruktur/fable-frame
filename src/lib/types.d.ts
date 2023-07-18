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

export type Field = {
  id: string // generally better I use the Unique ID.
  type: FieldType // render type
  name: string
  label?: string
  group?: string
  value: string
  data?: string
  icon?: string
  description?: string
}

export enum FieldType {
  Text = "text",
  Counter = "counter",
  CounterMinMax = "counter-min-max",
  Tag = "tag",
}

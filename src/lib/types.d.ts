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
    id: string
    type: string
    name: string
    characterId: string
    value: string
    data?: string
}

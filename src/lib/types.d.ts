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
  data?: {
    [key: string]: any
  }
  icon?: string
  description?: string
  weight: number
  removable?: boolean // can the field be removed?
}

type FieldError = {
  fieldId?: string,
  message: string
}

type CharacterNote = {
  id?: string
  date?: string
  note: string
  weight?: number
}

type ChatMessage = {
  campaignId: string,
  messageId: string
  characterName: string
  message: string
  time: string
  creatorId: string
  isGm?: boolean
}

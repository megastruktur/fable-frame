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
  isGm?: boolean,
  idUpdatedString: string,
  characterAvatar?: string,
}

type DieRollChat = {
  id: string
  value: number
  die: string
  color?: string
}

export type K4eRollResult = {
  type: "success" | "partial" | "failure"
  description: string
  options?: string[]
}

export type K4ePlayerMove = {
  id: string
  weight: number
  type: string
  value: string
  name: string
  label: string
  description: string
  attribute: "willpower" | "reflexes" | "fortitude" | "intuition" | "reasoning" | "perception" | "violence" | "coolness" | "charisma" | "soul"
  modificators?: string[]
  results?: K4eRollResult[]
}


export type FFRoll = {
  systemName?: string
  field?: Field // the field you want to roll. Optional.
  type: "field" | "general"
  roll?: string // the roll you want to perform. E.g. 2d6 + 4
}

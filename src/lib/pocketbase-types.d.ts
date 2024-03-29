/**
* This file was @generated using pocketbase-typegen
*/

import type { SystemJSON } from "./types"

export enum Collections {
	CampaignChat = "campaign_chat",
	CampaignNotes = "campaign_notes",
	Campaigns = "campaigns",
	CharacterNotes = "character_notes",
	Characters = "characters",
	News = "news",
	RpgSystems = "rpg_systems",
	Scenes = "scenes",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CampaignChatRecord = {
	campaign?: RecordIdString
	character?: RecordIdString
	message?: string
	creator: RecordIdString
	expand?: {
		character?: CharacterRecord
		creator?: UserRecord
	}
}

export enum CampaignNotesTypeOptions {
	"gm" = "gm",
	"public" = "public",
	"alert" = "alert",
	"npc" = "npc",
}
export type CampaignNotesRecord = {
	campaign: RecordIdString
	creator: RecordIdString
	image?: string
	note: HTMLString
	type: CampaignNotesTypeOptions[]
	active: boolean
}

export type CampaignsRecord = {
	activeScene?: RecordIdString
	characters?: RecordIdString[]
	creator: RecordIdString
	description?: string
	image?: string
	name: string
	rpgSystem: RecordIdString
	activeScene?: RecordIdString
	characters?: RecordIdString[]
	expand?: {
		"characters(campaign)": CharactersResponse[],
		"campaign_notes(campaign)": CampaignNotesResponse[],
		characters: CharactersResponse[],
		rpgSystem: RpgSystemsResponse,
		activeScene: ScenesResponse,
	}
}

export type CharacterNotesRecord = {
	character: RecordIdString
	creator: RecordIdString
	data?: CharacterNote[]
	expand?: {
		rpgSystem: RpgSystemsResponse
		"characters(campaign)": CharactersResponse[]
		"campaign_notes(campaign)": CampaignNotesResponse[]
	}
}

export type CharactersRecord = {
	avatar?: string
	campaign?: RecordIdString
	campaignStatus?: number
	creator: RecordIdString
	fields?: Field[]
	hash: string
	name: string
	rpgSystem: RecordIdString
	expand?: {
		rpgSystem?: RpgSystemsRecord,
		campaign?: CampaignsResponse,
	}
}

export type NewsRecord = {
	image?: string
	text: HTMLString
}

export type RpgSystemsRecord = {
	data: SystemJSON
	description?: string
	hash: string
	identifier: string
	image?: string
	name: string
	status?: boolean
}

export type ScenesRecord = {
	campaign?: RecordIdString
	group?: string
	image?: string
	name?: string
	secret_hash?: string
	status?: number
	weight?: number
	expand?: {
		campaign: CampaignsResponse
	}
}

export type UsersRecord = {
	admin?: boolean
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CampaignChatResponse<Texpand = unknown> = Required<CampaignChatRecord> & BaseSystemFields<Texpand>
export type CampaignNotesResponse<Texpand = unknown> = Required<CampaignNotesRecord> & BaseSystemFields<Texpand>
export type CampaignsResponse<Texpand = unknown> = Required<CampaignsRecord> & BaseSystemFields<Texpand>
export type CharacterNotesResponse<Tdata = unknown, Texpand = unknown> = Required<CharacterNotesRecord<Tdata>> & BaseSystemFields<Texpand>
export type CharactersResponse<Tfields = unknown, Texpand = unknown> = Required<CharactersRecord<Tfields>> & BaseSystemFields<Texpand>
export type NewsResponse<Texpand = unknown> = Required<NewsRecord> & BaseSystemFields<Texpand>
export type RpgSystemsResponse<Tdata = unknown, Texpand = unknown> = Required<RpgSystemsRecord<Tdata>> & BaseSystemFields<Texpand>
export type ScenesResponse<Texpand = unknown> = Required<ScenesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	campaign_chat: CampaignChatRecord
	campaign_notes: CampaignNotesRecord
	campaigns: CampaignsRecord
	character_notes: CharacterNotesRecord
	characters: CharactersRecord
	news: NewsRecord
	rpg_systems: RpgSystemsRecord
	scenes: ScenesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	campaign_chat: CampaignChatResponse
	campaign_notes: CampaignNotesResponse
	campaigns: CampaignsResponse
	character_notes: CharacterNotesResponse
	characters: CharactersResponse
	news: NewsResponse
	rpg_systems: RpgSystemsResponse
	scenes: ScenesResponse
	users: UsersResponse
}

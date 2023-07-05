/**
* This file was @generated using pocketbase-typegen
*/

import type { Field } from "./types.d"

export enum Collections {
	CampaignNotes = "campaign_notes",
	Campaigns = "campaigns",
	Characters = "characters",
	News = "news",
	RpgSystems = "rpg_systems",
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

export enum CampaignNotesTypeOptions {
	"gm" = "gm",
	"public" = "public",
}
export type CampaignNotesRecord = {
	campaign: RecordIdString
	type: CampaignNotesTypeOptions
	note: HTMLString
	image?: string
	creator: RecordIdString
}

export type CampaignsRecord = {
	name: string
	image?: string
	description?: string
	rpgSystem: RecordIdString
	creator: RecordIdString
	characters?: RecordIdString[]
	image?: string
}

export type CharactersRecord<Tdata = unknown> = {
	name: string
	rpgSystem: RecordIdString
	campaign?: RecordIdString
	avatar?: string
	creator: RecordIdString
	fields: Field[]
	hash: string
}

export type NewsRecord = {
	text: HTMLString
	image?: string
}

export type RpgSystemsRecord<Tdata = unknown> = {
	identifier: string
	name: string
	description?: string
	data: SystemJSON
	status?: boolean
	hash: string
	image?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
	admin: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type CampaignNotesResponse<Texpand = unknown> = Required<CampaignNotesRecord> & BaseSystemFields<Texpand>
export type CampaignsResponse<Texpand = unknown> = Required<CampaignsRecord> & BaseSystemFields<Texpand>
export type CharactersResponse<Tdata = unknown, Texpand = unknown> = Required<CharactersRecord<Tdata>> & BaseSystemFields<Texpand>
export type NewsResponse<Texpand = unknown> = Required<NewsRecord> & BaseSystemFields<Texpand>
export type RpgSystemsResponse<Tdata = unknown, Texpand = unknown> = Required<RpgSystemsRecord<Tdata>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	campaign_notes: CampaignNotesRecord
	campaigns: CampaignsRecord
	characters: CharactersRecord
	news: NewsRecord
	rpg_systems: RpgSystemsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	campaign_notes: CampaignNotesResponse
	campaigns: CampaignsResponse
	characters: CharactersResponse
	news: NewsResponse
	rpg_systems: RpgSystemsResponse
	users: UsersResponse
}

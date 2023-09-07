import { pb } from "$lib/pocketbase"
import type { CampaignRecord, CampaignResponse } from "$lib/pocketbase-types.d"
import { getAllCharacters } from "./character"

export async function createCampaign(data: Partial<CampaignResponse>): Promise<CampaignResponse> {
  return await pb.collection("campaigns").create(data)
}

export async function getCampaign(id: string): Promise<CampaignResponse> {
  return await pb.collection("campaigns").getOne(id)
}

export async function updateCampaign(id: string, data: Partial<CampaignRecord>): Promise<CampaignResponse> {
  return await pb.collection("campaigns").update(id, data)
}

export async function deleteCampaign(id: string) {
  await pb.collection("campaigns").delete(id)
}

export async function getAllCampaigns(queryParams = {}): Promise<CampaignResponse[]> {
  return await pb.collection("campaigns").getFullList(queryParams)
}


export async function getCampaignWithRpgSystem(id: string): Promise<CampaignResponse> {
  return await pb.collection("campaigns").getOne(id, { expand: "rpgSystem" })
}

export async function getCampaignCharacterRequests(campaignId: string) {
  return await getAllCharacters({
    filter: `campaign = "${campaignId}" && campaign_status = 0`
  })
}

export async function getCampaignCharacters(campaignId: string) {
  return await getAllCharacters({
    filter: `campaign = "${campaignId}" && campaign_status = 1`
  })
}

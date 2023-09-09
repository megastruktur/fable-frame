import { pb } from "$lib/pocketbase"
import type { CampaignRecord, CampaignResponse, CharactersResponse } from "$lib/pocketbase-types.d"
import { getAllCharacters, updateCharacter } from "./character"

export async function createCampaign(data: Partial<CampaignResponse>): Promise<CampaignResponse> {
  return await pb.collection("campaigns").create(data)
}

export async function getCampaign(id: string, queryParams = {}): Promise<CampaignResponse> {
  return await pb.collection("campaigns").getOne(id, queryParams)
}

export async function updateCampaign(id: string, data: Partial<CampaignRecord>): Promise<CampaignResponse> {
  return await pb.collection("campaigns").update(id, data)
}

export async function deleteCampaign(id: string) {

  const campaignWithCharacters = await getCampaign(id, {
    expand: `characters(campaign)`
  })

  campaignWithCharacters.expand["characters(campaign)"].forEach(async c => {
    c.campaign = ""
    await updateCharacter(c.id, c)
  })

  await pb.collection("campaigns").delete(id)
}

export async function getAllCampaigns(queryParams = {}): Promise<CampaignResponse[]> {
  return await pb.collection("campaigns").getFullList(queryParams)
}

/**
 * Ge the list of campagins with current user as a Player.
 * @returns 
 */
export async function getCharacterCampaigns(): Promise<CampaignResponse[]> {

  const campaigns: CampaignResponse[] = []
  const tCampaigns: {[id: string]: CampaignResponse} = {}

  try {
    const charactersCampaigns = await getAllCharacters({
      expand: `campaign`
    })

    // Distinct campaigns
    charactersCampaigns.forEach(character => {
      if (character.expand.campaign !== undefined && character.expand.campaign !== null) {
        tCampaigns[character.expand.campaign.id] = character.expand.campaign
      }
    })

    Object.values(tCampaigns).forEach(campaign => {
      campaigns.push(campaign)
    })
  }
  catch (error) {
    console.log(error)
  }

  return campaigns
}


/**
 * Get list of Campaigns with the current user as a GM.
 * @returns 
 */
export async function getGMCampaigns(): Promise<CampaignResponse[]> {

  if (pb.authStore.model?.id !== undefined) {
    return await getAllCampaigns({
      filter: `creator = "${pb.authStore.model.id}"`
    })
  }
  else {
    return []
  }
}


export async function getCampaignWithRpgSystem(id: string): Promise<CampaignResponse> {
  return await pb.collection("campaigns").getOne(id, { expand: "rpgSystem" })
}

export async function getCampaignCharacterRequests(campaignId: string) {
  return await getAllCharacters({
    filter: `campaign = "${campaignId}" && campaignStatus = 0`
  })
}

export async function getCampaignCharacters(campaignId: string) {
  return await getAllCharacters({
    filter: `campaign = "${campaignId}" && campaignStatus = 1`
  })
}

export async function campaignUpdateImage(campaignId: string, imageMultipart: any): Promise<CampaignResponse> {
  return await pb.collection("campaigns").update(campaignId, imageMultipart);
}

export function getCampaignImage(campaign: CampaignResponse) {
  if (campaign.image)
    return pb.files.getUrl(campaign, campaign.image)
  else {
    return ""
  }
}

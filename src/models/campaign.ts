import { pb } from "$lib/pocketbase"
import type { CampaignsRecord, CampaignsResponse } from "$lib/pocketbase-types.d"
import type { RecordSubscription, Record, UnsubscribeFunc } from "pocketbase"
import { getAllCharacters, getMyCharacters, updateCharacter } from "./character"

export async function createCampaign(data: Partial<CampaignsResponse>): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").create(data)
}

export async function getCampaign(id: string, queryParams = {}): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").getOne(id, queryParams)
}

export async function getCampaignWithCharacters(id: string): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").getOne(id, {
    expand: "characters"
  })
}

export async function getCampaignWithCharactersAndActiveScene(id: string): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").getOne(id, {
    expand: "characters,activeScene",
  })
}

export async function updateCampaign(id: string, data: Partial<CampaignsRecord>): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").update(id, data)
}

export async function deleteCampaign(id: string) {

  const campaignWithCharacters: CampaignsResponse = await getCampaign(id, {
    expand: `characters(campaign)`
  })

  campaignWithCharacters.expand["characters(campaign)"].forEach(async c => {
    c.campaign = ""
    await updateCharacter(c.id, c)
  })

  await pb.collection("campaigns").delete(id)
}

export async function getAllCampaigns(queryParams = {}): Promise<CampaignsResponse[]> {
  return await pb.collection("campaigns").getFullList(queryParams)
}

/**
 * Ge the list of campagins with current user as a Player.
 * @returns 
 */
export async function getCharacterCampaigns(): Promise<CampaignsResponse[]> {

  const campaigns: CampaignsResponse[] = []
  const tCampaigns: {[id: string]: CampaignsResponse} = {}

  try {
    const charactersCampaigns = await getMyCharacters({
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
export async function getGMCampaigns(): Promise<CampaignsResponse[]> {

  if (pb.authStore.model?.id !== undefined) {
    return await getAllCampaigns({
      filter: `creator = "${pb.authStore.model.id}"`
    })
  }
  else {
    return []
  }
}


export async function getCampaignWithRpgSystem(id: string): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").getOne(id, { expand: "rpgSystem" })
}

export async function getCampaignWithRpgSystemCharsAndNotes(id: string): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").getOne(id, {
    expand: "rpgSystem,characters,campaign_notes(campaign)"
  })
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

export async function campaignUpdateImage(campaignId: string, imageMultipart: any): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").update(campaignId, imageMultipart);
}

export function getCampaignImage(campaign: CampaignsResponse) {
  if (campaign.image)
    return pb.files.getUrl(campaign, campaign.image)
  else {
    return ""
  }
}

export async function subscribeToCampaign(campaignId: string, callback: (data: RecordSubscription<Record>) => void): Promise<UnsubscribeFunc> {
  return pb.collection("campaigns").subscribe(campaignId, callback)
}

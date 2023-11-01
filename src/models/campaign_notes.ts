import { pb } from "$lib/pocketbase"
import { type CampaignNotesResponse, type CampaignNotesRecord, CampaignNotesTypeOptions } from "$lib/pocketbase-types.d"

export async function createCampaignNote(data: any): Promise<CampaignNotesResponse> {
  return await pb.collection("campaign_notes").create(data)
}

export async function getCampaignNotes(campaignId: string): Promise<CampaignNotesResponse[]> {
  const queryParams = {
    filter: `campaign="${campaignId}" && type != "alert"`,
    sort: "-created",
  }
  return await pb.collection("campaign_notes").getFullList(queryParams)
}

export async function getCampaignAlerts(campaignId: string): Promise<CampaignNotesResponse[]> {
  return await pb.collection("campaign_notes").getFullList({
    filter: pb.filter("campaign = {:campaignId} && type ?~ {:type}", {
      campaignId: campaignId,
      type: CampaignNotesTypeOptions.alert,
    }),
    sort: "-created,active",
  })
}

export async function createCampaignAlert(campaignId: string, noteText: string): Promise<CampaignNotesResponse> {
  const data = {
    type: [CampaignNotesTypeOptions.alert],
    note: noteText,
    campaign: campaignId,
    active: true,
  }
  return await pb.collection("campaign_notes").create(data)
}

export async function toggleCampaignNoteActive(note: CampaignNotesResponse) {
  note.active = !note.active
  return await updateCampaignNotes(note.id, note)
}

export async function updateCampaignNotes(id: string, data: Partial<CampaignNotesRecord>): Promise<CampaignNotesResponse> {
  return await pb.collection("campaign_notes").update(id, data)
}

export async function deleteCampaignNote(campaignNoteId: string) {
  return await pb.collection("campaign_notes").delete(campaignNoteId)
}

export function getCampaignNotesImage(note: CampaignNotesResponse) {
  if (note.image)
    return pb.files.getUrl(note, note.image)
  else {
    return ""
  }
}

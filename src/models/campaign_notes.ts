import { pb } from "$lib/pocketbase"
import { type CampaignNotesResponse, type CampaignNotesRecord, CampaignNotesTypeOptions } from "$lib/pocketbase-types.d"
// export async function createCampaignNote(data: Partial<CampaignNotesRecord>): Promise<CampaignNotesResponse> {
//   return await pb.collection("campaign_notes").create(data)
// }

export async function createCampaignNote(campaignId: string, noteText: string, isGmNote = false): Promise<CampaignNotesResponse> {
  const data = {
    type: isGmNote ? CampaignNotesTypeOptions.gm : CampaignNotesTypeOptions.public,
    note: noteText,
    campaign: campaignId,
    active: true,
  }
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
  const queryParams = {
    filter: `campaign="${campaignId}" && type="alert"`,
    sort: "-created,active",
  }
  return await pb.collection("campaign_notes").getFullList(queryParams)
}

export async function createCampaignAlert(campaignId: string, noteText: string): Promise<CampaignNotesResponse> {
  const data = {
    type: CampaignNotesTypeOptions.alert,
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

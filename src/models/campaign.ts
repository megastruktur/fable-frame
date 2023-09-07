import { pb } from "$lib/pocketbase"
import type { CampaignsRecord, CampaignsResponse } from "$lib/pocketbase-types.d"

export async function createCampaign(data: Partial<CampaignsResponse>): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").create(data)
}

export async function getCampaign(id: string): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").getOne(id)
}

export async function updateCampaign(id: string, data: Partial<CampaignsRecord>): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").update(id, data)
}

export async function deleteCampaign(id: string) {
  await pb.collection("campaigns").delete(id)
}

export async function getAllCampaigns(queryParams = {}): Promise<CampaignsResponse[]> {
  return await pb.collection("campaigns").getFullList(queryParams)
}

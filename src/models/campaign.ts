import { pb } from "$lib/pocketbase"
import type { CampaignsRecord, CampaignsResponse } from "$lib/pocketbase-types.d"

export async function createRpgSystem(data: Partial<CampaignsResponse>): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").create(data)
}

export async function getRpgSystem(id: string): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").getOne(id)
}

export async function updateRpgSystem(id: string, data: Partial<CampaignsRecord>): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").update(id, data)
}

export async function deleteRpgSystem(id: string) {
  await pb.collection("campaigns").delete(id)
}

export async function getAllCampaigns(queryParams = {}): Promise<CampaignsResponse[]> {
  return await pb.collection("campaigns").getFullList(queryParams)
}

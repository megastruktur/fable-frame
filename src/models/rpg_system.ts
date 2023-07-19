import { pb } from "$lib/pocketbase"
import type { RpgSystemsRecord, RpgSystemsResponse } from "$lib/pocketbase-types.d"

export async function createRpgSystem(data: Partial<RpgSystemsResponse>): Promise<RpgSystemsResponse> {
  return await pb.collection("rpg_systems").create(data)
}

export async function getRpgSystem(id: string): Promise<RpgSystemsResponse> {
  return await pb.collection("rpg_systems").getOne(id)
}

export async function updateRpgSystem(id: string, data: Partial<RpgSystemsRecord>): Promise<RpgSystemsResponse> {
  return await pb.collection("rpg_systems").update(id, data)
}

export async function deleteRpgSystem(id: string) {
  await pb.collection("rpg_systems").delete(id)
}

export async function getAllRpgSystems(queryParams = {}): Promise<RpgSystemsResponse[]> {
  return await pb.collection("rpg_systems").getFullList(queryParams)
}

export async function getActiveRpgSystems(): Promise<RpgSystemsResponse[]> {
  return await getAllRpgSystems({filter: `status = true`})
}

export function getRpgSystemImage(rpgSystem: RpgSystemsResponse) {
  return pb.files.getUrl(rpgSystem, rpgSystem.image, { thumb: '100x100' });
}

import { pb } from "$lib/pocketbase";
import type { CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
import { getCampaign } from "./campaign";

export async function createScene(data: any): Promise<ScenesResponse> {
  return await pb.collection("scenes").create(data)
}

export async function getCampaignScenes(campaignId: string): Promise<ScenesResponse[]> {
  return await pb.collection("scenes").getFullList({
    filter: `campaign = "${campaignId}"`
  })
}

export function getSceneImage(scene: ScenesResponse) {
  if (scene.image !== undefined && scene.image !== "")
    return pb.files.getUrl(scene, scene.image)
  else {
    return ""
  }
}

export async function activateScene(campaignId: string, sceneId: string): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").update(campaignId, {activeScene: sceneId})
}

export async function deactivateScene(campaignId: string): Promise<CampaignsResponse> {
  return await pb.collection("campaigns").update(campaignId, {activeScene: ""})
}

export async function getScene(sceneId: string): Promise<ScenesResponse> {
  return await pb.collection("scenes").getOne(sceneId)
}

export async function deleteScene(sceneId: string) {
  await pb.collection("scenes").delete(sceneId)
}

export async function updateScene(sceneId: string, data: any): Promise<ScenesResponse> {
  return await pb.collection("scenes").update(sceneId, data)
}

export async function getCampaignActiveScene(campaignId: string): Promise<ScenesResponse | null> {
  const campaign = await getCampaign(campaignId, {
    expand: "activeScene"
  })
  return campaign.expand.activeScene || null
}

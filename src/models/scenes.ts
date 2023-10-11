import { pb } from "$lib/pocketbase";
import type { CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";

export async function sceneCreate(data: any) {
  return await pb.collection("scenes").create(data)
}

export async function getCampaignScenes(campaignId: string): Promise<ScenesResponse[]> {
  return await pb.collection("scenes").getFullList({
    filter: `campaign = "${campaignId}"`
  })
}

export function getSceneImage(scene: ScenesResponse) {
  if (scene.image)
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

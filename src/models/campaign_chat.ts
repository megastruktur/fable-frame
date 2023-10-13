import { pb } from "$lib/pocketbase";
import type { CampaignChatResponse } from "$lib/pocketbase-types";

export async function getCampaignChat(campaignId: string): Promise<CampaignChatResponse[]> {
  return await pb.collection("campaign_chat").getFullList({
    filter: `campaign = "${campaignId}"`,
    expand: "creator"
  });
}

export async function createChatMessage(data: any): Promise<CampaignChatResponse> {
  return await pb.collection("campaign_chat").create(data);
}

export async function getChatMessage(messageId: string): Promise<CampaignChatResponse | null> {
  return await pb.collection("campaign_chat").getOne(messageId);
}

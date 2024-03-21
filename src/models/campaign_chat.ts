import { pb } from "$lib/pocketbase";
import type { CampaignChatResponse } from "$lib/pocketbase-types";
import type { ChatMessage } from "$lib/types";
import type { RecordSubscription, UnsubscribeFunc } from "pocketbase";

export async function getCampaignChat(campaignId: string): Promise<CampaignChatResponse[]> {
  return await pb.collection("campaign_chat").getFullList({
    filter: `campaign = "${campaignId}"`,
    expand: "creator,character"
  });
}

export async function createChatMessage(data: any): Promise<CampaignChatResponse> {
  return await pb.collection("campaign_chat").create(data);
}

export async function getChatMessage(messageId: string): Promise<CampaignChatResponse | null> {
  return await pb.collection("campaign_chat").getOne(messageId);
}

export async function updateChatMessage(messageId: string, data: Partial<CampaignChatResponse>): Promise<CampaignChatResponse> {
  return await pb.collection("campaign_chat").update(messageId, data);
}

export async function updateChatMessageCM(message: ChatMessage) {
  return await updateChatMessage(message.messageId, {message: message.message})
}

export async function subscribeToCampaignChats(callback: (data: RecordSubscription<Record>) => void): Promise<UnsubscribeFunc> {
  return pb.collection("campaign_chat").subscribe("*", callback)
}

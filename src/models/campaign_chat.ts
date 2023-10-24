import { pb } from "$lib/pocketbase";
import type { CampaignChatResponse } from "$lib/pocketbase-types";
import type { ChatMessage } from "$lib/types";
import { io } from '$lib/webSocketConnection';

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

export async function updateChatMessageWithSocket(message: ChatMessage) {
  const updatedMessage: CampaignChatResponse = await updateChatMessage(message.messageId, {message: message.message})
  message.idUpdatedString = updatedMessage.id + updatedMessage.updated
  io.emit('campaignChatEdited', message);
}

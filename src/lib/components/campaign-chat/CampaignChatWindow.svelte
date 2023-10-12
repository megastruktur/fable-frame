<script lang="ts">
	import { currentUser, pb } from "$lib/pocketbase";
	import type { CampaignChatResponse, CampaignsResponse, CharactersResponse } from "$lib/pocketbase-types";
	import type { ChatMessage } from "$lib/types";
	import { io } from '$lib/webSocketConnection';
	import { createChatMessage, getCampaignChat } from "$models/campaign_chat";
	import { onMount, tick } from "svelte";


  export let campaign: CampaignsResponse
  export let characters: CharactersResponse[] = []

  let isGm: boolean = (campaign.creator === $currentUser?.id) || false
  
  let myCharacter: CharactersResponse = characters.find(c => c.creator === $currentUser?.id)
  let characterName: string = myCharacter?.name || $currentUser?.username

  let chatMessage: string
  let messages: ChatMessage[] = []
  let element: HTMLDivElement

  async function scrollToBottom(node: HTMLDivElement) {
    node?.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  }

  async function sendMessage() {

    const campaignChatMessage = await createChatMessage({
      campaign: campaign.id,
      character: myCharacter?.id || "",
      message: chatMessage
    })
    const message = {
      characterName: characterName,
      message: chatMessage,
      messageId: campaignChatMessage.id
    }
    io.emit('campaignChat', message);
    chatMessage = ""
  }

  onMount(async () => {

    messages = (await getCampaignChat(campaign.id)).map(message => {
      return {
        characterName: characters.find(c => c.id === message.character)?.name || "GM",
        message: message.message,
        messageId: message.id,
        time: message.created
      }
    })

    io.on('campaignChatMessage', async (message: ChatMessage) => {
        messages = [...messages, message];
        await tick();
        scrollToBottom(element)
    });

    // Wait for data to populate
    await tick();
    scrollToBottom(element)
  });

</script>

<div class="bg-surface-900 rounded-lg border-2 border-tertiary-900 overflow-hidden p-1">

  <div
    class="h-60 w-full bg-surface-500 overflow-y-auto"
    bind:this={element}
  >
    {#each messages as message(message.messageId)}
    <div>
      <div class="bg-surface-700 p-1">{message.characterName}</div>
      <div class="p-1 pl-3">{message.message}</div>
    </div>
    {/each}
  </div>
  <form class="flex my-3 mx-2" on:submit|preventDefault={sendMessage}>
    <input type="text" class="input" bind:value={chatMessage} />
    <button type="submit"
      class="btn btn-icon variant-filled-tertiary"
    >S</button>
  </form>

</div>

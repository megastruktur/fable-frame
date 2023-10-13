<script lang="ts">
	import { currentUser, pb } from "$lib/pocketbase";
	import type { CampaignsResponse, CharactersResponse } from "$lib/pocketbase-types";
	import type { ChatMessage } from "$lib/types";
	import { io } from '$lib/webSocketConnection';
	import { createChatMessage, getCampaignChat } from "$models/campaign_chat";
	import { onMount, tick } from "svelte";
  import FaAngleRight from 'svelte-icons/fa/FaAngleRight.svelte'


  export let campaign: CampaignsResponse
  export let characters: CharactersResponse[] = []
  
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
      messageId: campaignChatMessage.id,
      creatorId: $currentUser?.id || "",
    }
    io.emit('campaignChat', message);
    chatMessage = ""
  }
  function dragChatWindow(dragNode: HTMLDivElement) {

    let node = dragNode.parentElement
    let moving = false;
    let left = 0;
    let bottom = 0;
    dragNode.style.cursor = 'move';

    if (node !== null) {
      node.style.position = 'absolute';
      node.style.bottom = `${bottom}px`;
      node.style.left = `${left}px`;
      node.style.userSelect = 'none';

      dragNode.addEventListener('mousedown', () => {
        moving = true;
      });
      
      window.addEventListener('mousemove', (e) => {
        if (moving) {
            left += e.movementX;
            bottom -= e.movementY;
            node.style.bottom = `${bottom}px`;
            node.style.left = `${left}px`;
        }
      });

      window.addEventListener('mouseup', () => {
        moving = false;
      });
    }
  }

  onMount(async () => {

    messages = (await getCampaignChat(campaign.id)).map(message => {
      return {
        characterName: characters.find(c => c.id === message.character)?.name || message.expand.creator.username,
        message: message.message,
        messageId: message.id,
        creatorId: message.creator,
        isGm: message.creator === campaign.creator,
        time: message.created,
      }
    })

    io.on('campaignChatMessage', async (message: ChatMessage) => {
        message.isGm = message.creatorId === campaign.creator
        messages = [...messages, message];
        await tick();
        scrollToBottom(element)
    });

    // Wait for data to populate
    await tick();
    scrollToBottom(element)
  });

</script>

<div class="bg-surface-900 rounded-lg border-2 border-tertiary-900 overflow-hidden p-1 h-auto">

  <div class="h-4 w-full" use:dragChatWindow></div>

  <div
    class="h-60 w-full bg-surface-500 overflow-y-auto select-text"
    bind:this={element}
  >
    {#each messages as message(message.messageId)}
    <div>
      <div class="{message.isGm ? "bg-error-400" : "bg-surface-700"} p-1">{message.isGm ? "GM" : message.characterName}</div>
      <div class="p-1 pl-3">{message.message}</div>
    </div>
    {/each}
  </div>
  <form class="flex my-3 mx-2" on:submit|preventDefault={sendMessage}>
    <input type="text" class="input" bind:value={chatMessage} />
    <button type="submit"
      class="btn btn-icon btn-icon-sm variant-filled-tertiary"
    ><FaAngleRight class="text-secondary-600" /></button>
  </form>

</div>

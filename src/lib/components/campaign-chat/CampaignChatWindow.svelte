<script lang="ts">
	import { currentUser, pb } from "$lib/pocketbase";
	import type { CampaignsResponse, CharactersResponse } from "$lib/pocketbase-types";
	import type { ChatMessage } from "$lib/types";
	import { io } from '$lib/webSocketConnection';
	import { createChatMessage, getCampaignChat } from "$models/campaign_chat";
	import { onMount, tick } from "svelte";
  import FaAngleRight from 'svelte-icons/fa/FaAngleRight.svelte'
	import CampaignChatMessage from "./CampaignChatMessage.svelte";
	import DiceRoller from "../dice/DiceRoller.svelte";
  import { DiceRoll } from '@dice-roller/rpg-dice-roller';
	import type { RollResult, RollResults } from '@dice-roller/rpg-dice-roller/types/results';


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

  function diceRollHandler({detail}: {detail: string}) {

    rollDiceToChat(detail)
  }

  async function rollDiceToChat(diceString: string) {
    let rollResults: number[] = []

    const roll = new DiceRoll(diceString);

    const currentRoll: {output: string} = JSON.parse(roll.export() || "{}")

    await sendMessage(`/roll ${currentRoll.output}`)
  }

  async function sendMessage(messageString: string = "") {


    if (messageString === "") {
      messageString = chatMessage
    }
    const campaignChatMessage = await createChatMessage({
      campaign: campaign.id,
      character: myCharacter?.id || "",
      message: messageString
    })
    const message = {
      characterName: characterName,
      message: messageString,
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

  <div class="w-full border-b-2 border-tertiary-900 mb-3" use:dragChatWindow>
    <h3 class="h3">Chat</h3>
  </div>

  <div
    class="h-60 w-full bg-surface-500 overflow-y-auto select-text"
    bind:this={element}
  >
    {#each messages as message(message.messageId)}
      <CampaignChatMessage {message} />
    {/each}
  </div>

  <form class="flex my-3 mx-2" on:submit|preventDefault={sendMessage}>
    <input type="text" class="input" bind:value={chatMessage} />
    <button type="submit"
      class="btn btn-icon btn-icon-sm variant-filled-tertiary h-6 w-6"
    ><FaAngleRight class="text-secondary-600" /></button>
  </form>

  <!-- Dice -->
  <DiceRoller on:diceRoll={diceRollHandler} />

</div>

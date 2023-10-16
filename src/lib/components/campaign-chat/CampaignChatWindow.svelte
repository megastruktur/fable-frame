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


  export let campaign: CampaignsResponse

  let myCharacter: CharactersResponse = campaign.expand.characters.find(c => c.creator === $currentUser?.id)
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

    const roll = new DiceRoll(diceString);

    const currentRoll: {output: string} = JSON.parse(roll.export() || "{}")

    await sendMessage(`/roll ${currentRoll.output}`)
  }

  async function sendMessage(messageString: string = "") {

    if (messageString !== "") {
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
  }

  onMount(async () => {

    messages = (await getCampaignChat(campaign.id)).map(message => {
      return {
        characterName: campaign.expand.characters.find(c => c.id === message.character)?.name || message.expand.creator.username,
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

<div class="h-full">

  <div
    class="w-full h-4/6 overflow-y-auto select-text"
    bind:this={element}
  >
    {#each messages as message(message.messageId)}
      <CampaignChatMessage {message} />
    {/each}
  </div>

  <div class="h-1/6">
    <form class="flex my-3 mx-2" on:submit|preventDefault={() => sendMessage(chatMessage)}>
      <input type="text" class="input" bind:value={chatMessage} placeholder="Type here" />
      <button type="submit"
        class="btn btn-icon btn-icon-sm variant-filled-tertiary h-6 w-6"
      ><FaAngleRight class="text-secondary-600" /></button>
    </form>
    <!-- Dice -->
    <DiceRoller on:diceRoll={diceRollHandler} />
  </div>


</div>

<script lang="ts">
	import { currentUser, pb } from "$lib/pocketbase";
	import type { CampaignsResponse, CharactersResponse } from "$lib/pocketbase-types";
	import type { ChatMessage, DieRollChat } from "$lib/types";
	import { io } from '$lib/webSocketConnection';
	import { createChatMessage, getCampaignChat } from "$models/campaign_chat";
	import { onMount, tick } from "svelte";
  // @ts-ignore
  import FaAngleRight from 'svelte-icons/fa/FaAngleRight.svelte'
	import CampaignChatMessage from "./CampaignChatMessage.svelte";
	import DiceRoller from "../dice/DiceRoller.svelte";
  import { DiceRoll } from '@dice-roller/rpg-dice-roller';
  import { v4 as uuidv4 } from 'uuid'
	import { getCharacterAvatarThumb } from "$models/character";


  export let campaign: CampaignsResponse

  let myCharacter: CharactersResponse = campaign.expand.characters?.find(c => c.creator === $currentUser?.id)
  const characterName: string = myCharacter?.name || $currentUser?.username
  const characterAvatar: string = myCharacter !== undefined ? getCharacterAvatarThumb(myCharacter) : ""

  let chatMessage: string
  let messages: ChatMessage[] = []
  let element: HTMLDivElement

  async function scrollToBottom(node: HTMLDivElement) {
    node?.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  }

  function diceRollHandler({detail: {die, total, amount}}: {detail: {die: string, total: string, amount: number}}) {

    rollDiceToChat(total, die, amount)
  }

  async function rollDiceToChat(total: string, die: string, amount: number) {

    const roll = new DiceRoll(total);
    let dieRolls: DieRollChat[] = []

    const currentRoll: {output: string, rolls: DiceRoll[]} = JSON.parse(roll.export() || "{}")


    currentRoll.rolls.forEach(globalRoll => {
      globalRoll.rolls.forEach(localRoll => {
        dieRolls = [...dieRolls, {
          id: uuidv4(),
          // @ts-ignore
          value: localRoll.value,
          die: die
        }]
      })
    })

    await sendMessage(`/roll-result ${JSON.stringify(dieRolls)}`)
  }

  async function sendMessage(messageString: string = "") {

    if (messageString !== "") {
      const campaignChatMessage = await createChatMessage({
        campaign: campaign.id,
        character: myCharacter?.id || "",
        message: messageString
      })
      const message = {
        campaignId: campaign.id,
        characterName: characterName,
        message: messageString,
        messageId: campaignChatMessage.id,
        creatorId: $currentUser?.id || "",
        characterAvatar: characterAvatar,
      }
      io.emit('campaignChat', message);
      chatMessage = ""
    }
  }

  onMount(async () => {

    io.emit('create', `campaign-chat-room-${campaign.id}`);

    messages = (await getCampaignChat(campaign.id)).map(message => {
      return {
        characterName: campaign.expand.characters.find(c => c.id === message.character)?.name || message.expand.creator.username,
        message: message.message,
        messageId: message.id,
        creatorId: message.creator,
        isGm: message.creator === campaign.creator,
        time: message.created,
        campaignId: campaign.id,
        characterAvatar: message.expand.character?.avatar ? getCharacterAvatarThumb(message.expand.character) : ""
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

<div class="h-full flex flex-col">

  <div
    class="w-full overflow-y-auto select-text"
    bind:this={element}
  >
    <div class="space-y-3">
      {#each messages as message(message.messageId)}
        <CampaignChatMessage {message} />
      {/each}
    </div>
  </div>

  <div class="my-3">
    <form class="flex my-3 mx-2" on:submit|preventDefault={() => sendMessage(chatMessage)}>
      <textarea class="input resize-none" bind:value={chatMessage} placeholder="Type here"></textarea>
      <button type="submit"
        class="btn btn-icon btn-icon-sm variant-filled-tertiary h-6 w-6"
      ><FaAngleRight class="text-secondary-600" /></button>
    </form>
    <!-- Dice -->
    <DiceRoller on:diceRoll={diceRollHandler} />
  </div>


</div>

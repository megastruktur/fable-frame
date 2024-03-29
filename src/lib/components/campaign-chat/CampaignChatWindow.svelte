<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignChatResponse, CampaignsResponse, CharactersResponse } from "$lib/pocketbase-types";
	import type { ChatMessage, DieRollChat } from "$lib/types";
	import { createChatMessage, getCampaignChat, subscribeToCampaignChats } from "$models/campaign_chat";
	import { onDestroy, onMount, tick } from "svelte";
	import CampaignChatMessage from "./CampaignChatMessage.svelte";
	import DiceRoller from "../dice/DiceRoller.svelte";
  import { DiceRoll } from '@dice-roller/rpg-dice-roller';
  import { v4 as uuidv4 } from 'uuid'
	import { getCharacter, getCharacterAvatarThumb } from "$models/character";
	import type { UnsubscribeFunc } from "pocketbase";
	import CircleIconButton from "../global/CircleIconButton.svelte";
	import { sendCampaignChatMessage } from "$lib/utils";


  export let campaign: CampaignsResponse

  let myCharacter: CharactersResponse = campaign.expand.characters?.find(c => c.creator === $currentUser?.id)
  const characterName: string = myCharacter?.name || $currentUser?.username
  const characterAvatar: string = myCharacter !== undefined ? getCharacterAvatarThumb(myCharacter) : ""

  let chatMessage: string
  let messages: ChatMessage[] = []
  let element: HTMLDivElement
  let unsubscribeFromChat: UnsubscribeFunc

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
          die: die,
          color: "Secondary",
        }]
      })
    })

    await sendMessage(`/roll-result ${JSON.stringify(dieRolls)}`)
  }

  async function sendMessage(messageString: string = "") {

    if (messageString !== "") {
      await sendCampaignChatMessage(messageString, campaign.id, myCharacter?.id)
      chatMessage = ""
    }
  }

  async function subscribeToChat({action, record}: {action: string, record: CampaignChatResponse}) {
    console.log([action, record])

  let characterMessaged = await getCharacter(record.character)

  let message: ChatMessage = {
    campaignId: campaign.id,
    messageId: record.id,
    characterName: characterMessaged.name,
    message: record.message,
    time: record.updated,
    creatorId: record.creator,
    isGm: record.creator === campaign.creator,
    idUpdatedString: record.id + record.updated,
    characterAvatar: getCharacterAvatarThumb(characterMessaged),
  }

  // create
  if (action === "create") {

    messages = [...messages, message];
    await tick();
    scrollToBottom(element)
  }
  // edit
  else if (action === "update") {

    messages = [...messages.map(m => {
      if (m.messageId === record.id) {
        return message
      }
      return m
    })]
  }
  }

  onMount(async () => {

    unsubscribeFromChat = await subscribeToCampaignChats(subscribeToChat)

    messages = (await getCampaignChat(campaign.id)).map(message => {
      return {
        characterName: campaign.expand.characters?.find(c => c.id === message.character)?.name || message.expand.creator.username,
        message: message.message,
        messageId: message.id,
        creatorId: message.creator,
        isGm: message.creator === campaign.creator,
        time: message.created,
        campaignId: campaign.id,
        idUpdatedString: message.id + message.updated,
        characterAvatar: message.expand.character?.avatar ? getCharacterAvatarThumb(message.expand.character) : ""
      }
    })

    // Wait for data to populate
    await tick();
    scrollToBottom(element)
  });

  onDestroy(() => {
    if (unsubscribeFromChat !== undefined) {
      unsubscribeFromChat()
    }
    // io.off("campaignChatMessage")
    // io.off("campaignChatMessageEdited")
  })

</script>

<div class="h-full flex flex-col">

  <div
    class="w-full overflow-y-auto select-text"
    bind:this={element}
  >
    <div class="space-y-3">
      {#each messages as message(message.idUpdatedString)}
        <CampaignChatMessage {message} />
      {/each}
    </div>
  </div>

  <div class="mt-3 pb-3 bg-surface-700">
    <form class="flex my-3 mx-2 space-x-3" on:submit|preventDefault={() => sendMessage(chatMessage)}>
      <textarea class="textarea resize-none border-0" bind:value={chatMessage} placeholder="Type here"></textarea>

      <button type="submit">
        <CircleIconButton
          icon="i-[fa6-solid--angle-right]"
          color="variant-ghost-tertiary"
        />
      </button>
    </form>
    <!-- Dice -->
    <DiceRoller on:diceRoll={diceRollHandler} />
  </div>


</div>

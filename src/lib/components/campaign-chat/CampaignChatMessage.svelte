<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import type { ChatMessage, DieRollChat } from "$lib/types";
	import { imageUrlToImg } from "$lib/utils";
	import { Avatar } from "@skeletonlabs/skeleton";
	import DiceChat from "../dice/DiceChat.svelte";
  export let message: ChatMessage

  let dice: DieRollChat[] = []
  
  const rollResultPrefix = "/roll-result "
  const messageFormName = message.isGm ? "GM" : message.characterName.substring(0, 2).toUpperCase()
  const isMyMessage = message.creatorId === $currentUser?.id

  // If message.message has /roll-result prefix - parse as rolls
  // Roll: {value: number, die: string}
  if (message.message.startsWith(rollResultPrefix)) {
    diceParser(message)
  }
  const isDiceRoll = dice.length > 0

  function diceParser(message: ChatMessage) {
    dice = JSON.parse(message.message.replace(rollResultPrefix, ""))
  }

</script>


<div class="flex w-full px-2 {isMyMessage ? "justify-end" : "space-x-2"}">

  {#if !isMyMessage}
    <div class="w-10 h-10"><Avatar width="w-10" rounded="rounded-full" src={message.isGm ? "" : message.characterAvatar} initials={messageFormName} /></div>
  {/if}

  <div
    class="{isMyMessage ? "bg-tertiary-900" : "bg-surface-500"} rounded-2xl {isDiceRoll ? "px-3 py-2" : ""}">
    {#if isDiceRoll}
      <DiceChat {dice} {message} />
    {:else}
      {@html imageUrlToImg(message.message)}
    {/if}
  </div>
</div>

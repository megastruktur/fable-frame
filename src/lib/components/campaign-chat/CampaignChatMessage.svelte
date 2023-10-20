<script lang="ts">
	import type { ChatMessage, ColorForPicker, DieRollChat } from "$lib/types";
	import { imageUrlToImg } from "$lib/utils";
	import DiceChat from "../dice/DiceChat.svelte";
  export let message: ChatMessage

  let dice: DieRollChat[] = []
  
  const rollResultPrefix = "/roll-result "


  // If message.message has /roll-result prefix - parse as rolls
  // Roll: {value: number, die: string}
  if (message.message.startsWith(rollResultPrefix)) {
    diceParser(message)
  }

  function diceParser(message: ChatMessage) {
    dice = JSON.parse(message.message.replace(rollResultPrefix, ""))
  }

</script>


<div>
  <div class="{message.isGm ? "bg-error-400" : ""} p-1">{message.isGm ? "GM" : message.characterName}</div>
  <div class="w-max-full p-1 pl-3 bg-surface-900">
    {#if dice.length > 0}
      <DiceChat {dice} {message} />
    {:else}
      {@html imageUrlToImg(message.message)}
    {/if}
  </div>
</div>

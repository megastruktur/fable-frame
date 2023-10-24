<script lang="ts">
	import type { ChatMessage, DieRollChat } from "$lib/types";
	import { updateChatMessageWithSocket } from "$models/campaign_chat";
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
	import ColorPickerPopup from "../global/ColorPickerPopup.svelte";
	import { currentUser } from "$lib/pocketbase";
	import DiceIcon from "./DiceIcon.svelte";

  export let dice: DieRollChat[]
  export let message: ChatMessage

  const rollResultPrefix = "/roll-result "
  const allowOperationOnDie = $currentUser?.id === message.creatorId

  const colorPickerPopup: PopupSettings = {
    event: 'click',
    target: `colorPickerPopup-${message.idUpdatedString}`,
    placement: 'top',
    state: colorPickerPopupState,
  };

  const dieSize = {
    width: "w-12",
    height: "h-12",
  }

  let operationOnDieId: string = ""


  function colorPickerPopupState({state}: {state: boolean}) {
    if (state === false) {
      operationOnDieId = ""
    }
  }

  async function selectColorHandler({detail} : {detail: string}) {
    dice = [...dice.map(die => {
      if (die.id === operationOnDieId) {
        die.color = detail
      }
      return die
    })]
    message.message = rollResultPrefix + JSON.stringify(dice)
    operationOnDieId = ""
    await updateChatMessageWithSocket(message)
  }
</script>

<div class="card p-4 variant-filled-surface z-20" data-popup="colorPickerPopup-{message.idUpdatedString}">
  <ColorPickerPopup
    on:selectColor={selectColorHandler}
    />
  <div class="arrow variant-filled-surface" />
</div>

<div class="space-x-1 flex">
  {#each dice as die(die.id)}
    {#if allowOperationOnDie}

      <button
        on:click={() => operationOnDieId = die.id}
        use:popup={colorPickerPopup}
      >
        {#key die.color}
          <DiceIcon {die} {dieSize} />
        {/key}
      </button>
    {:else}
      <DiceIcon {die} {dieSize} />
    {/if}

    <!-- editable={message.creatorId === $currentUser?.id} -->
  {/each}
</div>


<script lang="ts">
	import type { ChatMessage, ColorForPicker, DieRollChat } from "$lib/types";
	import { updateChatMessage } from "$models/campaign_chat";
	import type { PopupSettings } from "@skeletonlabs/skeleton";
	import ColorPickerPopup from "../global/ColorPickerPopup.svelte";
	import DieRolledToChat from "./DieRolledToChat.svelte";
	import { currentUser } from "$lib/pocketbase";

  export let dice: DieRollChat[]
  export let message: ChatMessage

  const rollResultPrefix = "/roll-result "


  const colorPickerPopup: PopupSettings = {
    event: 'click',
    target: 'colorPickerPopup',
    placement: 'top',
    state: colorPickerPopupState,
  };

  let operationOnDieId: string = ""


  function colorPickerPopupState({state}: {state: boolean}) {
    if (state === false) {
      operationOnDieId = ""
    }
  }
  
  function selectDieHandler({detail: {id}}: {detail: {id: string}}) {
    operationOnDieId = id
  }

  async function selectColorHandler({detail} : {detail: ColorForPicker}) {
    dice = [...dice.map(die => {
      if (die.id === operationOnDieId) {
        die.color = `${detail.bg} ${detail.text}`
      }
      return die
    })]
    message.message = rollResultPrefix + JSON.stringify(dice)
    operationOnDieId = ""
    await updateChatMessage(message.messageId, {message: message.message})
  }

</script>

<div class="card p-4 variant-filled-surface" data-popup="colorPickerPopup">
  <ColorPickerPopup
    on:selectColor={selectColorHandler}
    />
  <div class="arrow variant-filled-surface" />
</div>

<div class="space-x-1">
  {#each dice as die(die.id)}
    <DieRolledToChat
      editable={message.creatorId === $currentUser?.id}
      selectedDieId={operationOnDieId} colorPickerPopupSettings={colorPickerPopup}
      on:selectDie={selectDieHandler} {die} />
  {/each}
</div>


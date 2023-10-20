<script lang="ts">
	import type { DieRollChat } from "$lib/types";
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";

  export let die: DieRollChat
  export let selectedDieId: string
  export let colorPickerPopupSettings: PopupSettings

  let selected: boolean = selectedDieId === die.id

  const dispatch = createEventDispatcher()

  function selectDieHandler() {
    dispatch("selectDie", {
      id: die.id,
    })
  }
</script>

<button
  on:click={selectDieHandler}
  use:popup={colorPickerPopupSettings}
  class="p-0.5 px-1 {die.die} {die.color !== undefined ? die.color : "bg-tertiary-400 text-white" }">{die.value}</button>

<script lang="ts">
	import type { DieRollChat } from "$lib/types";
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";

  export let die: DieRollChat
  export let selectedDieId: string
  export let colorPickerPopupSettings: PopupSettings
  export let editable: boolean

  const dispatch = createEventDispatcher()

  function selectDieHandler() {
    dispatch("selectDie", {
      id: die.id,
    })
  }
</script>

{#if editable}
  <button
    on:click={selectDieHandler}
    use:popup={colorPickerPopupSettings}
    class="p-1 w-7 leading-6  {die.die} {die.color !== undefined ? die.color : "bg-tertiary-400 text-surface-500" }">{die.value}</button>
{:else}
  <button
    class="p-1 w-7 leading-6  {die.die} {die.color !== undefined ? die.color : "bg-tertiary-400 text-surface-500" }">{die.value}</button>
{/if}

<script lang="ts">
	import CircleIconButton from "./CircleIconButton.svelte";
	import { characterRoll } from "$lib/stores";
	import type { Field } from "$lib/types";
	import { getModalStore } from "@skeletonlabs/skeleton";

  export let field: Field
  export let systemName: string

  const modalStore = getModalStore()

  function fieldRoll() {
    const rollData = $characterRoll
    rollData.systemName = systemName
    rollData.field = field
    characterRoll.set(rollData)
    modalStore.close()
  }
</script>

<CircleIconButton
  on:click={fieldRoll}
  icon="i-[fa6-solid--dice]"
  color="variant-ghost-warning hover:bg-surface-800"
/>

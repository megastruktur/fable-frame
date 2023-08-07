<script lang="ts">
  import { editMode } from "$lib/stores"
	import CharacterSheetTab from '$lib/components/CharacterSheetTab.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
  
  export let matches: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
</script>

<div class="flex {matches ? "flex-col items-center" : "justify-center"}">

  {#each Object.keys(tabs) as tabName}
    <CharacterSheetTab tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {matches} />
  {/each}

  {#if $editMode}
  <CircleAdd type="tab" />
  {/if}
</div>

<script lang="ts">
  import { editMode } from "$lib/stores"
	import type { Field } from "$lib/types";
	import CharacterSheetTab from '$lib/components/CharacterSheetTab.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import StatsTab from './StatsTab.svelte';

  export let matches: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
  
</script>

<div class="flex {matches ? "flex-col items-center" : "justify-center flex-wrap"}">

  {#each Object.keys(tabs) as tabName}
    {#if tabName === "statsnsaves"}
      <StatsTab tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {matches} />
    {:else}

      <CharacterSheetTab tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {matches} />
    {/if}
  {/each}

  {#if $editMode}
  <CircleAdd type="tab" />
  {/if}
</div>

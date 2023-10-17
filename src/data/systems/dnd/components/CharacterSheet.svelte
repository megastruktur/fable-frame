<script lang="ts">
	import type { Field } from "$lib/types";
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import StatsTab from './StatsTab.svelte';
	import type { CharactersResponse } from "$lib/pocketbase-types";

  export let matches: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
  export let editMode: boolean = false
  export let character: CharactersResponse
  
</script>

{#each Object.keys(tabs) as tabName}
  {#if tabName === "statsnsaves"}
    <StatsTab tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {matches} {editMode} />
  {:else}
    {@const sortable = (tabName === "skill" || tabName === "combat ")}
    <CharacterSheetTab on:fieldAdd on:fieldRemove on:fieldUpdate {character} tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {matches} {editMode} editable={false} sortable={sortable} />
  {/if}
{/each}

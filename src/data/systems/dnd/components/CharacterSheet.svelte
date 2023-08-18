<script lang="ts">
	import type { Field } from "$lib/types";
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import StatsTab from './StatsTab.svelte';

  export let matches: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
  export let editMode: boolean = false
  
</script>

{#each Object.keys(tabs) as tabName}
  {#if tabName === "statsnsaves"}
    <StatsTab tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {matches} {editMode} />
  {:else}
    {@const sortable = (tabName === "skill" || tabName === "combat ")}
    <CharacterSheetTab tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {matches} {editMode} editable={false} sortable={sortable} />
  {/if}
{/each}

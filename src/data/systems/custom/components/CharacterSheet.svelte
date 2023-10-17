<script lang="ts">
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { CharactersResponse } from '$lib/pocketbase-types';
  
  export let matches: boolean
  export let compactVersion: boolean = false
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
  export let editMode: boolean = false
  export let character: CharactersResponse
</script>

{#each Object.keys(tabs) as tabName}
  <CharacterSheetTab {character} on:fieldRemove on:fieldUpdate on:fieldAdd tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {compactVersion} {matches} {editMode} />
{/each}

{#if editMode}
<CircleAdd {character} type="tab" on:fieldAdd />
{/if}

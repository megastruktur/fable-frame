<script lang="ts">
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
  
  export let matches: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
  export let editMode: boolean = false
</script>

{#each Object.keys(tabs) as tabName}
  <CharacterSheetTab tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {matches} {editMode} />
{/each}

{#if editMode}
<CircleAdd type="tab" />
{/if}

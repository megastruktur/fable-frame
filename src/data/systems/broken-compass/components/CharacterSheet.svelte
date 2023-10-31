<script lang="ts">
	import type { Field } from "$lib/types";
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import BcSkillsTab from './BCSkillsTab.svelte';
	import BcFeelTab from "./BCFeelTab.svelte";
	import BcGeneralTab from "./BCGeneralTab.svelte";
	import type { CharactersResponse } from "$lib/pocketbase-types";

  export let matches: boolean
  export let compactVersion: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: { [key: string]: Field }
  export let editMode: boolean = false
  export let character: CharactersResponse
  
</script>

<BcSkillsTab on:fieldRemove on:fieldUpdate on:fieldAdd {compactVersion} {matches} fields={[...tabsContent["skill"]]} tab={tabs["skill"]} {activeTabName} {editMode} />

<BcFeelTab {character} on:fieldRemove on:fieldUpdate on:fieldAdd {compactVersion} {matches} fields={[...tabsContent["feel"]]} {activeTabName} {editMode} tab={tabs["feel"]} />

<!-- General -->
<BcGeneralTab {character} on:fieldRemove on:fieldUpdate on:fieldAdd {compactVersion} tab={tabs["general"]} fields={[...tabsContent["general"]]} bind:activeTabName={activeTabName} {matches} {editMode} />

<!-- Inventory -->
<CharacterSheetTab {character} on:fieldRemove on:fieldUpdate on:fieldAdd {compactVersion} tab={tabs["inventory"]} fields={[...tabsContent["inventory"]]} bind:activeTabName={activeTabName} {matches} {editMode} />

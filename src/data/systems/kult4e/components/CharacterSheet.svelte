<script lang="ts">
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { CharactersResponse } from '$lib/pocketbase-types';
	import K4eSkillsTab from './K4eSkillsTab.svelte';
	import K4eGeneralTab from './K4eGeneralTab.svelte';
  
  export let matches: boolean
  export let compactVersion: boolean = false
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
  export let editMode: boolean = false
  export let character: CharactersResponse
</script>

<!-- {#each Object.keys(tabs) as tabName}
  <CharacterSheetTab {character} on:fieldRemove on:fieldUpdate on:fieldAdd tab={tabs[tabName]} fields={[...tabsContent[tabName]]} bind:activeTabName={activeTabName} {compactVersion} {matches} {editMode} />
{/each} -->

<!-- General Tab -->
<!-- Archetype(tag) Occupation(tag), Appearance(text) -->
<K4eGeneralTab
  bind:activeTabName={activeTabName}
  {compactVersion}
  {matches}
  {editMode}
  {character}
  fields={[...tabsContent["general"]]}
  tab={tabs["general"]}
  on:fieldRemove
  on:fieldUpdate
  on:fieldAdd />

<!-- Conditions -->
<!-- Stability(counter), Serous Wounds (section), Critical Wounds (section) -->

<!-- Relative Merits -->
<!-- Advantages (section, tags), Disadvantages (section, tags) -->

<!-- Skills -->
<!-- Skill tree, counterNum modified -->
<K4eSkillsTab on:fieldRemove on:fieldUpdate on:fieldAdd tab={tabs["skills"]} fields={[...tabsContent["skills"]]} bind:activeTabName={activeTabName} {compactVersion} {matches} {editMode} />

<!-- Story -->
<!-- Dark Secrets (section + tags) Relations (section + counters++), Dramatic Hooks (section, text) -->

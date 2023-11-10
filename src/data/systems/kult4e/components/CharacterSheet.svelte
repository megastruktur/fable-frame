<script lang="ts">
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { CharactersResponse } from '$lib/pocketbase-types';
	import K4eSkillsTab from './K4eSkillsTab.svelte';
	import K4eGeneralTab from './K4eGeneralTab.svelte';
	import K4eTraitsTab from './K4eTraitsTab.svelte';
  
  export let matches: boolean
  export let compactVersion: boolean = false
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
  export let editMode: boolean = false
  export let character: CharactersResponse

  const tabWidth: string = "w-96"
</script>

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
  {tabWidth}
  on:fieldRemove
  on:fieldUpdate
  on:fieldAdd />

<!-- Conditions -->
<!-- Stability(counter), Serous Wounds (section), Critical Wounds (section) -->

<!-- Traits -->
<!-- Advantages (section, tags), Disadvantages (section, tags) -->
<K4eTraitsTab bind:activeTabName={activeTabName}
  {compactVersion}
  {matches}
  {editMode}
  {character}
  fields={[...tabsContent["traits"]]}
  tab={tabs["traits"]}
  {tabWidth}
  on:fieldRemove
  on:fieldUpdate
  on:fieldAdd />

<!-- Skills -->
<!-- Skill tree, counterNum modified -->
<K4eSkillsTab on:fieldRemove on:fieldUpdate on:fieldAdd
  {tabWidth}
  tab={tabs["skills"]}
  fields={[...tabsContent["skills"]]}
  bind:activeTabName={activeTabName}
  {compactVersion}
  {matches}
  {editMode} />

<!-- Story -->
<!-- Dark Secrets (section + tags) Relations (section + counters++), Dramatic Hooks (section, text) -->

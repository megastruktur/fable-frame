<script lang="ts">
	import type { Field } from "$lib/types";
	import type { CharactersResponse } from '$lib/pocketbase-types';
	import K4eSkillsTab from './tabs/K4eSkillsTab.svelte';
	import K4eGeneralTab from './tabs/K4eGeneralTab.svelte';
	import K4eTraitsTab from './tabs/K4eTraitsTab.svelte';
	import K4eConditionsTab from './tabs/K4eConditionsTab.svelte';
	import K4eGearTab from './tabs/K4eGearTab.svelte';
	import K4eRollButton from './parts/K4eRollButton.svelte';
  
  export let matches: boolean
  export let compactVersion: boolean = false
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: {[key: string]: Field}
  export let editMode: boolean = false
  export let character: CharactersResponse

  const tabWidth: string = "md:w-96 w-full"
  
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
<K4eConditionsTab bind:activeTabName={activeTabName}
  {compactVersion}
  {matches}
  {editMode}
  {character}
  fields={[...tabsContent["conditions"]]}
  tab={tabs["conditions"]}
  {tabWidth}
  on:fieldRemove
  on:fieldUpdate
  on:fieldAdd />

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

<!-- Gear -->
<!-- Weapons, Armor, other gear -->
<K4eGearTab
  bind:activeTabName={activeTabName}
  {compactVersion}
  {matches}
  {editMode}
  {character}
  fields={[...tabsContent["gear"]]}
  tab={tabs["gear"]}
  {tabWidth}
  on:fieldRemove
  on:fieldUpdate
  on:fieldAdd />

{#if !compactVersion}
  <div class="fixed right-3 bottom-3 md:right-5"><K4eRollButton /></div>
{/if}

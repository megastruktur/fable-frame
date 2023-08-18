<script lang="ts">
  import { characterStore } from "$lib/stores"
	import type { Field } from "$lib/types";
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import BcSkillsTab from './BCSkillsTab.svelte';
	import BcFeelTab from "./BCFeelTab.svelte";

  export let matches: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: { [key: string]: Field }
  export let editMode: boolean = false
  
  function updateField(event: { detail: Field }) {
    characterStore.setFieldValue(event.detail.id, event.detail.value)
  }
  
</script>

<BcSkillsTab {matches} on:fieldUpdate={updateField} fields={[...tabsContent["skill"]]} {activeTabName} {editMode} />

<BcFeelTab {matches} fields={[...tabsContent["feel"]]} {activeTabName} {editMode} />

<!-- General -->
<CharacterSheetTab tab={tabs["general"]} fields={[...tabsContent["general"]]} bind:activeTabName={activeTabName} {matches} {editMode} />

<!-- Inventory -->
<CharacterSheetTab tab={tabs["inventory"]} fields={[...tabsContent["inventory"]]} bind:activeTabName={activeTabName} {matches} {editMode} />

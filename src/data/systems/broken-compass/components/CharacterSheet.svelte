<script lang="ts">
  import { characterStore } from "$lib/stores"
	import type { Field } from "$lib/types";
	import CharacterSheetTab from '$lib/components/tabs/CharacterSheetTab.svelte';
	import BcSkillsTab from './BCSkillsTab.svelte';
	import BcFeelTab from "./BCFeelTab.svelte";
	import BcGeneralTab from "./BCGeneralTab.svelte";

  export let matches: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: { [key: string]: Field }
  export let editMode: boolean = false
  
  function updateField(event: { detail: {field: Field, operation: string} }) {
    characterStore.setFieldValue(event.detail.field.id, event.detail.field.value)
  }
  
</script>

<BcSkillsTab {matches} on:fieldUpdate={updateField} fields={[...tabsContent["skill"]]} {activeTabName} {editMode} />

<BcFeelTab {matches} fields={[...tabsContent["feel"]]} {activeTabName} {editMode} />

<!-- General -->
<BcGeneralTab tab={tabs["general"]} fields={[...tabsContent["general"]]} bind:activeTabName={activeTabName} {matches} {editMode} />

<!-- Inventory -->
<CharacterSheetTab tab={tabs["inventory"]} fields={[...tabsContent["inventory"]]} bind:activeTabName={activeTabName} {matches} {editMode} />

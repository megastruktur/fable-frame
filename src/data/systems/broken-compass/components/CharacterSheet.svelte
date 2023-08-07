<script lang="ts">
  import { characterStore } from "$lib/stores"
	import type { Field } from "$lib/types";
	import CharacterSheetTab from '$lib/components/CharacterSheetTab.svelte';
	import BcSkillsTab from './BCSkillsTab.svelte';
	import BcFeelTab from "./BCFeelTab.svelte";

  export let matches: boolean
  export let tabsContent: { [key: string]: Field[] }
  export let activeTabName: string
  export let tabs: { [key: string]: Field }
  
  function updateField(event: { detail: Field }) {
    characterStore.setFieldValue(event.detail.id, event.detail.value)
  }
  
</script>

<div class="flex {matches ? "flex-col items-center" : "justify-center"}">

  <BcSkillsTab {matches} on:fieldUpdate={updateField} fields={[...tabsContent["skill"]]} tabActive={activeTabName === "skill"} />

  <BcFeelTab {matches} fields={[...tabsContent["feel"]]} tabActive={activeTabName === "feel"} />

  <!-- General -->
  <CharacterSheetTab tab={tabs["general"]} fields={[...tabsContent["general"]]} bind:activeTabName={activeTabName} {matches} />

  <!-- Inventory -->
  <CharacterSheetTab tab={tabs["inventory"]} fields={[...tabsContent["inventory"]]} bind:activeTabName={activeTabName} {matches} />
</div>

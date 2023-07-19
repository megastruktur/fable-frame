<script lang="ts">
  import { onDestroy } from 'svelte'
  import MediaQuery, { createMediaStore } from 'svelte-media-queries'
	import { getFieldFromListByName, getFieldsByGroup } from "$lib/characterFieldsOperations";
	import fieldDragStart from "$lib/fieldDragStart";
	import type { CharactersResponse } from "$lib/pocketbase-types";
  import { characterStore, editMode } from "$lib/stores"
	import type { Field } from "$lib/types";
	import FieldRender from '$lib/components/FieldRender.svelte';
	import CircleAdd from '$lib/components/CircleAdd.svelte';

  const query = {
    "mobile": "(max-width: 480px)",
    "tablet": "(min-width: 480px) and (max-width: 768px)",
    "largeTablet": "(min-width: 768px) and (max-width: 1200px)",
    "desktop": "(min-width: 1200px)",
    "other": [
      "(min-width: 1200px)",
      "(max-height: 900px)"
    ],
    "themes": {
      "dark": "(prefers-color-scheme: dark)",
      "light": "(prefers-color-scheme: light)"
    }
  } //  

  const matches = createMediaStore(query) //The type of the store will completely repeat the query
  
  onDestroy(() => matches.destroy()) //Stop events for calculation

  let activeTab: string = "general"
  let generals: Field[] = []
  
  characterStore.subscribe((character: CharactersResponse) => {
    generals = getFieldsByGroup("general", character.fields)
  })
  
  function updateField(event: { detail: Field }) {
    characterStore.setFieldValue(event.detail.id, event.detail.value)
  }

  function setActiveTab(tab: string) {
    activeTab = tab
  }
  
</script>

<MediaQuery query='(max-width: 1200px)' let:matches>
<div class="flex {matches ? "flex-col items-center" : "justify-center"}">

  {#if matches}
  {/if}

  <!-- Skills -->
  <section
    class="mx-3 {matches && activeTab !== "skill" ? "hidden" : ""}">
    <div class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md">
      {#each generals as field}
        <FieldRender field={field} />
      {/each}
      {#if $editMode}
      <CircleAdd group="general" type="text" />
      {/if}
    </div>
  </section>
</div>
</MediaQuery>

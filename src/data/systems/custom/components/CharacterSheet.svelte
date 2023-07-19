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

  let activeTab: string = "skill"

  let action: Field
  let fight: Field
  let leadership: Field
  let stunt: Field
  let guts: Field
  let cool: Field
  let drive: Field
  let shoot: Field
  let knowledge: Field
  let culture: Field
  let first_aid: Field
  let tech: Field
  let society: Field
  let charm: Field
  let eloquence: Field
  let observation: Field
  let wild: Field
  let scout: Field
  let survival: Field
  let tough: Field
  let crime: Field
  let alertF: Field
  let dexterity: Field
  let stealth: Field

  let feelings: Field[]
  let generals: Field[]

  let fieldRemove: boolean = false
  
  characterStore.subscribe((character: CharactersResponse) => {
    // load fields here
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
      <p>My character fields here!</p>
    </div>
  </section>
</div>
</MediaQuery>

<script lang="ts">
	import CharacterSheetTabWrapper from "$lib/components/tabs/CharacterSheetTabWrapper.svelte";
import FieldRender from "$lib/components/field-renders/FieldRender.svelte";
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";


  export let tab: Field
  export let fields: Field[]
  export let activeTabName: string
  // matches the media queries:
  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let editMode: boolean = false

</script>

<CharacterSheetTabWrapper {matches} {activeTabName}
removable={false} {editMode}
tabName={tab.name}>

  <h2 class="h2 text-center mb-3">
    <span>{tab.label}</span>
  </h2>
  <hr />
  <!-- Draggable section -->
  <div
    class="mt-3"
    >
    <h3 class="h3 text-center">Stats</h3>
    <hr class="my-3" />
    <!-- Stats -->
    {#each fields as field(field.id)}
    {@const isSave = field.name.includes("Save") ? true : false}
    <!-- Modifier calculation -->
    {@const modifier = (field.value && !isSave) ? Math.floor((parseInt(field.value) - 10)/2) : 0 }
      {#if !isSave}
      <div class="flex items-center mb-3">
        {#if !editMode}
          <div class="h4 w-full flex flex-row justify-between">
            <div class="flex">{field.label}</div>
            <button
              class="flex text-secondary-500"
              >{modifier > 0 ? "+" : ""}{modifier}
            </button>
          </div>
        {:else}        
          <FieldRender field={field} {editMode} />
        {/if}
      </div>
      {/if}
    {/each}

    <!-- Saves -->
    <h3 class="h3 text-center">Saves</h3>
    <hr class="my-3" />
    {#each fields as field(field.id)}
    {@const isSave = field.name.includes("Save") ? true : false}
      {#if isSave}
      <div class="flex items-center mb-3">    
        <FieldRender field={field} {editMode} />
      </div>
      {/if}
    {/each}
  </div>
</CharacterSheetTabWrapper>

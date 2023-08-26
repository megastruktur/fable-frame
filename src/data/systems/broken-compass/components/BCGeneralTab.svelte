<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
	import CharacterSheetTabWrapper from "$lib/components/tabs/CharacterSheetTabWrapper.svelte"
	import { getFieldsByGroup } from '$lib/characterFieldsOperations';

  export let fields: Field[]
  export let tab: Field
  export let activeTabName: string
  // matches the media queries:
  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let editMode: boolean = false

  let removable: boolean = (tab.removable !== undefined) ? tab.removable : true

  let tags: Field[]
  let expertise: Field[]
  let general: Field[]
  
  $: {
    tags = getFieldsByGroup("tag", fields)
    expertise = getFieldsByGroup("expertise", fields)
    general = getFieldsByGroup("general", fields)
  }

</script>

<CharacterSheetTabWrapper {matches} {activeTabName}
  {removable} {editMode}
  tabName={tab.name}>
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />
  <!-- Draggable section -->
  <div
    class="mt-3"
    >
    {#if fields.length > 0}

      <!-- General -->
      {#each general as field(field.id)}
      <div class="flex items-center mb-3">
        <FieldRender field={field} {editMode} />
      </div>
      {/each}

      <!-- Tags -->
      <h3 class="h3 my-2">Tags</h3>
      <hr class="w-full" />
      <div class="flex items-center my-3">
        {#each tags as field(field.id)}
          <FieldRender classes="variant-filled" field={field} {editMode} editable={false} />
        {/each}
      </div>

      <!-- Expertise -->
      <h3 class="h3 my-2">Expertise</h3>
      <hr class="w-full" />
      <div class="flex flex-wrap my-3">
        {#each expertise as field(field.id)}
          <FieldRender classes="variant-filled" field={field} {editMode} editable={false} />
        {/each}
      </div>

    {/if}
  </div>
  <!-- Circle is Character Sheet dependent to should be in ChSh -->
  {#if editMode}
  <CircleAdd compendium="broken-compass" compendiumGroup="expertise" group={tab.name} />
  {/if}
</CharacterSheetTabWrapper>



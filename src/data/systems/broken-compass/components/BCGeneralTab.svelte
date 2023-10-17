<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
	import CharacterSheetTabWrapper from "$lib/components/tabs/CharacterSheetTabWrapper.svelte"
	import { getFieldByNameFromList, getFieldsByGroup } from '$lib/characterFieldsOperations';
	import type { CharactersResponse } from '$lib/pocketbase-types';

  export let fields: Field[]
  export let tab: Field
  export let activeTabName: string
  // matches the media queries:
  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let editMode: boolean = false
  export let character: CharactersResponse

  let removable: boolean = (tab.removable !== undefined) ? tab.removable : true

  let tags: Field[]
  let expertise: Field[]
  let workplace: Field
  let homeland: Field
  let heritage: Field
  let wordsToLiveBy: Field
  let luck: Field
  let luckCoin: Field
  
  $: {
    tags = getFieldsByGroup("tag", fields)
    expertise = getFieldsByGroup("expertise", fields)

    workplace = getFieldByNameFromList(fields, "workplace")
    homeland = getFieldByNameFromList(fields, "homeland")
    heritage = getFieldByNameFromList(fields, "heritage")
    wordsToLiveBy = getFieldByNameFromList(fields, "words-to-live-by")
    luck = getFieldByNameFromList(fields, "luck")
    luckCoin = getFieldByNameFromList(fields, "luck-coin")
  }

</script>

<CharacterSheetTabWrapper {matches} {activeTabName}
  {removable} {editMode}
  tabName={tab.name}>
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <!-- Draggable section -->
  <div
    class="mt-3"
    >
    {#if fields.length > 0}

      <!-- General -->
      <h3 class="h3 my-2 text-center">Your Luck</h3>
      <hr class="w-full mb-2" />
      <div class="flex items-center mb-3">
        <FieldRender on:fieldRemove on:fieldUpdate field={luck} {editMode} valueStyle={"gold"} />
      </div>
      <div class="flex items-center mb-3">
        <FieldRender on:fieldRemove on:fieldUpdate field={luckCoin} {editMode} valueStyle={"gold"} />
      </div>

      <h3 class="h3 my-2 text-center">Info</h3>
      <hr class="w-full mb-2" />
      <div class="flex items-center mb-3">
        <FieldRender on:fieldRemove on:fieldUpdate field={wordsToLiveBy} {editMode} valueStyle="blockquote" />
      </div>
      <div class="flex items-center mb-3">
        <FieldRender on:fieldRemove on:fieldUpdate field={workplace} {editMode} valueStyle="ml-3" />
      </div>
      <div class="flex items-center mb-3">
        <FieldRender on:fieldRemove on:fieldUpdate field={homeland} {editMode} valueStyle="ml-3" />
      </div>
      <div class="flex items-center mb-3">
        <FieldRender on:fieldRemove on:fieldUpdate field={heritage} {editMode} valueStyle="ml-3" />
      </div>

      <!-- Tags -->
      <h3 class="h3 my-2 text-center">Tags</h3>
      <hr class="w-full mb-2" />
      <div class="flex items-center my-3">
        {#each tags as field(field.id)}
          <FieldRender on:fieldRemove on:fieldUpdate classes="variant-filled" field={field} {editMode} editable={false} />
        {/each}
      </div>

      <!-- Expertise -->
      <h3 class="h3 my-2 text-center">Expertise</h3>
      <hr class="w-full mb-2" />
      <div class="flex flex-wrap my-3">
        {#each expertise as field(field.id)}
          <FieldRender on:fieldRemove on:fieldUpdate classes="variant-filled" field={field} {editMode} editable={false} />
        {/each}
      </div>

    {/if}
  </div>
  <!-- Circle is Character Sheet dependent to should be in ChSh -->
  {#if editMode}
  <CircleAdd {character} compendium="broken-compass" compendiumGroup="expertise" group={tab.name} on:fieldAdd />
  {/if}
</CharacterSheetTabWrapper>



<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import TraitField from './fields/TraitField.svelte';
  import {flip} from "svelte/animate"

	import type { CharactersResponse } from '$lib/pocketbase-types';
	import CharacterSheetTabWrapper from '$lib/components/tabs/CharacterSheetTabWrapper.svelte';
	import CircleAddCompendium from '$lib/components/circle-add/CircleAddCompendium.svelte';
	import K4eTraitsAddModal from './modals/K4eTraitsAddModal.svelte';

  export let fields: Field[]
  export let tab: Field
  export let activeTabName: string
  // matches the media queries:
  export let compactVersion: boolean = false
  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let editMode: boolean = false
  export let editable: boolean = true
  export let sortable: boolean = false
  export let character: CharactersResponse

  const flipDurationMs: number = 300
  const addButtonClasses: string = "p-1"  

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} {editMode} {tab} on:fieldRemove >
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />

  <div class="mt-3">

    <div>
      <div class="flex items-center justify-between">
        <h4 class="h4">Advantages</h4>
        {#if editMode}
          <CircleAddCompendium on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="advantages" classes={addButtonClasses} modalComponent={K4eTraitsAddModal} />
        {/if}
      </div>
      <div class="">
        {#each fields as field(field.name)}
          {#if field?.data?.type === "advantage"}
            <FieldRender
              on:fieldRemove field={field} {editMode} editable={true}
              fieldComponent={TraitField}
              characterId={character.id}
              classes="w-full"
            />
          {/if}
        {/each}
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between">
        <h4 class="h4">Disadvantages</h4>
        {#if editMode}
          <CircleAddCompendium on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="disadvantages" classes={addButtonClasses} modalComponent={K4eTraitsAddModal} />
        {/if}
      </div>
      <div class="">
        {#each fields as field(field.name)}
          {#if field?.data?.type === "disadvantage"}
            <FieldRender
              on:fieldRemove field={field} {editMode} editable={true}
              characterId={character.id}
              fieldComponent={TraitField}
              classes="w-full"
            />
          {/if}
        {/each}
      </div>
    </div>

  </div>

</CharacterSheetTabWrapper>



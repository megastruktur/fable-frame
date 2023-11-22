<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import TraitField from '../fields/TraitField.svelte';
  import {flip} from "svelte/animate"

	import type { CharactersResponse } from '$lib/pocketbase-types';
	import CharacterSheetTabWrapper from '$lib/components/tabs/CharacterSheetTabWrapper.svelte';
	import CircleAddCompendium from '$lib/components/circle-add/CircleAddCompendium.svelte';
	import K4eAddItemModal from '../modals/K4eAddItemModal.svelte';
	import { getFieldsByGroup } from '$lib/characterFieldsOperations';

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
  export let tabWidth: string

  let advantages: Field[] = getTraits("advantage", fields)
  let disadvantages: Field[] = getTraits("disadvantage", fields)

  const flipDurationMs: number = 300
  const addButtonClasses: string = "p-1 w-full"

  function getTraits(type: string, fields: Field[]): Field[] {
    return fields.filter(field => field.data?.type === type) || []
  }

  $: {
    advantages = getTraits("advantage", fields)
    disadvantages = getTraits("disadvantage", fields)
  }

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} {editMode} {tab} on:fieldRemove width={tabWidth} >

  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />

  <div class="mt-3">

    <div>
      <h3 class="h3 text-center">Advantages</h3>

      {#if advantages.length > 0}
        <div class="space-y-2">
          {#each advantages as field(field.name)}
            <FieldRender
              on:fieldRemove field={field} {editMode} editable={true}
              fieldComponent={TraitField}
              characterId={character.id}
              classes="w-full bg-success-900"
            />
          {/each}
        </div>
      {:else if !editMode}
        <div class="text-center">-</div>
      {/if}

      {#if editMode}
        <CircleAddCompendium on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="advantages" classes={addButtonClasses} modalComponent={K4eAddItemModal} title="Select Advantage" />
      {/if}

    </div>

    <div class="mt-3">
      <h3 class="h3 text-center">Disadvantages</h3>

      {#if disadvantages.length > 0}
        {#each disadvantages as field(field.name)}
          <FieldRender
            on:fieldRemove field={field} {editMode} editable={true}
            characterId={character.id}
            fieldComponent={TraitField}
            classes="w-full bg-error-900"
          />
        {/each}
      {:else if !editMode}
        <div class="text-center">-</div>
      {/if}

      {#if editMode}
        <CircleAddCompendium on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="disadvantages" classes={addButtonClasses} modalComponent={K4eAddItemModal} title="Select disadvantage" />
      {/if}
    </div>

  </div>

</CharacterSheetTabWrapper>



<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import {flip} from "svelte/animate"

	import type { CharactersResponse } from '$lib/pocketbase-types';
	import CharacterSheetTabWrapper from '$lib/components/tabs/CharacterSheetTabWrapper.svelte';
	import CircleAddCompendium from '$lib/components/circle-add/CircleAddCompendium.svelte';
	import { getFieldsByGroup } from '$lib/characterFieldsOperations';
	import K4eGearCard from '../parts/K4eGearCard.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import K4eAddGearModal from '../modals/K4eAddGearModal.svelte';
  import {dndzone, type Options} from "svelte-dnd-action"

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

  const flipDurationMs: number = 300
  const addButtonClasses: string = "p-1 w-full"
  const dispatch = createEventDispatcher()

  let gear: Field[] = getFieldsByGroup("gear", fields)
  
  let options: Options

  // Reorder fields
    function handleDndConsider(e: any) {
    fields = e.detail.items
  }

  function handleDndFinalize(e: any) {
    let counter = 0
    e.detail.items.forEach((field: Field) => {
      field.weight = counter
      counter++
      dispatch("fieldUpdate", {
        field: field,
        operation: "reorder",
      })
    })
    fields = e.detail.items

    console.log({fields})
    console.log("Fields reordered")
  }

  $: {
    gear = getFieldsByGroup("gear", fields)

    options = {
      items: fields,
      dragDisabled: !editMode,
    }
  }

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} {editMode} {tab} on:fieldRemove width={tabWidth} >
  
  <h2 class="h2 text-center mb-3 py-1 variant-filled-surface shadow-sm shadow-black">{tab.label}</h2>

  <div class="mt-3">

    <!-- Weapons -->
    <div class="mt-3">

      {#if gear !== undefined}
      <div
        use:dndzone={options}
        on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
          {#each gear as g(g.id)}
            <div class="mx-auto w-80 mb-3">
              <FieldRender field={g} fieldComponent={K4eGearCard} {editMode}
                on:fieldRemove classes="card p-4 w-80" />
            </div>
          {/each}
      </div>
      {/if}

      <CircleAddCompendium
        on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="gear" classes={addButtonClasses} modalComponent={K4eAddGearModal} descriptionComponent={K4eGearCard} title="Pick a weapon" saveField={true} />

    </div>

  </div>
</CharacterSheetTabWrapper>



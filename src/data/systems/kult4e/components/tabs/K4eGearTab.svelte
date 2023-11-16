<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import CircleQuickAddField from '$lib/components/circle-add/CircleQuickAddField.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import {flip} from "svelte/animate"

	import type { CharactersResponse } from '$lib/pocketbase-types';
	import CharacterSheetTabWrapper from '$lib/components/tabs/CharacterSheetTabWrapper.svelte';
	import CircleAddCompendium from '$lib/components/circle-add/CircleAddCompendium.svelte';
	import { getFieldByNameFromList, getFieldsByGroup } from '$lib/characterFieldsOperations';
	import CircleAddField from '$lib/components/circle-add/CircleAddField.svelte';
	import K4eAddItemModal from '../modals/K4eAddItemModal.svelte';
	import K4eGearCard from '../parts/K4eGearCard.svelte';
	import { convertGearDataToFieldJson } from '$lib/utils';
	import { loadRpgSystemData } from '$models/rpg_system';
	import { onMount } from 'svelte';
	import K4eAddGearModal from '../modals/K4eAddGearModal.svelte';

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

  let gear: Field[] = getFieldsByGroup("gear", fields)

  // function getOccupationFieldList() {
  //   if (editMode && archetype !== undefined) {

  //     let occupationFields: Field[] = []
  //     if (archetype?.data?.occupation !== undefined) {
        

  //       archetype.data.occupation.forEach((occupation: string) => {
  //         occupationFields.push({
  //           name: occupation,
  //           label: occupation,
  //           type: "tag",
  //           group: "occupations",
  //           description: "",
  //           weight: 1,
  //           value: "",
  //           id: ""
  //         })
  //       })
  //     }
  //     return occupationFields
  //   }
  //   return []
  // }

  // onMount(async () => {
  //   const data = await loadRpgSystemData("kult4e", "armor")
  //   console.log(convertGearDataToFieldJson(data))
  // })

  // console.log(gear)

  $: {
    gear = getFieldsByGroup("gear", fields)
  }

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} {editMode} {tab} on:fieldRemove width={tabWidth} >
  
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />

  <div class="mt-3">

    <!-- Weapons -->
    <div class="mt-3">

      {#if gear !== undefined}
        {#each gear as g}
          <div class="mx-auto w-80 mb-3">
            <K4eGearCard field={g} />
          </div>
        {/each}
      {/if}

      <CircleAddCompendium
        on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="gear" classes={addButtonClasses} modalComponent={K4eAddGearModal} descriptionComponent={K4eGearCard} title="Pick a weapon" saveField={true} />

    </div>

  </div>
</CharacterSheetTabWrapper>



<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import CircleQuickAddField from '$lib/components/circle-add/CircleQuickAddField.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import {flip} from "svelte/animate"

  // @ts-ignore
	import { createEventDispatcher, onMount } from "svelte";
	import type { CharactersResponse } from '$lib/pocketbase-types';
	import CharacterSheetTabWrapper from '$lib/components/tabs/CharacterSheetTabWrapper.svelte';
	import CircleAddCompendium from '$lib/components/circle-add/CircleAddCompendium.svelte';
	import { getFieldByNameFromList, getFieldsByGroup } from '$lib/characterFieldsOperations';
	import CircleAddField from '$lib/components/circle-add/CircleAddField.svelte';
	import { loadRpgSystemData } from '$models/rpg_system';
	import { convertDataToFieldJson } from '$lib/utils';

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
  const dispatch = createEventDispatcher()

  let appearance: Field = getFieldByNameFromList(fields, 'appearance')
  let occupations: Field[] = getFieldsByGroup("occupations", fields)
  let occupationList: Field[] = []
  let archetypes: Field[] = getFieldsByGroup("archetypes", fields)
  let darkSecrets: Field[] = getFieldsByGroup("darkSecrets", fields)
  let dramaticHooks: Field[] = getFieldsByGroup("dramaticHooks", fields)

  function getOccupationFieldList() {
    if (editMode && archetypes !== undefined) {

      let occupationFields: Field[] = []
      archetypes.forEach(archetype => {
        if (archetype?.data?.occupation !== undefined) {
          

          archetype.data.occupation.forEach((occupation: string) => {
            occupationFields.push({
              name: occupation,
              label: occupation,
              type: "tag",
              group: "occupations",
              description: "",
              weight: 1,
              value: "",
              id: ""
            })
          })
        }
      })
      return occupationFields
    }
    return []
  }  

  $: {
    archetypes = getFieldsByGroup("archetypes", fields)
    occupations = getFieldsByGroup("occupations", fields)
    occupationList = getOccupationFieldList()
    darkSecrets = getFieldsByGroup("darkSecrets", fields)
    dramaticHooks = getFieldsByGroup("dramaticHooks", fields)
  }

  // onMount(async () => {
  //   const data = (await loadRpgSystemData("kult4e", "dark-secrets")).default

  //   console.log(convertDataToFieldJson(data, "tag", "darkSecrets"))
  // })
  

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} {editMode} {tab} on:fieldRemove >
  {#if editable && editMode}
  <input type="text" class="input h2 text-center" bind:value={tab.label} />
  {:else}
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />
  {/if}

  <div class="mt-3">

    <FieldRender on:fieldRemove field={appearance} {editMode} editable={true} />

    <!-- Archetype -->
    <div class="mt-3">
      <div class="flex items-center justify-between">
        <h4 class="h4">Archetype</h4>

        {#if editMode}
          <CircleAddCompendium on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="archetypes" classes={addButtonClasses} />
        {/if}
      </div>

      {#each archetypes as archetype(archetype.name)}
        <FieldRender on:fieldRemove classes="variant-ringed-surface" field={archetype} {editMode} />
      {/each}
    </div>


    <!-- Occupation -->
    <div class="mt-3">

      <div class="flex items-center justify-between">
        <h4 class="h4">Occupation</h4>

        {#if editMode}
          <CircleAddField on:fieldAdd {character} fields={occupationList}  classes={addButtonClasses} />
        {/if}
      </div>

      {#each occupations as occupation(occupation.name)}
        <FieldRender on:fieldRemove classes="variant-ringed-surface" field={occupation} {editMode} />
      {/each}
    </div>

    <!-- Dark Secrets -->
    <div class="mt-3">

      <div class="flex items-center justify-between">
        <h4 class="h4">Dark Secrets</h4>
        
        {#if editMode}
          <CircleAddCompendium on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="dark-secrets" classes={addButtonClasses} />
        {/if}
      </div>

      {#each darkSecrets as darkSecret(darkSecret.name)}
        <FieldRender on:fieldRemove classes="variant-ringed-surface" field={darkSecret} {editMode} />
      {/each}
    </div>

    <!-- Dramatic Hooks -->
    <div class="mt-3">

      <div class="flex items-center justify-between">
        <h4 class="h4">Dramatic Hooks</h4>
        {#if editMode}
          <CircleQuickAddField {character} type="tag" group="dramaticHooks" name="Dramatic Hook" description="Hook Description" on:fieldAdd classes={addButtonClasses} />
        {/if}
      </div>

      {#each dramaticHooks as dramaticHook(dramaticHook.id)}
        <FieldRender
          on:fieldRemove field={dramaticHook} {editMode} editable={true}
          classes="variant-ringed-surface"
          />
      {/each}
      
    </div>

  </div>
</CharacterSheetTabWrapper>



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

  let appearance: Field = getFieldByNameFromList(fields, 'appearance')
  let occupation: Field = getFieldsByGroup("occupations", fields)[0]
  let occupationList: Field[] = []
  let archetype: Field = getFieldsByGroup("archetypes", fields)[0]
  let darkSecrets: Field[] = getFieldsByGroup("darkSecrets", fields)
  let dramaticHooks: Field[] = getFieldsByGroup("dramaticHooks", fields)
  let relations: Field[] = getFieldsByGroup("relations", fields)

  function getOccupationFieldList() {
    if (editMode && archetype !== undefined) {

      let occupationFields: Field[] = []
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
      return occupationFields
    }
    return []
  }

  $: {
    archetype = getFieldsByGroup("archetypes", fields)[0]
    occupation = getFieldsByGroup("occupations", fields)[0]
    occupationList = getOccupationFieldList()
    darkSecrets = getFieldsByGroup("darkSecrets", fields)
    dramaticHooks = getFieldsByGroup("dramaticHooks", fields)
    relations = getFieldsByGroup("relations", fields)
  }  

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} {editMode} {tab} on:fieldRemove width={tabWidth} >
  
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />

  <div class="mt-3">

    {#if editMode || appearance.value !== ""}
      <FieldRender on:fieldRemove field={appearance} {editMode} editable={true} classes="text-center" />
    {/if}

    <!-- Archetype -->
    <div class="mt-3">

      <h3 class="h3 text-center">Archetype</h3>

      {#if archetype !== undefined && archetype}
        <FieldRender on:fieldRemove classes="bg-secondary-900 w-full" field={archetype} {editMode} editable={false} />
      {:else if !editMode}
        <div class="text-center">-</div>
      {/if}

      {#if editMode && (archetype === undefined || !archetype)}
        <CircleAddCompendium on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="archetypes" classes={addButtonClasses} modalComponent={K4eAddItemModal} title="Take one Archetype" />
      {/if}

    </div>


    <!-- Occupation -->
    <div class="mt-3">
        
        <h3 class="h3 text-center">Occupation</h3>

        {#if occupation !== undefined && occupation}
          <FieldRender on:fieldRemove classes="bg-secondary-900 w-full" field={occupation} {editMode} editable={occupation.name === "(Custom)"} />
        {:else if !editMode}
          <div class="text-center">-</div>
        {/if}

        {#if editMode && (occupation === undefined || !occupation)}
          <CircleAddField on:fieldAdd {character} fields={occupationList}  classes={addButtonClasses} />
        {/if}

    </div>

    <!-- Dark Secrets -->
    <div class="mt-3">
      
      <h3 class="h3 text-center">Dark Secrets</h3>

      {#if darkSecrets.length > 0}
        {#each darkSecrets as darkSecret(darkSecret.name)}
          <FieldRender on:fieldRemove classes="bg-surface-400 w-full" field= {darkSecret} {editMode} />
        {/each}
      {:else if !editMode}
        <div class="text-center">-</div>
      {/if}

      {#if editMode}
        <CircleAddCompendium on:fieldAdd {character} rpgSystemName="kult4e" compendiumName="dark-secrets" classes={addButtonClasses} modalComponent={K4eAddItemModal} title="Select Dark Secret" />
      {/if}
    </div>

    <!-- Dramatic Hooks -->
    <div class="mt-3">

      <h3 class="h3 text-center">Dramatic Hooks</h3>

      {#if dramaticHooks.length > 0}
        {#each dramaticHooks as dramaticHook(dramaticHook.id)}
          <FieldRender
            on:fieldRemove field={dramaticHook} {editMode} editable={true}
            classes="bg-tertiary-900 w-full"
            />
        {/each}
      {:else if !editMode}
        <div class="text-center">-</div>
      {/if}

      {#if editMode}
        <CircleQuickAddField {character} type="tag" group="dramaticHooks" name="Dramatic Hook" description="Hook Description" on:fieldAdd classes={addButtonClasses} />
      {/if}
      
    </div>

    <!-- Relations -->
    <div class="mt-3">

      <h3 class="h3 text-center">Relations</h3>

      {#if relations.length > 0}
        {#each relations as relation(relation.id)}
          <FieldRender
            on:fieldRemove field={relation} {editMode} editable={true}
            fullEditable={true}
            classes="m-1 {!editMode ? "bg-secondary-600" : ""}"
            />
        {/each}
      {:else if !editMode}
        <div class="text-center">-</div>
      {/if}

      {#if editMode}
        <CircleQuickAddField
          {character}
          type="counter"
          group="relations"
          name="Relations"
          description="Relation Description"
          value="--"
          fullEditable={true}
          on:fieldAdd classes={addButtonClasses} />
      {/if}
      
    </div>

  </div>
</CharacterSheetTabWrapper>



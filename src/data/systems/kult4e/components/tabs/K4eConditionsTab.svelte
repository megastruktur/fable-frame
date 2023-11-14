<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import CircleQuickAddField from '$lib/components/circle-add/CircleQuickAddField.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import {flip} from "svelte/animate"

	import type { CharactersResponse } from '$lib/pocketbase-types';
	import CharacterSheetTabWrapper from '$lib/components/tabs/CharacterSheetTabWrapper.svelte';
	import CircleAddCompendium from '$lib/components/circle-add/CircleAddCompendium.svelte';
	import { getFieldByNameFromList } from '$lib/characterFieldsOperations';

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

  let stability: Field
  let seriousWound1: Field
  let seriousWound2: Field
  let seriousWound3: Field
  let seriousWound4: Field
  let criticalWound: Field

  function updateFieldRenders() {
    stability = getFieldByNameFromList(fields, "stability")
    seriousWound1 = getFieldByNameFromList(fields, "serious-wound-1")
    seriousWound2 = getFieldByNameFromList(fields, "serious-wound-2")
    seriousWound3 = getFieldByNameFromList(fields, "serious-wound-3")
    seriousWound4 = getFieldByNameFromList(fields, "serious-wound-4")
    criticalWound = getFieldByNameFromList(fields, "critical-wound")
  }

  $: {
    updateFieldRenders()
  }  

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} {editMode} {tab} on:fieldRemove width={tabWidth} >
  
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />

  <div class="mt-3">

    <h3 class="h3 text-center mb-3">Stability</h3>
    <hr />

    <div class="mt-3">
      <FieldRender
        on:fieldRemove field={stability} {editMode} editable={true}
        fullEditable={true}
        classes="m-1"
        color=""
        characterId={character.id}
        updateWithoutEditMode={true}
        colorEdit="border-tertiary-600"
        colorButtons="variant-filled-surface"
        labelStyle="hidden"
        />
    </div>

  </div>

  <div class="mt-3">
    <h3 class="h3 text-center mb-3">Wounds</h3>
    <hr />

    <h4 class="my-3 text-center text-sm">Serious Wounds (<b>-1 ongoing</b>)</h4>

    <div class="">
      <FieldRender
        on:fieldRemove field={seriousWound1} {editMode} editable={true}
        characterId={character.id}
        fullEditable={true}
        classes="mb-3"
        color=""
        colorEdit="border-tertiary-600"
        colorButtons="variant-filled-surface"
        labelStyle="text-xl"
        />
      <FieldRender
        on:fieldRemove field={seriousWound2} {editMode} editable={true}
        characterId={character.id}
        fullEditable={true}
        classes="mb-3"
        color=""
        colorEdit="border-tertiary-600"
        colorButtons="variant-filled-surface"
        labelStyle="text-xl"
        />
      <FieldRender
        on:fieldRemove field={seriousWound3} {editMode} editable={true}
        characterId={character.id}
        fullEditable={true}
        classes="mb-3"
        color=""
        colorEdit="border-tertiary-600"
        colorButtons="variant-filled-surface"
        labelStyle="text-xl"
        />
      <FieldRender
        on:fieldRemove field={seriousWound4} {editMode} editable={true}
        characterId={character.id}
        fullEditable={true}
        classes="mb-3"
        color=""
        colorEdit="border-tertiary-600"
        colorButtons="variant-filled-surface"
        labelStyle="text-xl"
        />
    </div>

    <h4 class="my-3 text-center text-sm">Critical Wound (<b>-1 ongoing</b>)</h4>

    <div>
      <FieldRender
        on:fieldRemove field={criticalWound} {editMode} editable={true}
        characterId={character.id}
        fullEditable={true}
        classes="mb-3"
        color=""
        colorEdit="border-tertiary-600"
        colorButtons="variant-filled-surface"
        labelStyle="text-xl"
        />
    </div>
  </div>

</CharacterSheetTabWrapper>



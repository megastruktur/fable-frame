<script lang="ts">
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import {dndzone} from "svelte-dnd-action"
  import {flip} from "svelte/animate"

  // @ts-ignore
  import Icon from "svelte-icons-pack"
  import BsGrid3x3GapFill from "svelte-icons-pack/bs/BsGrid3x3GapFill";
	import CharacterSheetTabWrapper from "./CharacterSheetTabWrapper.svelte";
	import { createEventDispatcher } from "svelte";
	import type { CharactersResponse } from '$lib/pocketbase-types';

  export let fields: Field[]
  export let tab: Field
  export let activeTabName: string
  // matches the media queries:
  export let compactVersion: boolean = false
  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let editMode: boolean = false
  export let editable: boolean = true
  export let sortable: boolean = true
  export let character: CharactersResponse

  let removable: boolean = (tab.removable !== undefined) ? tab.removable : true

  const flipDurationMs: number = 300
  const dispatch = createEventDispatcher()

  // Reorder fields
  $: options = {
    items: fields,
    flipDurationMs: flipDurationMs,
    dragDisabled: !editMode,
  }

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
        field: field
      })
    })
    fields = e.detail.items

    console.log({fields})
    console.log("Fields reordered")
  }

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  {removable} {editMode} {tab} on:fieldRemove >
  {#if editable && editMode}
  <input type="text" class="input h2 text-center" bind:value={tab.label} />
  {:else}
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />
  {/if}
  <!-- Draggable section -->
  <div
    class="mt-3"
    use:dndzone={options}
    on:consider={handleDndConsider} on:finalize={handleDndFinalize}
    >
    {#if fields.length > 0}
    {#each fields as field(field.id)}
    <div class="flex items-center mb-3" animate:flip="{{duration: flipDurationMs}}">
      <FieldRender on:fieldRemove on:fieldUpdate field={field} {editMode} />
      {#if sortable && editMode}
      <button class="btn-icon btn-icon-sm">
        <Icon src={BsGrid3x3GapFill} />
      </button>
      {/if}
    </div>
    {/each}
    {/if}
  </div>
  <!-- Circle is Character Sheet dependent to should be in ChSh -->
  {#if editMode}
  <CircleAdd {character} group={tab.name} on:fieldAdd />
  {/if}
</CharacterSheetTabWrapper>



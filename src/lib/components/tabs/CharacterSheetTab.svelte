<script lang="ts">
	import { characterStore } from "$lib/stores";
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field, FieldError } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import {dndzone} from "svelte-dnd-action"
  import {flip} from "svelte/animate"

  import Icon from "svelte-icons-pack"
  import BsGrid3x3GapFill from "svelte-icons-pack/bs/BsGrid3x3GapFill";
	import CharacterSheetTabWrapper from "./CharacterSheetTabWrapper.svelte";

  export let fields: Field[]
  export let tab: Field
  export let activeTabName: string
  // matches the media queries:
  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let removable: boolean = true
  export let editMode: boolean = false
  export let editable: boolean = true

  const flipDurationMs: number = 300

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
      characterStore.setField(field)
    })
    fields = e.detail.items

    console.log({fields})
    console.log("Fields reordered")
  }

  function removeTab() {
    characterStore.removeField(tab)
  }

</script>

<CharacterSheetTabWrapper {matches} {activeTabName}
  {removable} {editMode}
  tabName={tab.name}>
  <h2 class="h2 text-center mb-3">
    {#if editable && editMode}
    <input type="text" class="input" bind:value={tab.label} />
    {:else}
    <span>{tab.label}</span>
    {/if}
  </h2>
  <hr />
  <!-- Draggable section -->
  <div
    class="mt-3"
    use:dndzone={options}
    on:consider={handleDndConsider} on:finalize={handleDndFinalize}
    >
    {#if fields.length > 0}
    {#each fields as field(field.id)}
    <div class="flex items-center mb-3" animate:flip="{{duration: flipDurationMs}}">
      <FieldRender field={field} {editMode} />
      {#if editMode}
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
  <CircleAdd group={tab.name} />
  {/if}
</CharacterSheetTabWrapper>



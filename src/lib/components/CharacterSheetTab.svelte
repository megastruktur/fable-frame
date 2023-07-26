<script lang="ts">
	import { characterStore, editMode } from "$lib/stores";
	import FieldRender from '$lib/components/field-renders/FieldRender.svelte';
	import CircleAdd from '$lib/components/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import {dndzone} from "svelte-dnd-action"
  import {flip} from "svelte/animate"

  import Icon from "svelte-icons-pack"
  import BsGrid3x3GapFill from "svelte-icons-pack/bs/BsGrid3x3GapFill";

  export let fields: Field[]
  export let tabName: string
  export let activeTab: string
  // matches the media queries:
  export let matches: boolean | QueryArray | ObjectType<any> = true

  const flipDurationMs: number = 300

  // Reorder fields
  $: options = {
    items: fields,
    flipDurationMs: flipDurationMs,
    dragDisabled: !$editMode
  }

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

    console.log("Fields reordered")
  }

</script>


<section class="mx-3 {matches && activeTab !== tabName ? "hidden" : ""}">
<div
  class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md lg:w-80 w-72">
  <h2 class="h2 text-center mb-3">{tabName}</h2>
  <hr />
  <!-- Draggable section -->
  <div
    class="mt-3"
    use:dndzone={options}
    on:consider={handleDndConsider} on:finalize={handleDndFinalize}
    >
    {#each fields as field(field.id)}
    <div class="flex items-center mb-3" animate:flip="{{duration: flipDurationMs}}">
      <FieldRender field={field} />
      {#if $editMode}
      <button class="btn-icon btn-icon-sm">
        <Icon src={BsGrid3x3GapFill} />
      </button>
      {/if}
    </div>
    {/each}
  </div>
  {#if $editMode}
  <CircleAdd group={tabName} />
  {/if}
</div>
</section>

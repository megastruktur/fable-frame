<script lang="ts">
	import FieldRender from "$lib/components/field-renders/FieldRender.svelte";
	import { editMode } from "$lib/stores";
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
	import { onMount } from "svelte";


  export let tab: Field
  export let fields: Field[]
  export let activeTabName: string
  // matches the media queries:
  export let matches: boolean | QueryArray | ObjectType<any> = true

</script>

<section class="mx-3 lg:w-auto w-full mb-3 relative {matches && activeTabName !== tab.name ? "hidden" : ""}">
  <div
    class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md w-full">
    <h2 class="h2 text-center mb-3">
      <span>{tab.label}</span>
    </h2>
    <hr />
    <!-- Draggable section -->
    <div
      class="mt-3"
      >
      {#each fields as field(field.id)}
      {@const isSave = field.name.includes("Save") ? true : false}
      <div class="flex items-center mb-3">
        <FieldRender classes={isSave ? "text-sm" : ""} field={field} />
      </div>
      {#if isSave}
        <hr class="!border-t-2 w-full" />
      {/if}
      {/each}
    </div>
  </div>
</section>

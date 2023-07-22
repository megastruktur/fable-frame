<script lang="ts">
	import { editMode } from "$lib/stores";
	import FieldRender from '$lib/components/FieldRender.svelte';
	import CircleAdd from '$lib/components/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";

  export let fields: Field[]
  export let tabName: string
  export let activeTab: string
  export let matches: boolean | QueryArray | ObjectType<any> = true // matches the media queries.

</script>


<section class="mx-3 {matches && activeTab !== tabName ? "hidden" : ""}">
<div class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md lg:w-80 w-72">
  {#each fields as field}
    <FieldRender field={field} />
  {/each}
  {#if $editMode}
  <CircleAdd group={tabName} />
  {/if}
</div>
</section>

<script lang="ts">
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import { createEventDispatcher } from "svelte";
	import type { Field } from "$lib/types";

  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let compactVersion: boolean = false
  export let activeTabName: string
  export let tab: Field
  export let removable: boolean = true
  export let editMode: boolean
  export let width: string = "w-80"

  const dispatch = createEventDispatcher();

  function removeTabEvent() {
    dispatch("fieldRemove", {
      field: tab
    })
  }

</script>

<section class="{width} mb-3 relative mx-2 {(matches || compactVersion) && activeTabName !== tab.name ? "hidden" : ""}">


  {#if removable && editMode}
    <button type="button"
      class="btn-icon btn-icon-sm variant-filled-error absolute -top-3 -right-3 z-10" on:click={removeTabEvent}>✕</button>
  {/if}
  <div class="bg-neutral-900/90 py-3 px-2 md:px-4 drop-shadow-xl shadow-md h-auto">
    <slot />
  </div>
</section>

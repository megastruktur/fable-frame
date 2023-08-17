<script lang="ts">
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
  import { createEventDispatcher } from "svelte";

  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let activeTabName: string
  export let tabName: string
  export let removable: boolean = true
  export let editMode: boolean

  const dispatch = createEventDispatcher();

  function removeTabEvent() {
    dispatch("removeTab", { tabName })
  }

</script>

<section class="w-80 mb-3 relative mx-2 {matches && activeTabName !== tabName ? "hidden" : ""}">


  {#if removable && editMode}
    <button type="button"
      class="btn-icon btn-icon-sm variant-filled-error absolute -top-3 -right-3 z-10" on:click={removeTabEvent}>✕</button>
  {/if}
  <div class="bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md h-auto">
    <slot />
  </div>
</section>

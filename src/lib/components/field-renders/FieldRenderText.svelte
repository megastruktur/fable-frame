<script lang="ts">
	import type { Field } from "$lib/types.d";
  import { editMode } from "$lib/stores";
	import { createEventDispatcher } from "svelte";

  export let field: Field


  const dispatch = createEventDispatcher()

</script>

<div>
  <p class="text-xl">{field.label}</p>
  {#if $editMode}
    <input type="text" bind:value={field.value} on:focusout={() => {console.log(field); dispatch("fieldUpdate", field)}} />
  {:else}
    <p>{field.value ?? ""}</p>
  {/if}
</div>

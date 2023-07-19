<script lang="ts">
	import type { Field } from "$lib/types.d";
  import { editMode } from "$lib/stores";
	import { createEventDispatcher } from "svelte";

  export let field: Field


  const dispatch = createEventDispatcher()

</script>

<button class="btn" on:click>
  {#if $editMode}
    <input class="input" type="text" bind:value={field.value} on:focusout={() => {dispatch("fieldUpdate", field)}} />
  {:else}
    <h4 class="h4">#{field.label ?? ""}</h4>
  {/if}
</button>

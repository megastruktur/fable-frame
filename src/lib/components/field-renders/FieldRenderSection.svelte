<script lang="ts">
	import type { Field } from "$lib/types.d";
  import { editMode } from "$lib/stores";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true


  const dispatch = createEventDispatcher()

</script>

<div class="{classes} flex flex-col w-full items-center">
  {#if editable && $editMode}
    <input class="input" type="text" bind:value={field.value} on:focusout={() => {dispatch("fieldUpdate", field)}} />
  {:else}
    <h3 class="h3 my-2">{field.value ?? ""}</h3>
    <hr class="w-full" />
  {/if}
</div>

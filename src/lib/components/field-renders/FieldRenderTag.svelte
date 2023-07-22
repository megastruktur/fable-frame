<script lang="ts">
	import type { Field } from "$lib/types.d";
  import { editMode } from "$lib/stores";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true


  const dispatch = createEventDispatcher()

</script>

<div class="{classes} chip m-1" on:click on:keyup>
  {#if editable && $editMode}
    <input class="input" type="text" bind:value={field.label} on:focusout={() => {dispatch("fieldUpdate", field)}} />
  {:else}
    <h4 class="h4">{field.label ?? ""}</h4>
  {/if}
</div>

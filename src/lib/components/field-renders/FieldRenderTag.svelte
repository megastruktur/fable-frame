<script lang="ts">
	import type { Field } from "$lib/types.d";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false


  const dispatch = createEventDispatcher()

</script>

<div class="{classes} {!editMode || !editable ? "chip m-1" : ""}" on:click on:keyup>
  {#if editable && editMode}
    <input class="input" type="text" bind:value={field.label} on:focusout={() => {dispatch("fieldUpdate", field)}} />
  {:else}
    <h4 class="h4">{field.label ?? ""}</h4>
  {/if}
</div>

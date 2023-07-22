<script lang="ts">
	import type { Field } from "$lib/types.d";
  import { editMode } from "$lib/stores";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true


  const dispatch = createEventDispatcher()

</script>

<label class="{classes} label">
  <h4 class="h4">{field.label}</h4>
  {#if editable && $editMode}
    <input class="input" type="text" bind:value={field.value} on:focusout={() => {console.log(field); dispatch("fieldUpdate", field)}} />
  {:else}
    <p>{field.value ?? ""}</p>
  {/if}
</label>

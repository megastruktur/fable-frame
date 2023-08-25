<script lang="ts">
	import type { Field } from "$lib/types.d";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false

  let fieldLabel: string = field.label || ""

  const dispatch = createEventDispatcher()

  function fieldEdit() {

    let fieldValueOld: string = field.value
    field.label = fieldLabel
    const dispatchData = {
      operation: "change",
      field: field
    }

    const dispatched = dispatch("fieldUpdate", dispatchData, { cancelable: true })

    if (!dispatched) {
      field.value = fieldValueOld
    }
  }

</script>

<div class="{classes} {!editMode || !editable ? "chip m-1" : ""}" on:click on:keyup>
  {#if editable && editMode}
    <input class="input" type="text" bind:value={fieldLabel} on:focusout={fieldEdit} />
  {:else}
    <h4 class="h4">{field.label ?? ""}</h4>
  {/if}
</div>

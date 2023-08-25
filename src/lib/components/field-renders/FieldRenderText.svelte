<script lang="ts">
	import type { Field } from "$lib/types.d";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false

  let fieldValue: string = field.value

  const dispatch = createEventDispatcher()

  function fieldEdit() {

    let fieldValueOld: string = field.value
    field.value = fieldValue
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

<label class="{classes} label">
  <h4 class="h4">{field.label}</h4>
  {#if editable && editMode}
    <input class="input" type="text" bind:value={fieldValue} on:focusout={fieldEdit} />
  {:else}
    <p>{field.value ?? ""}</p>
  {/if}
</label>

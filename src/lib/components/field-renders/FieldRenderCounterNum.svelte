<script lang="ts">
	import type { Field } from "$lib/types";

  import { editMode } from "$lib/stores";

  import { createEventDispatcher, onMount } from "svelte"

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true

  const dispatch = createEventDispatcher()

  function fieldIncrement() {

    field.value = (parseInt(field.value) + 1).toString()

    dispatch("fieldUpdate", field)
  }

  function fieldDecrement() {
    field.value = (parseInt(field.value) - 1).toString()
    dispatch("fieldUpdate", field)
  }

  onMount(() => {
    if (!field.value || !parseInt(field.value) ) {
      field.value = "0"
    }
  })

</script>

<div class="{classes} h4 w-full flex flex-row justify-between">
  {#if editable && $editMode}
    <button type="button" on:click={fieldDecrement} class="btn-icon btn-icon-sm variant-filled mr-1">-</button>
  {/if}
  <div class="flex">{field.label}</div>
  <div class="flex text-secondary-500">{field.value ? field.value : 0}</div>

  {#if editable && $editMode}
    <button type="button" on:click={fieldIncrement} class="btn-icon btn-icon-sm variant-filled ml-1">+</button>
  {/if}
</div>

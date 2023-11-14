<script lang="ts">
	import { updateSaveCharacterField } from "$lib/characterFieldsOperations";
	import type { Field } from "$lib/types.d";
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  export let labelStyle = ""
  export let valueStyle = ""
  export let color: string = ""
  export let colorEdit: string = ""
  export let colorButtons: string = ""
  export let characterId: string = ""
  export let editableClasses: string = ""

  const inactiveClasses: string = "line-through opacity-25"

  if (!validateField()) {
    throw new Error(`Field ${field.id} is not valid`)
  }

  const dispatch = createEventDispatcher()

  let checked: boolean = (parseInt(field.value) === 1)

  function validateField() {
    let valid = true
    
    if (characterId === "") {
      valid = false
    }

    return valid
  }

  function fieldEditHandler() {
    fieldUpdate()
  }

  function fieldUpdate() {
    const dispatchData = {
      operation: "change",
      field: field
    }

    return dispatch("fieldUpdate", dispatchData, { cancelable: true })
  }

  function checkboxEditHandler() {
    field.value = checked ? "0" : "1"
    checked = !checked
    updateSaveCharacterField(characterId, field)
  }

</script>

{#if !editable || !editMode}
  <button
    class="w-full chip mb-1 {checked ? inactiveClasses : ""} {colorButtons} {labelStyle}"
    on:click={checkboxEditHandler}
    >{field.label ? field.label : "-"}</button>
{:else}
  <input class="input w-full" type="text" bind:value={field.label} on:focusout={fieldEditHandler} />
{/if}

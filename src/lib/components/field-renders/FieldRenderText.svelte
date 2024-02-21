<script lang="ts">
	import type { Field } from "$lib/types.d";
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  export let labelStyle = ""
  export let valueStyle = ""
  export let placeholder: string = ""
  export let characterId: string = ""
  export let color: string = ""
  export let colorEdit: string = ""
  export let colorButtons: string = ""
  export let updateWithoutEditMode: boolean = false
  export let placeholderArea: string = ""
  export let editableClasses: string = ""
  export let fullEditable: boolean = false
  export let showTitle: boolean = true
  export let isTextarea: boolean = false

  const modalStore = getModalStore()

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
  
  function openDescriptionModal() {

    if (!editMode && field.description !== undefined) {

      const descriptionModal: ModalSettings = {
        type: 'alert',
        title: "Description",
        body: field.description,
      }

      modalStore.trigger(descriptionModal)
    }
  }

</script>

<div class="{classes}">
  
  <button on:click={openDescriptionModal}
    class="h3 mb-3 {labelStyle}">{field.label}
  </button>

  {#if editable && editMode}
    {#if isTextarea}
      <textarea class="textarea" bind:value={fieldValue} on:focusout={fieldEdit} placeholder="{placeholder}" />
    {:else}
      <input class="input" type="text" bind:value={fieldValue} on:focusout={fieldEdit} placeholder="{placeholder}" />
    {/if}
  {:else}
    <p class="{valueStyle}">{field.value ?? ""}</p>
  {/if}
</div>

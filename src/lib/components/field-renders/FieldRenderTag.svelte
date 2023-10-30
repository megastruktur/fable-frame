<script lang="ts">
	import type { Field } from "$lib/types.d"
	import { createEventDispatcher } from "svelte"
	import { type ModalSettings, getModalStore } from "@skeletonlabs/skeleton"

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false

  const modalStore = getModalStore()

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

<div class="{classes} {!editMode || !editable ? "chip m-1" : ""}" on:click={openDescriptionModal} on:keyup>
  {#if editable && editMode}
    <input class="input" type="text" bind:value={fieldLabel} on:focusout={fieldEdit} />
    <textarea class="textarea resize-none mt-3 mb-3" bind:value={field.description} on:focusout={fieldEdit}></textarea>
  {:else}
    <h4 class="h4">{field.label ?? ""}</h4>
  {/if}
</div>

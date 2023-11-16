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

<label class="{classes} label" on:click={openDescriptionModal} on:keyup>
  <h4 class="h4 {labelStyle}">{field.label}</h4>
  {#if editable && editMode}
    <input class="input" type="text" bind:value={fieldValue} on:focusout={fieldEdit} placeholder="{placeholder}" />
  {:else}
    <p class="{valueStyle}">{field.value ?? ""}</p>
  {/if}
</label>

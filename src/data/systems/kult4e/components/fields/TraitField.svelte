<script lang="ts">
	import type { Field } from "$lib/types.d"
	import { createEventDispatcher } from "svelte"
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton"
	import TraitFieldInfo from "./TraitFieldInfo.svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  export let editableClasses: string = ""
  export let characterId: string = ""
  export let labelStyle: string = ""
  export let valueStyle: string = ""
  export let color: string = ""
  export let colorEdit: string = ""
  export let colorButtons: string = ""
  export let updateWithoutEditMode: string = ""
  export let fullEditable: string = ""
  export let showTitle: boolean = true
  export let placeholder: string = ""
  export let placeholderArea: string = ""

  const editableClassesConst = "border-2 rounded-md p-2 border-surface-500"

  const editClasses = editableClasses + " " + editableClassesConst

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

<Accordion
  regionCaret="{!editMode || !editable ? "hidden" : ""}"
  rounded="md"
  regionControl="{classes} {!editMode || !editable ? "chip whitespace-normal m-1" : editClasses}">
  <AccordionItem>
    <svelte:fragment slot="summary">
      {#if editable && editMode}
        <input class="input" type="text" bind:value={fieldLabel} on:focusout={fieldEdit} />
      {:else}
        <h4 class="h4 text-center">{field.label ?? ""}</h4>
      {/if}

    </svelte:fragment>
    <svelte:fragment slot="content">
      {#if editable && editMode}
        <textarea class="textarea resize-none mt-3 mb-3" rows="5" bind:value={field.description} on:focusout={fieldEdit}></textarea>
      {:else}
        <TraitFieldInfo {field} {characterId} showTitle={false} />
      {/if}
    </svelte:fragment>
  </AccordionItem>
</Accordion>

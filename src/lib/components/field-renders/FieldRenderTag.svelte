<script lang="ts">
	import type { Field } from "$lib/types.d"
	import { createEventDispatcher } from "svelte"
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton"

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  export let editableClasses: string = ""
  export let placeholder: string = field.type || ""
  export let placeholderArea: string = field.description || ""
  export let color: string = ""
  export let colorEdit: string = ""
  export let colorButtons: string = ""
  export let updateWithoutEditMode: boolean = false
  export let showTitle: boolean = true
  export let characterId: string = ""
  export let labelStyle: string = ""
  export let valueStyle: string = ""
  export let fullEditable: boolean = false

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
  regionControl="hover:!bg-transparent"
  regionCaret="{!editMode || !editable ? "hidden" : ""}"
  rounded="md"
  padding=""
  class="{classes} {!editMode || !editable ? "chip whitespace-normal" : editClasses}">
  <AccordionItem class="w-full">
    <svelte:fragment slot="summary">
      {#if editable && editMode}
        <input class="input" type="text"
          bind:value={fieldLabel} on:focusout={fieldEdit}
          placeholder="{placeholder}"
          />
      {:else}
        <h4 class="h4 text-center">{field.label ?? ""}</h4>
      {/if}

    </svelte:fragment>
    <svelte:fragment slot="content">
      <div class="blockquote text-left">
        {#if editable && editMode}
          <textarea class="textarea resize-none mt-3 mb-3" rows="5" bind:value={field.description} on:focusout={fieldEdit} placeholder="{placeholderArea}"></textarea>
        {:else}
          {field.description}
        {/if}
      </div>
    </svelte:fragment>
  </AccordionItem>
</Accordion>

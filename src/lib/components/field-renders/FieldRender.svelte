<script lang="ts">
	import type { Field } from "$lib/types.d";
	import FieldRenderCounter from "./FieldRenderCounter.svelte";
	import FieldRenderCounterNum from "./FieldRenderCounterNum.svelte";
	import FieldRenderTag from "./FieldRenderTag.svelte";
	import FieldRenderText from "./FieldRenderText.svelte";
	import FieldRenderSection from "./FieldRenderSection.svelte";
	import FieldRenderDatatable from "./FieldRenderDatatable.svelte";
	import { createEventDispatcher } from "svelte";
	import FieldRenderCounterProgress from "./FieldRenderCounterProgress.svelte";
	import FieldRenderCheckbox from "./FieldRenderCheckbox.svelte";

  export let field: Field
  export let renderAs: string = field.type
  export let isTextarea: boolean = false
  export let classes: string = ""
  export let editableClasses: string = ""
  export let editable: boolean = true
  export let fullEditable: boolean = false
  export let editMode: boolean = false
  export let labelStyle: string = ""
  export let valueStyle: string = ""
  export let fieldComponent: any = null
  export let characterId: string = ""
  export let color: string = ""
  export let colorEdit: string = ""
  export let colorButtons: string = ""
  export let updateWithoutEditMode: boolean = false
  export let showTitle: boolean = true
  export let placeholder: string = field.type || ""
  export let placeholderArea: string = field.description || ""

  let removable: boolean = (field.removable !== undefined) ? field.removable : true

  const dispatch = createEventDispatcher()
  
  function removeField() {
    dispatch("fieldRemove", {
      field: field
    })
  }

  let fieldRenderComponent: any = null

  if (fieldComponent !== null) {
    fieldRenderComponent = fieldComponent
  }
  else if (renderAs === "text") {
    fieldRenderComponent = FieldRenderText
  }
  else if (renderAs === "section") {
    fieldRenderComponent = FieldRenderSection
  }
  else if (renderAs === "datatable") {
    fieldRenderComponent = FieldRenderDatatable
  }
  else if (renderAs === "tag") {
    fieldRenderComponent = FieldRenderTag
  }
  else if (renderAs === "counter") {
    fieldRenderComponent = FieldRenderCounter
  }
  else if (renderAs === "counterNum") {
    fieldRenderComponent = FieldRenderCounterNum
  }
  else if (renderAs === "counterProgress") {
    fieldRenderComponent = FieldRenderCounterProgress
  }
  else if (renderAs === "checkbox") {
    fieldRenderComponent = FieldRenderCheckbox
  }

</script>

<div class="w-full relative">
  
  <div>
    <svelte:component this={fieldRenderComponent} {characterId} {labelStyle} {valueStyle} {editable} {classes} {editableClasses} {field} on:fieldUpdate {editMode} {color} {colorEdit} {colorButtons} {updateWithoutEditMode} {fullEditable} {showTitle} {placeholder} {placeholderArea} {isTextarea}
    />
  </div>

  {#if removable && editMode}
    <button class="btn w-10 h-8 p-0 variant-soft-error rounded-b-none border-b-0 text-2xl absolute top-0 left-10" on:click={removeField}>
      <i class="i-[material-symbols--delete] " />
    </button>
  {/if}
</div>

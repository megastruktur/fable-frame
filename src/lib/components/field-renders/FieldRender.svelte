<script lang="ts">
	import type { Field } from "$lib/types.d";
	import FieldRenderCounter from "./FieldRenderCounter.svelte";
	import FieldRenderCounterNum from "./FieldRenderCounterNum.svelte";
	import FieldRenderTag from "./FieldRenderTag.svelte";
	import FieldRenderText from "./FieldRenderText.svelte";
	import FieldRenderSection from "./FieldRenderSection.svelte";
	import FieldRenderDatatable from "./FieldRenderDatatable.svelte";
	import { createEventDispatcher } from "svelte";

  export let field: Field
  export let renderAs: string = field.type
  export let classes: string = ""
  export let editableClasses: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  export let labelStyle: string = ""
  export let valueStyle: string = ""

  let removable: boolean = (field.removable !== undefined) ? field.removable : true

  const dispatch = createEventDispatcher()
  
  function removeField() {
    dispatch("fieldRemove", {
      field: field
    })
  }

</script>

{#if removable && editMode}
<button class="btn-icon" on:click={removeField}>✕</button>
{/if}
{#if renderAs === "text"}
  <FieldRenderText {editable} {classes} {labelStyle} {valueStyle} field={field} on:fieldUpdate {editMode} />
{/if}
{#if renderAs === "counter"}
  <FieldRenderCounter {editable} {classes} {labelStyle} {valueStyle} field={field} on:fieldUpdate {editMode} />
{/if}
{#if renderAs === "counterNum"}
  <FieldRenderCounterNum {editable} {classes} field={field} on:fieldUpdate {editMode} />
{/if}
{#if renderAs === "tag"}
  <FieldRenderTag {editable} {classes} {editableClasses} field={field} on:fieldUpdate {editMode} />
{/if}
{#if renderAs === "section"}
  <FieldRenderSection {editable} {classes} field={field} on:fieldUpdate {editMode} />
{/if}
{#if renderAs === "datatable"}
  <FieldRenderDatatable {editable} {classes} field={field} on:fieldUpdate {editMode} />
{/if}

<!-- For Tag it is remove the tag -->

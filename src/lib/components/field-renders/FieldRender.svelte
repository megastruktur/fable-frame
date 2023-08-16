<script lang="ts">
	import { characterStore } from "$lib/stores";
	import type { Field } from "$lib/types.d";
	import FieldRenderCounter from "./FieldRenderCounter.svelte";
	import FieldRenderCounterNum from "./FieldRenderCounterNum.svelte";
	import FieldRenderTag from "./FieldRenderTag.svelte";
	import FieldRenderText from "./FieldRenderText.svelte";
	import FieldRenderSection from "./FieldRenderSection.svelte";
	import FieldRenderDatatable from "./FieldRenderDatatable.svelte";

  export let field: Field
  export let renderAs: string = field.type
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  
  function updateField(event: { detail: Field }) {
    characterStore.setFieldValue(event.detail.id, event.detail.value)
  }
  
  function removeField() {
    characterStore.removeField(field)
  }

</script>

{#if editMode}
<button class="btn-icon" on:click={removeField}>✕</button>
{/if}
{#if renderAs === "text"}
  <FieldRenderText {editable} {classes} field={field} on:fieldUpdate={updateField} {editMode} />
{/if}
{#if renderAs === "counter"}
  <FieldRenderCounter {editable} {classes} field={field} on:fieldUpdate={updateField} {editMode} />
{/if}
{#if renderAs === "counterNum"}
  <FieldRenderCounterNum {editable} {classes} field={field} on:fieldUpdate={updateField} {editMode} />
{/if}
{#if renderAs === "tag"}
  <FieldRenderTag {editable} {classes} field={field} on:fieldUpdate={updateField} {editMode} />
{/if}
{#if renderAs === "section"}
  <FieldRenderSection {editable} {classes} field={field} on:fieldUpdate={updateField} {editMode} />
{/if}
{#if renderAs === "datatable"}
  <FieldRenderDatatable {editable} {classes} field={field} on:fieldUpdate={updateField} {editMode} />
{/if}

<!-- For Tag it is remove the tag -->

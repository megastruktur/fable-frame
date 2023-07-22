<script lang="ts">
	import { characterStore, editMode } from "$lib/stores";
	import type { Field } from "$lib/types.d";
	import FieldRenderCounter from "./field-renders/FieldRenderCounter.svelte";
	import FieldRenderTag from "./field-renders/FieldRenderTag.svelte";
	import FieldRenderText from "./field-renders/FieldRenderText.svelte";

  export let field: Field
  export let renderAs: string = field.type
  export let classes: string = ""
  export let editable: boolean = true
  
  function updateField(event: { detail: Field }) {
    characterStore.setFieldValue(event.detail.id, event.detail.value)
  }
  
  function removeField() {
    characterStore.removeField(field)
  }

</script>

<div class="flex">
  {#if $editMode}
  <button class="btn-icon" on:click={removeField}>✕</button>
  {/if}
  {#if renderAs === "text"}
    <FieldRenderText {editable} {classes} field={field} on:fieldUpdate={updateField} />
  {/if}
  {#if renderAs === "counter"}
    <FieldRenderCounter {editable} {classes} field={field} on:fieldUpdate={updateField} />
  {/if}
  {#if renderAs === "tag"}
    <FieldRenderTag {editable} {classes} field={field} on:fieldUpdate={updateField} />
  {/if}
</div>

<!-- For Tag it is remove the tag -->

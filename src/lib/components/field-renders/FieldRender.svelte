<script lang="ts">
	import { characterStore, editMode } from "$lib/stores";
	import type { Field } from "$lib/types.d";
	import FieldRenderCounter from "./FieldRenderCounter.svelte";
	import FieldRenderCounterNum from "./FieldRenderCounterNum.svelte";
	import FieldRenderTag from "./FieldRenderTag.svelte";
	import FieldRenderText from "./FieldRenderText.svelte";

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

{#if $editMode}
<button class="btn-icon" on:click={removeField}>✕</button>
{/if}
{#if renderAs === "text"}
  <FieldRenderText {editable} {classes} field={field} on:fieldUpdate={updateField} />
{/if}
{#if renderAs === "counter"}
  <FieldRenderCounter {editable} {classes} field={field} on:fieldUpdate={updateField} />
{/if}
{#if renderAs === "counterNum"}
  <FieldRenderCounterNum {editable} {classes} field={field} on:fieldUpdate={updateField} />
{/if}
{#if renderAs === "tag"}
  <FieldRenderTag {editable} {classes} field={field} on:fieldUpdate={updateField} />
{/if}

<!-- For Tag it is remove the tag -->

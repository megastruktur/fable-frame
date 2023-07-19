<script lang="ts">
	import { characterStore } from "$lib/stores";
	import type { Field } from "$lib/types.d";
	import FieldRenderCounter from "./field-renders/FieldRenderCounter.svelte";
	import FieldRenderText from "./field-renders/FieldRenderText.svelte";

  export let field: Field
  
  function updateField(event: { detail: Field }) {
    characterStore.setFieldValue(event.detail.id, event.detail.value)
  }

</script>

{#if field.type === "text"}
  <FieldRenderText field={field} on:fieldUpdate={updateField} />
{/if}
{#if field.type === "counter"}
  <FieldRenderCounter field={field} on:fieldUpdate={updateField} />
{/if}

<!-- For Tag it is remove the tag -->

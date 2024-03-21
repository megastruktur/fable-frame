<script lang="ts">
	import type { Field } from "$lib/types";
  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"

  export let selectedField: Field
  export let field: Field

  function selectField() {
    selectedField = field
  }
</script>

<button class="m-1 {field.icon !== undefined && field.icon !== "" ? "btn-icon btn-icon-base" : "btn btn-base"} {selectedField.name === field.name ? "variant-filled-secondary" : "variant-filled"}" on:click={selectField}>

  {#if field.icon !== undefined && field.icon!== ""}
    <Icon src={field.icon} />
  {:else}
    {field.label}
  {/if}
</button>

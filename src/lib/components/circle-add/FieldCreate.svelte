<script lang="ts">
	import type { Field } from "$lib/types";

  export let field: Field

// * General field types are:
//  * - text
//  * - tag
//  * - counter-min-max
//  * - counter

console.log("Creating field:")
console.log({field})

</script>

<div>
  <!-- <input class="hidden input mb-2" type="text" placeholder="Name" bind:value={field.name} /> -->
  

  <!-- Tab should have a name -->
  {#if field.type === "tab"}
    <input class="input mb-2" type="text" placeholder="Name (unique)" bind:value={field.name} />
  {/if}
  <input required class="input mb-2" type="text" placeholder="Label" bind:value={field.label} />
  <!-- Omit value for Tab type -->
  {#if field.type !== "tab" && field.type !== "tag" && field.type !== "section"}

    {#if field.type === "datatable"}
      <textarea class="textarea mb-2" placeholder="Value (if any)" bind:value={field.value} />
    {:else}
      <input class="input mb-2" type="text" placeholder="Value (if any)" bind:value={field.value} />
    {/if}
  {/if}
  <input class="input mb-2" type="text" placeholder="Description" bind:value={field.description} />
</div>

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
  

  <!-- Do not show for Tag as it is controlled by value -->
  {#if field.type !== "tag"}
    <input required class="input mb-2" type="text" placeholder="Label" bind:value={field.label} />
  {/if}

  <input class="input mb-2" type="text" placeholder="Tab (group)" bind:value={field.group} />
  <input class="input mb-2" type="text" placeholder="Value (if any)" bind:value={field.value} />
  <input class="input mb-2" type="text" placeholder="Description" bind:value={field.description} />
</div>

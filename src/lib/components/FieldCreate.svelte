<script lang="ts">
	import type { Field } from "$lib/types";

  export let field: Field

// * General field types are:
//  * - text
//  * - tag
//  * - counter-min-max
//  * - counter

</script>

<div>
  <input required class="input mb-2" type="text" placeholder="Name" bind:value={field.name} />
  <input required class="input mb-2" type="text" placeholder="Label" bind:value={field.label} />
  <input class="input mb-2" type="text" placeholder="Group (tab)" bind:value={field.group} />
  <input class="input mb-2" type="text" placeholder="Value (if any)" bind:value={field.value} />
  <input class="input mb-2" type="text" placeholder="Description" bind:value={field.description} />
</div>

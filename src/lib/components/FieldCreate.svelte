<script lang="ts">
	import type { Field } from "$lib/types";
	import { createEventDispatcher } from "svelte";


  export let field: Field
  export let type: string

  const dispatch = createEventDispatcher();

  let name: string = ""
  let label: string = ""
  let group: string = "general"
  let value: string = ""
  let description: string = ""

// * General field types are:
//  * - text
//  * - tag
//  * - counter-min-max
//  * - counter

$: field = {
  id: "",
  type: type,
  name: name,
  label: label,
  group: group,
  value: value,
  description: description
}


function addField() {
  dispatch("fieldAdd", {
    field: field
  })
}

</script>

<div>
  <input required class="input mb-2" type="text" placeholder="Name" bind:value={name} />
  <input required class="input mb-2" type="text" placeholder="Label" bind:value={label} />
  <input class="input mb-2" type="text" placeholder="Group (tab)" bind:value={group} />
  <input class="input mb-2" type="text" placeholder="Value (if any)" bind:value={value} />
  <input class="input mb-2" type="text" placeholder="Description" bind:value={description} />
  <!-- <button class="btn btn-sm" on:click={addField}>Add</button> -->
</div>

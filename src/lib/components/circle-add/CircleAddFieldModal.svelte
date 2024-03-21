<script lang="ts">
	import type { Field } from "$lib/types";
	import { getModalStore } from "@skeletonlabs/skeleton";

  export let fields: Field[]

  const modalStore = getModalStore()

  let selectedField: Field

  function addField() {

    if (selectedField !== undefined && $modalStore[0].response) {
      $modalStore[0].response(selectedField)
      modalStore.close()
    }
  }

</script>

<div class="card w-96 p-3">
  {#if selectedField !== undefined}
    <div class="p-1">
      {selectedField.description}
    </div>
  {/if}
  <div class="overflow-y-auto overflow-x-hidden pr-3 h-96 w-full">
    {#each fields as field}
      <button
        class="btn w-full rounded-md m-1 {selectedField !== undefined && selectedField.name === field.name? "variant-filled-secondary" : "variant-filled-surface"}"
        on:click={() => selectedField = field}
        >
        {field.label}
      </button>
    {/each}
  </div>
  <div class="w-full flex justify-end">
    <button
      class="btn variant-filled-secondary mt-3 w-full"
      on:click={addField}
      >Pick</button>
  </div>
 
</div>

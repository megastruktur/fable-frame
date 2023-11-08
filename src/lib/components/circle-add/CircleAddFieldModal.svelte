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

<div class="card w-96 p-5">
  <div class="p-1">
    {#if selectedField !== undefined}
      {selectedField.description}
    {/if}
  </div>
  <div class="flex flex-wrap">
      {#each fields as field}
        <button
          class="btn rounded-md m-1 {selectedField !== undefined && selectedField.name === field.name? "variant-filled-secondary" : "variant-filled-surface"}"
          on:click={() => selectedField = field}
          >
          {field.label}
        </button>
      {/each}
  </div>
  <div class="w-full flex justify-end">
    <button
      class="btn variant-filled-secondary mt-3 flex"
      on:click={addField}
      >Pick</button>
  </div>
 
</div>

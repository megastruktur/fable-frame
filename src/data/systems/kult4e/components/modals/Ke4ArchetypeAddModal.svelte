<script lang="ts">
	import type { Field } from "$lib/types";
	import { getModalStore } from "@skeletonlabs/skeleton";


  export let fields: Field[]
  let selectedField: Field

  const modalStore = getModalStore()

  function addField() {

    if (selectedField !== undefined && $modalStore[0].response) {
      $modalStore[0].response(selectedField)
      modalStore.close()
    }
  }

</script>

<div class="card w-96 p-3 pl-2 h-screen">

  <h4 class="h4 mb-3 text-center">Take one of the Archetypes below</h4>

  <div class="flex h-full pt-1">
    <!-- List -->
    <div class="w-32 h-full overflow-y-scroll flex flex-col">
      {#each fields as field(field.name)}
        {@const fieldSelected = selectedField !== undefined && field.name === selectedField.name}
        <button
          class="btn ml-1 mr-3 mb-3 {fieldSelected ? "variant-filled-secondary" : "variant-outline"} whitespace-normal"
          on:click={() => selectedField = field}
          >
          {field.label}
        </button>
      {/each}
    </div>
  
    <!-- Description -->
    <div class="w-60 p-2 flex flex-col overflow-y-auto">
      {#if selectedField !== undefined}  
        <div class="flex justify-center">
          <button
            class="btn variant-filled-secondary"
            disabled={selectedField === undefined ? true : false}
            on:click={addField}
            >Take</button>
        </div>
  
        <p class="italic mb-3">
          {selectedField.description}
        </p>
        <p><b>Occupation:</b> <span>{selectedField.data?.occupation.join(", ")}</span></p>
      {/if}
    </div>
  </div>
  


</div>

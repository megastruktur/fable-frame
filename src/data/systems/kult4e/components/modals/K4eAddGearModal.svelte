<script lang="ts">
	import FieldsFilter from "$lib/components/FieldsFilter.svelte";
import type { Field } from "$lib/types";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import TraitFieldInfo from "../fields/TraitFieldInfo.svelte";
	import K4eGearCard from "../parts/K4eGearCard.svelte";


  export let fields: Field[]
  export let title: string
  export let buttonText: string = "Take"
  export let itemDescriptionComponent: any = TraitFieldInfo

  let filteredFields: Field[] = fields
  let cardSelected: Field

  const modalStore = getModalStore()

  function addField(field: Field) {

    if ($modalStore[0].response) {
      $modalStore[0].response(field)
      modalStore.close()
    }
  }

  function selectField(field: Field) {
    cardSelected = field
  }

</script>

<div class="card p-6">
  <h3 class="h3 my-3 text-center">{title}</h3>

  <div class="mb-3">
    <FieldsFilter {fields} bind:filteredFields={filteredFields} />
  </div>

  <button
    class="btn variant-filled-secondary w-full mt-3"
    on:click={() => modalStore.close()}
    >Close</button>

  <div
    class="overflow-y-auto pt-1 px-2 flex flex-wrap justify-around p-3 relative">
    {#each filteredFields as field(field.name)}
      {@const selected = cardSelected !== undefined && field.name === cardSelected.name }
      <button
        class="m-3 drop-shadow-lg outline-0"
        on:click={() => selectField(field)}
        >
        <K4eGearCard {field} {selected} />
        {#if selected}
           <button
            on:click={() => addField(field)}
            class="btn outline-none rounded-r-none variant-filled-success absolute right-0 top-1/2">{buttonText}</button>
        {/if}
      </button>
    {/each}
  </div>
  
  <button
    class="btn variant-filled-secondary w-full mt-3"
    on:click={() => modalStore.close()}
    >Close</button>

</div>

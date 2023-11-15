<script lang="ts">
	import FieldsFilter from "$lib/components/FieldsFilter.svelte";
import type { Field } from "$lib/types";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import TraitFieldInfo from "../fields/TraitFieldInfo.svelte";
	import K4eGearCard from "../parts/K4eGearCard.svelte";


  export let fields: Field[]
  export let title: string
  export let buttonText: string = "Select"
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

</script>

<div class="card">
  <h3 class="h3 my-3 text-center">{title}</h3>

  <div class="mb-3">
    <FieldsFilter {fields} bind:filteredFields={filteredFields} />
  </div>

  <div
    class="h-96 overflow-y-auto pt-1 px-2 flex flex-wrap justify-around p-3">
    {#each filteredFields as field(field.name)}
      <button
        class="m-3 drop-shadow-lg outline-0"
        on:click={() => addField(field)}
        >
        <K4eGearCard {field} />
      </button>
    {/each}
  </div>

</div>

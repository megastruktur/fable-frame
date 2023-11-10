<script lang="ts">
	import FieldsFilter from "$lib/components/FieldsFilter.svelte";
import type { Field } from "$lib/types";
	import { Accordion, AccordionItem, getModalStore } from "@skeletonlabs/skeleton";
	import TraitFieldInfo from "../fields/TraitFieldInfo.svelte";


  export let fields: Field[]
  export let title: string
  export let buttonText: string = "Select"

  let filteredFields: Field[] = fields

  const modalStore = getModalStore()

  function addField(field: Field) {

    if ($modalStore[0].response) {
      $modalStore[0].response(field)
      modalStore.close()
    }
  }

</script>

<div class="card w-96">

  <h3 class="h3 my-3 text-center">{title}</h3>

  <div class="mb-3">
    <FieldsFilter {fields} bind:filteredFields={filteredFields} />
  </div>

  <div class="h-96 overflow-y-auto pt-1 px-2">
    <Accordion>
      
      {#each filteredFields as field(field.name)}
        <AccordionItem>
          <svelte:fragment slot="summary">{field.label}</svelte:fragment>
          <svelte:fragment slot="content">
            <TraitFieldInfo {field} classes="" showTitle={false} />
            <button
              class="btn variant-filled-secondary"
              on:click={() => addField(field)}
              >{buttonText}</button>
              
          </svelte:fragment>
        </AccordionItem>
      {/each}
  
    </Accordion>
  </div>

</div>

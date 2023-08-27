<script lang="ts">
	import type { Field } from "$lib/types";
	import { createEventDispatcher } from "svelte";

  export let tagsExpertiseSelected: {tag?: Field, expertise?: Field}[] = []
  export let expertiseAvailable: Field[]

  const dispatch = createEventDispatcher()

  function selectExpertiseEvent(expertiseSelectedName: string) {
    dispatch('selectExpertise', {
      expertiseName: expertiseSelectedName
    })
  }

</script>


{#each expertiseAvailable as expertise}
  {@const expertiseSelected = tagsExpertiseSelected.find(tes => tes.expertise !== undefined && tes.expertise.name === expertise.name)}
  {@const selectedByTag = (expertiseSelected !== undefined && expertiseSelected.tag !== undefined)}
  {#if selectedByTag}
    <span
      class="chip variant-filled mx-2"
    >
      {expertise.label}
    </span>
  {:else}
    <span
      class="chip variant-filled mx-2 {expertiseSelected !== undefined ? "variant-filled" : "variant-soft"}"
      on:keypress
      on:click={() => selectExpertiseEvent(expertise.name)}
    >
      {expertise.label}
    </span>
  {/if}
{/each}
<section>
  {#each tagsExpertiseSelected as tes}
    {#if tes.expertise !== undefined}
    <div class="mt-3">
      <h4 class="h4">{tes.expertise.label}</h4>
      <article>
        {tes.expertise.description}
      </article>
    </div>
    {/if}
  {/each}
</section>

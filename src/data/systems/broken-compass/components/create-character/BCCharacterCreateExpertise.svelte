<script lang="ts">
	import type { Field } from "$lib/types";
	import { createEventDispatcher } from "svelte";

  export let selectedTags: {tagName?: string, expertiseName?: string}[] = []
  export let expertiseAvailable: Field[]

  const dispatch = createEventDispatcher()

  function selectExpertiseEvent(expertiseSelectedName: string) {
    dispatch('selectExpertise', {
      expertiseName: expertiseSelectedName
    })
  }

</script>


{#each expertiseAvailable as expertise}
  {@const expertiseSelected = selectedTags.find(t => t.expertiseName === expertise.name)}
  {@const selectedByTag = (expertiseSelected !== undefined && expertiseSelected.tagName !== undefined)}
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
  {#each selectedTags as st}
    {#if st.expertiseName !== undefined}
      {@const expertise = expertiseAvailable.find(e => e.name === st.expertiseName)}
      {#if expertise !== undefined}
      <div class="mt-3">
        <h4 class="h4">{expertise.label}</h4>
        <article>
          {expertise.description}
        </article>
      </div>
      {/if}
    {/if}
  {/each}
</section>

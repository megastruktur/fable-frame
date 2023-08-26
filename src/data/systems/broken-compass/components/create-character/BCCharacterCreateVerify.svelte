<script lang="ts">
	import type { Field } from "$lib/types";

  export let characterName: string
  export let characterHeritage: string
  export let characterHomeland: string
  export let characterWorkplace: string
  export let callMeIfYouNeed: string
  export let selectedExpertise: Field[]

</script>
<h2 class="h2">{characterName}</h2>
{#if characterHeritage !== undefined}
  <h3 class="h3">Heritage: {characterHeritage}</h3>
{/if}
{#if characterHomeland!== undefined}
  <h3 class="h3">Homeland: {characterHomeland}</h3>
{/if}
{#if characterWorkplace!== undefined}
  <h3 class="h3">Workplace: {characterWorkplace}</h3>
{/if}
<h3 class="h3">Call me if you need <span class="text-primary-100">{callMeIfYouNeed}</span> with expertise in<span class="text-primary-100">{#each selectedExpertise as se}&nbsp;{se.label}{/each}</span></h3>

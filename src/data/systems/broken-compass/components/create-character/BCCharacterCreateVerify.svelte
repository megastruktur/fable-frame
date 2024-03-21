<script lang="ts">
	import type { Field } from "$lib/types";

  export let characterName: string
  export let characterHeritage: string
  export let characterHomeland: string
  export let characterWorkplace: string

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

<script lang="ts">
	import type { CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import CharacterSheet from "./CharacterSheet.svelte";

  export let characters: CharactersResponse[]
  export let rpgSystem: RpgSystemsResponse
  export let campaign: CampaignsResponse
</script>

<div class="flex flex-col w-96">
  {#each characters as character(character.id)}
    <CharacterSheet
      {character}
      {rpgSystem}
      {campaign}
      compactVersion={true} />
  {/each}
</div>

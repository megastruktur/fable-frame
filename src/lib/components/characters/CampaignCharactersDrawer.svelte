<script lang="ts">
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { getCharacterWithSystemAndCampaign } from "$models/character";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import CharacterSheet from "./CharacterSheet.svelte";

  export let characterIds: string[]

  let characters: CharactersResponse[]

  async function getCharacters() {
    const requests = characterIds.map((characterId) => getCharacterWithSystemAndCampaign(characterId)
    )

    characters = await Promise.all(requests)
  }
</script>

{#await getCharacters()}
  <ProgressBar />
{:then}
  <div class="flex flex-col w-96">
    {#each characters as character(character.id)}
      <CharacterSheet {character} compactVersion={true} />
    {/each}
  </div>
{/await}

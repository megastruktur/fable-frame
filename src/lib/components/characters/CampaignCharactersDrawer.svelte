<script lang="ts">
	import type { CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
	import CharacterSheet from "./CharacterSheet.svelte";

  export let characters: CharactersResponse[]
  export let rpgSystem: RpgSystemsResponse
  export let campaign: CampaignsResponse
</script>

<div class="flex flex-col w-96 p-3">

  <Accordion
      regionControl=""
    >
    {#each characters as character(character.id)}

      <AccordionItem open={characters.length === 1}>
        <svelte:fragment slot="summary">{character.name}</svelte:fragment>
        <svelte:fragment slot="content">
          <CharacterSheet
          {character}
          {rpgSystem}
          {campaign}
          compactVersion={true} />
        </svelte:fragment>
      </AccordionItem>
    {/each}
  </Accordion>
</div>

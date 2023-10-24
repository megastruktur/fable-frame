<script lang="ts">

  import { page } from "$app/stores"
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { getCampaignCharacterRequests } from "$models/campaign";
	import { ProgressRadial, type ToastSettings, getToastStore } from "@skeletonlabs/skeleton";
	import CharacterItem from "$lib/components/characters/CharacterItem.svelte";
	import { addCharacterToCampaign } from "$models/character";

  let characters: CharactersResponse[]
  let characterSelected: CharactersResponse

  const toastStore = getToastStore()

  async function getData() {
    characters = await getCampaignCharacterRequests($page.params.campaignId)
  }

  async function approveRequestHandler() {
    
    characterSelected.campaignStatus = 1

    try {
      const updatedCharacter = await addCharacterToCampaign(characterSelected.id, $page.params.campaignId)
      if (updatedCharacter !== undefined) {
        // Success Toast
        const t: ToastSettings = {
          message: `Character ${updatedCharacter.name} was approved`,
          timeout: 5000
        };
  
        toastStore.trigger(t)

        characters = characters.filter(character => character.id !== updatedCharacter.id)
      }
    }
    catch (error) {
      console.error(error)
    }
    
  }

  function goBack() {
    window.history.back()
  }

  $: canComplete = characterSelected !== undefined

</script>

<h1 class="h1 text-center my-6">Campaign requests</h1>
<hr />

{#await getData()}
  <ProgressRadial value={undefined} />
{:then}

  <div class="flex justify-center my-6 flex-wrap">
    {#each characters as character(character.id)}

    {@const isCharacterSelected = (characterSelected !== undefined && character.id === characterSelected.id ) }
    <button class="btn {isCharacterSelected ? "variant-filled" : ""}" on:click={() => characterSelected = character}>
      <CharacterItem {character} />
    </button>
    {/each}
  </div>

  {#if characters.length > 0}
  <div class="flex justify-center">
    <button class="btn btn-xl { canComplete ? "variant-filled-success" : "variant-soft" }" on:click={approveRequestHandler}>Approve</button>
  </div>
  {:else}
    <p class="text-center">No requests found</p>
  {/if}
  <div class="flex justify-center">
    <button class="btn btn-xl variant-ghost-secondary mt-6" on:click={goBack}>Back to Campaign</button>
  </div>
{/await}

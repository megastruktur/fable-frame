<script lang="ts">

  import { page } from "$app/stores"
	import type { CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { type ToastSettings, getToastStore, clipboard } from "@skeletonlabs/skeleton";
	import { addCharacterToCampaign, getBgCharacterImage } from "$models/character";
	import { toastShow } from "$lib/toast";
	import SquareCard from "../global/SquareCard.svelte";

  // Result of getCampaignCharacterRequests function
  export let characters: CharactersResponse[]
  export let campaign: CampaignsResponse
  export let rpgSystem: RpgSystemsResponse
  let characterSelected: CharactersResponse

  const toastStore = getToastStore()

  async function approveRequestHandler() {
    
    characterSelected.campaignStatus = 1

    try {
      const updatedCharacter = await addCharacterToCampaign(characterSelected.id, campaign.id)
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

<div class="flex flex-col items-center">
  <h1 class="h1 text-center my-6">Campaign requests</h1>
  
  <button class="btn variant-ghost-success mb-3"
    use:clipboard={`${$page.url.origin}/campaigns/${campaign.id}/request`}
    on:click={() => toastShow("Invite link copied", toastStore)}>INVITE</button>
  
  
  {#if characters !== undefined && characters.length > 0}
    <div class="flex justify-center my-6 flex-wrap">
      {#each characters as character(character.id)}
  
        {@const isCharacterSelected = (characterSelected !== undefined && character.id === characterSelected.id ) }
        {@const characterImage = getBgCharacterImage(character, rpgSystem)}

        <button class="btn {isCharacterSelected ? "variant-filled" : ""}" on:click={() => characterSelected = character}>
          <SquareCard
            imageUrl={characterImage}
            title={character.name}
            subtitle={rpgSystem !== undefined ? rpgSystem.name : ""}
            />
        </button>
      {/each}
    </div>
    <div class="flex justify-center">
      <button class="btn btn-xl { canComplete ? "variant-filled-success" : "variant-soft" }" on:click={approveRequestHandler}>Approve</button>
    </div>
  {:else}
    <p class="text-center">No requests found</p>
  {/if}
</div>

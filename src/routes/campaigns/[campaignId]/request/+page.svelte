<script lang="ts">
	import { goto } from "$app/navigation";
  import { page } from "$app/stores"
	import CharacterItem from "$lib/components/characters/CharacterItem.svelte";
	import SquareCard from "$lib/components/global/SquareCard.svelte";
	import type { CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { getCampaignWithRpgSystem } from "$models/campaign";
	import { getBgCharacterImage, getMyCharactersForSystemNoCampaign, updateCharacter } from "$models/character";
	import { ProgressRadial, type ToastSettings, getToastStore } from "@skeletonlabs/skeleton";

  let rpgSystem: RpgSystemsResponse
  let campaign: CampaignsResponse
  let characters: CharactersResponse[]
  let characterSelected: CharactersResponse

  const toastStore = getToastStore()

  $: canComplete = characterSelected !== undefined

  async function getData() {

    try {

      campaign = await getCampaignWithRpgSystem($page.params.campaignId)
  
      if (campaign !== undefined) {
        rpgSystem = campaign.expand.rpgSystem
        characters = await getMyCharactersForSystemNoCampaign(rpgSystem.id)
      }
    }
    catch (error) {
      // console.log(error)
    }
  }

  async function sendCampaignRequest() {

    try {

      characterSelected.campaign = campaign.id
      characterSelected.campaignStatus = 0
      const characterUpdated = await updateCharacter(characterSelected.id, characterSelected)

      if (characterUpdated !== undefined) {
        // Success Toast
        const t: ToastSettings = {
          message: "Request sent",
          timeout: 5000
        };
  
        toastStore.trigger(t)
        goto("/characters")
      }
    }
    catch(error) {
      console.log(error)
    }
    
  }
</script>

{#await getData()}
  <ProgressRadial value={undefined} />
{:then}
  <h1 class="h1 text-center my-6">Select a character to request to join campaign</h1>
  <hr />
  <div class="flex justify-center my-6 flex-wrap">
    {#each characters as character}
  
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
    <button class="btn btn-xl { canComplete ? "variant-filled-success" : "variant-soft" }" on:click={sendCampaignRequest}>Send request</button>
  </div>
{/await}

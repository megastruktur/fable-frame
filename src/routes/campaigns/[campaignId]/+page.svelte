<script lang="ts">
  import { page } from "$app/stores"
	import CharacterItem from "$lib/components/characters/CharacterItem.svelte"
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { headerBanner } from "$lib/stores";
	import { getCampaignCharacters, getCampaignImage, getCampaignWithRpgSystem } from "$models/campaign"
	import { ProgressRadial, getToastStore } from "@skeletonlabs/skeleton"
  import { clipboard } from '@skeletonlabs/skeleton'
	import { toastShow } from "$lib/toast";

  const toastStore = getToastStore()

  let campaign: CampaignResponse
  let rpgSystem: RpgSystemsResponse
  let characters: CharactersResponse[]

  async function loadData() {

    // @todo Investigate why there are so many calls (3 calls, 2 of them return 404)
    try {
      campaign = await getCampaignWithRpgSystem($page.params.campaignId)
  
      if (campaign) {
        rpgSystem = campaign.expand.rpgSystem

        headerBanner.set(getCampaignImage(campaign))
      }

      characters = await getCampaignCharacters($page.params.campaignId)

    }
    catch (error) {
      // console.error(error)
    }
  }

</script>

{#await loadData()}
  <ProgressRadial value={undefined} />
{:then}
  <div class="flex flex-col">

    <h1 class="h2 mx-auto mt-6">{campaign.name}</h1>
    <h6 class="h6 mx-auto my-6">{rpgSystem.name}</h6>

    {#if campaign.creator === $currentUser?.id}
    <div class="flex flex-wrap justify-center">
      <a class="btn variant-ghost-warning mx-3" href="/campaigns/{$page.params.campaignId}/edit">EDIT</a>
      <a class="btn variant-ghost-secondary mx-3" href="/campaigns/{$page.params.campaignId}/requests">CAMPAIGN REQUESTS</a>
      <button class="btn variant-ghost-success mx-3" use:clipboard={`${$page.url.origin}/campaigns/${$page.params.campaignId}/request`} on:click={() => toastShow("Invite link copied", toastStore)}>INVITE</button>
    </div>
    {/if}

    <article class="mt-6 text-center">{campaign.description}</article>

    <div class="flex flex-wrap justify-center">
      {#each characters as character}
      <a class="btn" href="/characters/{character.id}">
        <CharacterItem {character} />
      </a>
      {/each}
    </div>
  </div>
{/await}

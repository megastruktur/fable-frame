<!-- Campaigns Page -->
<script lang="ts">
	import { receive, send } from '$lib/animation';
	import SearchFilter from '$lib/components/SearchFilter.svelte';
	import CampaignCard from '$lib/components/campaign/CampaignCard.svelte';
	import SquareCard from '$lib/components/global/SquareCard.svelte';
  import type { CampaignsResponse } from '$lib/pocketbase-types';
	import { toastShow } from '$lib/toast';
	import { getGMCampaigns, getCharacterCampaigns } from '$models/campaign';
	import { getToastStore, ProgressBar } from '@skeletonlabs/skeleton';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

  const toastStore = getToastStore()

  let gmCampaigns: CampaignsResponse[]
  let gmCampaignsFiltered: CampaignsResponse[]
  let characterCampaigns: CampaignsResponse[]
  let characterCampaignsFiltered: CampaignsResponse[]

  async function getData() {
    characterCampaigns = await getCharacterCampaigns()
    gmCampaigns = await getGMCampaigns()
  }

  function campaignRemoveHandler({detail: { campaign }} : {detail: {campaign: CampaignsResponse}}) {
    gmCampaigns = gmCampaigns.filter(c => c.id !== campaign.id)
    characterCampaigns = characterCampaigns.filter(c => c.id !== campaign.id)
    toastShow(`Campaign <span class="text-error-900">${campaign.name}</span> has been removed`, toastStore)
  }

</script>

<div class="flex flex-col" transition:fade>

	{#await getData()}
    <div class="flex items-center">
      <ProgressBar />
    </div>
	{:then}
    <div class="flex items-center justify-center flex-wrap">
      <h2 class="h2 text-center my-6">Game Master in</h2>
      <SearchFilter class="mb-6" items={gmCampaigns} bind:filteredItems={gmCampaignsFiltered} />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#if gmCampaigns.length > 0}
  
          {#each gmCampaigns as gc(gc.id)}
            <div class=""
              animate:flip
              in:receive={{ key: gc.id }}
              out:send={{ key: gc.id }}
            >
              <CampaignCard campaign={gc} classes="m-3" />
  
            </div>
          {/each}
        {/if}
        <SquareCard
          link="/campaigns/create"
          isAddButton={true}
        />
      </div>
    </div>
  
  
    {#if characterCampaigns.length > 0}
      <div class="flex items-center justify-center flex-wrap">
        <h2 class="h2 text-center my-6">Play in</h2>
        <SearchFilter class="mb-6" items={characterCampaigns} bind:filteredItems={characterCampaignsFiltered} />
  
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {#each characterCampaigns as cc(cc.id)}
          <div
            animate:flip
            in:receive={{ key: cc.id }}
            out:send={{ key: cc.id }}
            >
            <CampaignCard on:campaignRemove={campaignRemoveHandler} campaign={cc} classes="m-3" />
          </div>
          {/each}
        </div>
      </div>
    {/if}
	{/await}
</div>

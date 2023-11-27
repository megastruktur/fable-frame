<!-- Campaigns Page -->
<script lang="ts">
	import { receive, send } from '$lib/animation';
	import CampaignCard from '$lib/components/campaign/CampaignCard.svelte';
  import type { CampaignsResponse } from '$lib/pocketbase-types';
	import { toastShow } from '$lib/toast';
	import { getGMCampaigns, getCharacterCampaigns } from '$models/campaign';
	import { getToastStore, ProgressBar } from '@skeletonlabs/skeleton';
  // @ts-ignore
  import Icon from "svelte-icons-pack";
  
	import BsPlus from 'svelte-icons-pack/bs/BsPlus';
	import { flip } from 'svelte/animate';

  const toastStore = getToastStore()

  let gmCampaigns: CampaignsResponse[]
  let characterCampaigns: CampaignsResponse[]

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

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-6">Your Campaigns</h1>

	{#await getData()}
    <div class="flex items-center">
      <ProgressBar />
    </div>
	{:then}
    <h2 class="h2 text-center my-6">Game Master in</h2>
    <div class="flex flex-wrap justify-center">
      {#if gmCampaigns.length > 0}

        {#each gmCampaigns as gc(gc.id)}
          <div class="relative"
            animate:flip
            in:receive={{ key: gc.id }}
            out:send={{ key: gc.id }}
          >
            <CampaignCard campaign={gc} classes="m-3" />

          </div>
        {/each}
      {/if}
      <a
        class="card w-96 shadow-xl card-hover overflow-hidden bg-contain h-96 m-3 flex items-center justify-center"
        href="/campaigns/create">
        <Icon className="flex" size="100" color="" src={BsPlus} />
      </a>
    </div>


    {#if characterCampaigns.length > 0}
      <h2 class="h2 text-center my-6">Play in</h2>

      <div class="flex flex-wrap justify-center">
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
    {/if}
	{/await}
</div>

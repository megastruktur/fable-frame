<!-- Campaigns Page -->
<script lang="ts">
	import CampaignCard from '$lib/components/CampaignCard.svelte';
import type { CampaignResponse } from '$lib/pocketbase-types';
	import { getGMCampaigns, getCharacterCampaigns } from '$models/campaign';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

  let gmCampaigns: CampaignResponse[]
  let characterCampaigns: CampaignResponse[]

  async function getData() {
    characterCampaigns = await getCharacterCampaigns()
    gmCampaigns = await getGMCampaigns()

    console.log({characterCampaigns})
    console.log({gmCampaigns})
  }
</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-6">Your Campaigns</h1>

	{#await getData()}
    <div class="flex items-center">
      <ProgressRadial value={undefined} />
    </div>
	{:then}
    {#if gmCampaigns.length > 0}
      <h2 class="h2 text-center my-6">Game Master in</h2>

      <div class="flex flex-wrap justify-center">
        {#each gmCampaigns as gc}
          <CampaignCard campaign={gc} classes="m-3" />
        {/each}
      </div>
    {/if}

    {#if characterCampaigns.length > 0}
      <h2 class="h2 text-center my-6">Play in</h2>

      <div class="flex flex-wrap justify-center">
        {#each characterCampaigns as cc}
          <CampaignCard campaign={cc} classes="m-3" />
        {/each}
      </div>
    {/if}
	{/await}
</div>

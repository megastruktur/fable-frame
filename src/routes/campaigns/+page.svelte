<!-- Campaigns Page -->
<script lang="ts">
	import { getAllCampaigns } from '$models/campaign';

	let campaignsPromise = getAllCampaigns();
</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-3">Your Campaigns</h1>
  <div class="flex items-center justify-center">
	{#await campaignsPromise}
		Loading your campaigns...
	{:then campaigns}
		{#each campaigns as campaign}
    <a href="/campaigns/{campaign.id}" class="card w-96 shadow-xl card-hover">
      <header><img src="/images/fantasy-background-campaign.jpg" alt="{campaign.name}" /></header>
      <div class="p-4 space-y-4">
        <h3 class="h3">{campaign.name}</h3>
        <article>{campaign.description}</article>
      </div>
    </a>
		{/each}
	{/await}
  </div>
</div>

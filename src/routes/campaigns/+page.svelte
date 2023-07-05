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
    <div class="card w-96 bg-base-100 shadow-xl image-full">
      <figure><img src="/images/fantasy-background-campaign.jpg" alt="{campaign.name}" /></figure>
      <div class="card-body">
        <h2 class="card-title">{campaign.name}</h2>
        <p>{campaign.description}</p>
        <div class="card-actions justify-end">
          <a href="/campaigns/{campaign.id}" class="btn btn-primary">View</a>
        </div>
      </div>
    </div>
		{/each}
	{/await}
  </div>
</div>

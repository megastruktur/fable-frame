<script lang="ts">
	import type { CampaignResponse } from "$lib/pocketbase-types";


  export let campaign: CampaignResponse
  export let classes: string = ""

</script>

<a href="/campaigns/{campaign.id}" class="card w-96 shadow-xl card-hover overflow-hidden {classes}">
  <header><img src="/images/fantasy-background-campaign.jpg" alt="{campaign.name}" /></header>
  <div class="p-4 space-y-4">
    <h3 class="h3">{campaign.name}</h3>
    <article>{campaign.description}</article>
  </div>
</a>

<script lang="ts">
	import type { CampaignResponse } from "$lib/pocketbase-types"
	import { getCampaignImage } from "$models/campaign"

  export let campaign: CampaignResponse
  export let classes: string = ""

  let campaignImage = getCampaignImage(campaign)

  if (campaignImage === "") {
    campaignImage = "/images/fantasy-background-campaign.jpg"
  }

</script>

<div
  class="card w-96 shadow-xl card-hover overflow-hidden {classes} bg-contain h-96 relative bg-no-repeat"
  style="background-image: url('{campaignImage}')">
  <a
    href="/campaigns/{campaign.id}"
    >
  
    <div class="p-4 space-y-4 bg-primary-900/70 w-full bottom-0 absolute">
      <h3 class="h3">{campaign.name}</h3>
      <article>{campaign.description}</article>
    </div>
  </a>
</div>

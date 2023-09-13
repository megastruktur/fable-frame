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

<a
  class="block card w-96 h-96 shadow-xl card-hover overflow-hidden {classes} bg-cover bg-center relative bg-no-repeat"
  style="background-image: url('{campaignImage}')"
  href="/campaigns/{campaign.id}">
  <div class="p-4 bg-primary-900/70 w-full bottom-0 absolute h-1/4">
    <h3 class="h3 text-center">{campaign.name}</h3>
    <p class="mt-1 blo">{campaign.description}</p>
  </div>
</a>

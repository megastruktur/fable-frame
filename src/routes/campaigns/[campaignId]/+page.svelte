<script lang="ts">
  import { page } from "$app/stores"
	import type { CampaignResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { getCampaign } from "$models/campaign";
	import { getRpgSystem } from "$models/rpg_system";
	import { ProgressRadial } from "@skeletonlabs/skeleton";

  let campaign: CampaignResponse
  let rpgSystem: RpgSystemsResponse
  let characters: CharactersResponse[]

  async function loadData() {

    // @todo Investigate why there are so many calls (3 calls, 2 of them return 404)
    try {
      campaign = await getCampaign($page.params.campaignId)
  
      if (campaign) {
        rpgSystem = await getRpgSystem(campaign.rpgSystem)
      }
      console.log("xx")
      return campaign
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

    <h1 class="h2 m-auto mt-6">{campaign.name}</h1>
    <h6 class="h6 m-auto my-6">{rpgSystem.name}</h6>

    <article class="">{campaign.description}</article>
  </div>
{/await}

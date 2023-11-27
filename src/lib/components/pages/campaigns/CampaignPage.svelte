<script lang="ts">
  import { page } from "$app/stores"
	import type { CampaignsResponse } from "$lib/pocketbase-types";
	import { getCampaignWithRpgSystemCharsAndNotes } from "$models/campaign"
	import { ProgressBar } from "@skeletonlabs/skeleton"
	import Campaign from "$lib/components/campaign/Campaign.svelte";

  export let campaignId: string

  let campaign: CampaignsResponse

  async function loadData() {

    // @todo Investigate why there are so many calls (3 calls, 2 of them return 404)
    try {
      campaign = await getCampaignWithRpgSystemCharsAndNotes(campaignId)
    }
    catch (error) {
      // console.error(error)
    }
  }

</script>

{#await loadData()}
  <ProgressBar />
{:then}
  <Campaign {campaign} />
{/await}

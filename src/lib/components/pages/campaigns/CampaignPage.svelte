<script lang="ts">
	import type { CampaignsResponse } from "$lib/pocketbase-types";
	import { getCampaignWithRpgSystemCharsAndNotes, subscribeToCampaign } from "$models/campaign"
	import { ProgressBar } from "@skeletonlabs/skeleton"
	import Campaign from "$lib/components/campaign/Campaign.svelte";
	import { onDestroy } from "svelte";
	import type { UnsubscribeFunc } from "pocketbase";

  export let campaignId: string

  let campaign: CampaignsResponse

  let unsubscribeFromCampaign: UnsubscribeFunc

  async function campaignUpdateHandler({action, record}: {action: string, record: CampaignsResponse}) {
    if (action === "update") {
      try {
        campaign = await getCampaignWithRpgSystemCharsAndNotes(record.id)
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  async function loadData() {

    // @todo Investigate why there are so many calls (3 calls, 2 of them return 404)
    unsubscribeFromCampaign = await subscribeToCampaign(campaignId, campaignUpdateHandler)
    try {
      campaign = await getCampaignWithRpgSystemCharsAndNotes(campaignId)
    }
    catch (error) {
      console.error(error)
    }
  }

  onDestroy(() => {
    if (unsubscribeFromCampaign !== undefined) {
      unsubscribeFromCampaign()
    }
  })

</script>

{#await loadData()}
  <ProgressBar />
{:then}
  <Campaign {campaign} />
{/await}

<script lang="ts">
	import { goto } from "$app/navigation";
  import { page } from "$app/stores"
	import CampaignImageEdit from "$lib/components/campaign/CampaignImageEdit.svelte";
	import type { CampaignResponse } from "$lib/pocketbase-types";
	import { getCampaign, updateCampaign } from "$models/campaign";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
  
  // $page.params.campaignId

  let campaign: CampaignResponse
  let canComplete: boolean = false

  $: canComplete = (
    campaign !== undefined && campaign.name !== ""
    )

  async function getData() {
    try {
      campaign = await getCampaign($page.params.campaignId)
    }
    catch (error) {
      // console.error(error)
    }
  }

  async function updateCampaignHandler() {
    await updateCampaign($page.params.campaignId, campaign)
    goto(`/campaigns/${$page.params.campaignId}`)
  }


</script>

{#await getData()}
  <ProgressRadial value={undefined} />
{:then}
  <input bind:value={campaign.name} class="input mb-6 h1" type="text" placeholder="Campaign Name" />

  <div class="flex justify-center">
    <CampaignImageEdit {campaign} />
  </div>

  <textarea bind:value={campaign.description} class="textarea my-3" rows="4" placeholder="Optional Description" />

  <button
  class="btn btn-xl { canComplete ? "variant-filled-success" : "variant-soft" }"
  disabled="{!canComplete}"
  on:click={updateCampaignHandler}
  >Save</button>
  <a class="btn btn-xl variant-soft-error" href="/campaigns/{$page.params.campaignId}">Cancel</a>
{/await}


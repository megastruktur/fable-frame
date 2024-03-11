<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignNotesResponse, CampaignsResponse } from "$lib/pocketbase-types";
	import CampaignNoteAdd from "$lib/components/campaign/CampaignNoteAdd.svelte";
	import { getCampaign } from "$models/campaign";
	import { getCampaignNotes } from "$models/campaign_notes";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import CampaignNote from "./CampaignNote.svelte";


  export let campaignId: string

  let campaign: CampaignsResponse
  let campaignNotes: CampaignNotesResponse[]
  let isUserGm: boolean = false

  async function campaignNotesLoad() {
    campaignNotes = await getCampaignNotes(campaignId)
    campaign = await getCampaign(campaignId)
    isUserGm = (campaign.creator === $currentUser?.id)
  }

  async function campaignNoteAddedHandler() {
    campaignNotes = await getCampaignNotes(campaignId)
  }

</script>

{#await campaignNotesLoad()}
  <ProgressBar />
{:then}

  {#if isUserGm}
    <div class="px-3">
      <CampaignNoteAdd
        campaignId={campaign.id}
        on:campaignNoteAdded={campaignNoteAddedHandler} />
    </div>
  {/if}
  <div class="space-y-3">
    {#each campaignNotes as campaignNote(campaignNote.id)}
      {#if !(!isUserGm && campaignNote.type.find(type => type === "gm") === undefined)}
        <CampaignNote {campaignNote} />
      {/if}
    {/each}
  </div>
{/await}

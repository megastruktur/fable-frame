<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignsResponse } from "$lib/pocketbase-types"
	import { deleteCampaign, getCampaignImage } from "$models/campaign"
	import { createEventDispatcher } from "svelte";
  import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';

  export let campaign: CampaignsResponse
  export let classes: string = ""

  const dispatch = createEventDispatcher()
  const modalStore = getModalStore()

  let campaignImage = getCampaignImage(campaign)

  if (campaignImage === "") {
    campaignImage = "/images/fantasy-background-campaign.jpg"
  }

  let isGm: boolean = false

  if ($currentUser && $currentUser.id === campaign.creator) {
    isGm = true
  }
  

  async function deleteCampaignPrompt() {

    if (isGm) {

      const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: `Are you sure you want to remove campaign <span class="text-error-900">${campaign.name}</span>? This action cannot be undone.`,
        response: async (r: boolean) => {
          if (r === true) {

            await deleteCampaign(campaign.id)

            dispatch("campaignRemove", {
              campaign: campaign
            })

          }
        }
      };
      modalStore.trigger(modal);
    }
  }

</script>

<a
  class="relative block card w-96 h-96 shadow-xl card-hover overflow-hidden {classes} bg-cover bg-center relative bg-no-repeat"
  style="background-image: url('{campaignImage}')"
  href="/campaigns/{campaign.id}">

  {#if isGm}
    <div class="flex space-x-2 justify-end mr-2 mt-2">
      <button
        on:click|preventDefault={deleteCampaignPrompt}
        class="btn btn-icon btn-icon-sm text-xl variant-filled-error">
          <span class="i-streamline-recycle-bin-2-solid"></span>
      </button>
    </div>
  {/if}

  <div class="p-4 bg-primary-900/70 w-full bottom-0 absolute h-1/4">
    <h3 class="h3 text-center">{campaign.name}</h3>
    <p class="mt-1 blo">{campaign.description}</p>
  </div>
</a>

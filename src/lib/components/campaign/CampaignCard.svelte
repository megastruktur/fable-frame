<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignsResponse } from "$lib/pocketbase-types"
	import { deleteCampaign, getCampaignImage } from "$models/campaign"
	import { createEventDispatcher } from "svelte";
  import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import { truncateText } from "$lib/utils";

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
  class="card block w-72 h-72 bg-cover bg-no-repeat bg-center relative overflow-hidden {classes}"
  style="background-image: url('{campaignImage}')"
  href="/campaigns/{campaign.id}">


  <div class="w-full h-full bg-surface-900/70 flex flex-col justify-center">
    <section class="p-4">
      <h2 class="h2 text-center">{truncateText(campaign.name, 25)}</h2>
    </section>
    <footer class="card-footer italic text-center">
      <p class="mt-1 blo">{truncateText(campaign.description, 50)}</p>
    </footer>
  </div>

  {#if isGm}
    <button
      on:click|preventDefault={deleteCampaignPrompt}
      class="btn btn-icon btn-icon-sm text-xl variant-ghost-error absolute top-2 left-2">
        <i class="i-[material-symbols--delete] text-3xl" />
    </button>
  {/if}

</a>

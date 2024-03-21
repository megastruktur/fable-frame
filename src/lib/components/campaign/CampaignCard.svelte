<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignsResponse } from "$lib/pocketbase-types"
	import { deleteCampaign, getCampaignImage } from "$models/campaign"
	import { createEventDispatcher } from "svelte";
  import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import { truncateText } from "$lib/utils";
	import SquareCard from "../global/SquareCard.svelte";
	import CircleIconButton from "../global/CircleIconButton.svelte";

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

<SquareCard
  imageUrl={campaignImage}
  title={truncateText(campaign.name, 25)}
  subtitle={truncateText(campaign.description, 50)}
  link="/campaigns/{campaign.id}"
  >

  <fragment slot="actionButtons">
    {#if isGm}
      <CircleIconButton
        icon="i-[material-symbols--delete]"
        color="variant-ghost-error"
        on:click={deleteCampaignPrompt}
      />
    {/if}
  </fragment>
</SquareCard>

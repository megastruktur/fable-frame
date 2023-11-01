<script lang="ts">
	import { Avatar, type ModalSettings, getModalStore } from "@skeletonlabs/skeleton";
	import CampaignImageUploadModal from "./CampaignImageUploadModal.svelte";
  import BsPencil from "svelte-icons-pack/bs/BsPencil";
	import type { CampaignsResponse } from "$lib/pocketbase-types";
	import { getCampaignImage } from "$models/campaign";
  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"

  export let campaign: CampaignsResponse

  export let imageUrl: string = getCampaignImage(campaign)

  const modalStore = getModalStore()

  async function openModal() {
    
    modalStore.clear();

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component registry key as a string:
      component: {
        // Pass a reference to your custom component
        ref: CampaignImageUploadModal,
        // Add the component properties as key/value pairs
        props: {
          campaign: campaign
        },
      },
      response: (r: string) => {

        if (r !== undefined) {
          console.log(r)
          imageUrl = r
        }
      },
    };

    modalStore.trigger(modal)
  }

  $: imageUrl

</script>

<div class="relative w-32">
  <Avatar src={imageUrl} width="w-32" rounded="rounded-3xl" initials={campaign.name.charAt(0)} />

  <button class="btn-icon btn-icon-sm variant-filled-secondary absolute bottom-0 right-0" type="button" on:click={openModal}>
    <Icon src={BsPencil} />
  </button>

</div>

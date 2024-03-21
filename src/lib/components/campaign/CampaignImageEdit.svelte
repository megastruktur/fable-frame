<script lang="ts">
	import { Avatar, type ModalSettings, getModalStore } from "@skeletonlabs/skeleton";
  import BsPencil from "svelte-icons-pack/bs/BsPencil";
	import type { CampaignsResponse } from "$lib/pocketbase-types";
	import { getCampaignImage } from "$models/campaign";
  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"
	import ImageUploadModal from "../ImageUploadModal.svelte";

  export let campaign: CampaignsResponse
  export let imageUrl: string = getCampaignImage(campaign)
  export let uploadedImage: File | null = null

  const modalStore = getModalStore()


  async function openModal() {
    
    modalStore.clear();

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component registry key as a string:
      component: {
        // Pass a reference to your custom component
        ref: ImageUploadModal,
      },
      response: (image: File) => {

        if (image !== undefined) {
          uploadedImage = image
          imageUrl = URL.createObjectURL(image)
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

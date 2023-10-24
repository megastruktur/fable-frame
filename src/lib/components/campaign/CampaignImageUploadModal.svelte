<script lang="ts">
	import type { CampaignsResponse } from "$lib/pocketbase-types"
	import { campaignUpdateImage, getCampaignImage } from "$models/campaign"
	import { FileDropzone, ProgressBar, type ToastSettings, getModalStore, getToastStore } from "@skeletonlabs/skeleton"
  const Icon = require("svelte-icons-pack").Icon;
  import BsUpload from "svelte-icons-pack/bs/BsUpload"

  const modalStore = getModalStore()
  const toastStore = getToastStore()


  export let campaign: CampaignsResponse

  let files: FileList;
  let loading: boolean = false;

  /**
   * Change the avatar of the character
   * @param e
   */
  async function onChangeHandler(e: Event): Promise<void> {

    loading = true
    const formData = new FormData()

    if (files[0] !== undefined) {
      formData.append("image", files[0])

      try {
        campaign = await campaignUpdateImage(campaign.id, formData)
        const imageUrl = getCampaignImage(campaign)
        loading = false
        if ($modalStore[0].response) {
          $modalStore[0].response(imageUrl)
        }
        modalStore.close()
        
      } catch (error) {
        console.log(error)
        const t: ToastSettings = {
          message: `An error occured. Please try again`,
          background: "variant-filled-error",
          timeout: 5000
        };
        toastStore.trigger(t);
      }
    }
  }
</script>

{#if $modalStore[0]}
<div class="w-modal-slim">
  {#if loading}
    <ProgressBar />
  {:else}
    <FileDropzone name="image" bind:files={files} on:change={onChangeHandler}>
      <svelte:fragment slot="lead">
        <Icon size="40" src={BsUpload} className="inline-block" />
      </svelte:fragment>
      <svelte:fragment slot="message">Upload a file</svelte:fragment>
      <svelte:fragment slot="meta">PNG, JPG and GIF allowed</svelte:fragment>
    </FileDropzone>
  {/if}
  <slot />
</div>
{/if}

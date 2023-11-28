<script lang="ts">
	import CampaignImageEdit from "$lib/components/campaign/CampaignImageEdit.svelte";
	import type { CampaignsResponse } from "$lib/pocketbase-types";
	import { updateCampaign } from "$models/campaign";
	import { getDrawerStore, getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
  
  const drawerStore = getDrawerStore()
  const toastStore = getToastStore()

  export let campaign: CampaignsResponse

  let canComplete: boolean = false
  let uploadedImage: File | null = null

  $: canComplete = (
    campaign !== undefined && campaign.name !== ""
    )

  async function updateCampaignHandler() {
    try {

      const formData = new FormData()

      if (uploadedImage !== null) {
        formData.append("image", uploadedImage)
      }

      formData.append("description", campaign.description)

      await updateCampaign(campaign.id, formData)
      drawerStore.close()
    }
    catch (error) {
      console.log(error)
      const t: ToastSettings = {
        message: `An error occured. Please try again`,
        background: "variant-filled-error",
        timeout: 5000
      };
      toastStore.trigger(t);
    }
  }

</script>

<div>
  <input bind:value={campaign.name} class="input mb-6 h1" type="text" placeholder="Campaign Name" />

  <div class="flex justify-center">
    <CampaignImageEdit {campaign} bind:uploadedImage={uploadedImage} />
  </div>

  <textarea bind:value={campaign.description} class="textarea my-3" rows="4" placeholder="Optional Description" />

  <button
  class="btn btn-xl { canComplete ? "variant-filled-success" : "variant-soft" }"
  disabled="{!canComplete}"
  on:click={updateCampaignHandler}
  >Save</button>
  <button
    on:click={() => drawerStore.close()}
    class="btn btn-xl variant-soft-error">Cancel</button>
</div>


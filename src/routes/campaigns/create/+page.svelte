<script lang="ts">
	import { getAllRpgSystems } from "$models/rpg_system";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import RpgSystemCard from "$lib/components/RpgSystemCard.svelte";
	import type { RpgSystemsResponse } from "$lib/pocketbase-types";
	import { createCampaign } from "$models/campaign";
	import { goto } from "$app/navigation";


  let selectedSystem: RpgSystemsResponse
  let campaignName: string
  let canComplete: boolean = false
  let campaignDescription: string

  $: canComplete = (selectedSystem !== undefined
    && campaignName !== undefined
    && campaignName !== ""
    )

  async function createCampaignHandler() {

    try {
      const campaign = await createCampaign({
        name: campaignName,
        rpgSystem: selectedSystem.id,
        description: campaignDescription,
      })

      goto(`/campaigns/${campaign.id}`)
    } catch (error) {
      console.error(error)
    }
  }

</script>

<div class="flex flex-col">

  <h1 class="h2 m-auto my-3">Create Campaign</h1>
  
  <hr />

  <input bind:value={campaignName} class="input" type="text" placeholder="Campaign Name" />

  {#await getAllRpgSystems({ status: true })}
    <ProgressRadial value={undefined} />
  {:then rpgSystems}
    <div class="flex justify-around flex-wrap my-3">
      {#each rpgSystems as rpgSystem}
        {@const selected = selectedSystem && selectedSystem.id === rpgSystem.id}
        <RpgSystemCard classes="mb-3" {selected} rpgSystem={rpgSystem} on:click={() => selectedSystem = rpgSystem} />
      {/each}
    </div>
  {/await}

  <textarea bind:value={campaignDescription} class="textarea my-3" rows="4" placeholder="Optional Description" />

  <button
    class="btn btn-xl { canComplete ? "variant-filled-success" : "variant-soft" }"
    disabled="{!canComplete}"
    on:click={createCampaignHandler}
    >Create</button>

</div>

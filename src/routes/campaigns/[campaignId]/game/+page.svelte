<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Scene from "$lib/components/scenes/Scene.svelte";
  import type { CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getCampaignWithCharactersAndActiveSceneAndRpgSystem, subscribeToCampaign } from "$models/campaign";
	import type { UnsubscribeFunc } from "pocketbase";
	import { onDestroy, onMount } from "svelte";


  let campaignId: string = $page.params.campaignId
  let scene: ScenesResponse
  let campaign: CampaignsResponse
  let unsubscribeFromCampaign: UnsubscribeFunc

  async function loadData() {
    await setCampaignAndScene()
    unsubscribeFromCampaign = await subscribeToCampaign(campaignId, campaignSub)
  }

  async function setCampaignAndScene() {
    campaign = await getCampaignWithCharactersAndActiveSceneAndRpgSystem(campaignId)
    scene = campaign.expand.activeScene
  }

  async function campaignSub({action, record}: {action: string, record: any}) {

    if (action === "update") {
      if (campaign.activeScene !== record.activeScene) {
        if (record.activeScene !== null) {
          await setCampaignAndScene()
        }
        else {
          goto(`/campaigns/${campaign.id}`)
        }
      }
    }
  }

  onMount(async () => {
    loadData()
  })

  onDestroy(() => {
    if (unsubscribeFromCampaign !== undefined) {
      unsubscribeFromCampaign()
    }
  })

</script>

{#if scene !== undefined}
  {#key scene.id}
    <Scene {campaign} {scene} />
  {/key}
{:else}
  <div class="flex flex-col items-center">
      <h1 class="h1 text-center mb-3">No active scene. Come back later.</h1>
      <a class="btn variant-filled-secondary" href="/campaigns/{campaignId}">Back to campaign</a>
  </div>
{/if}

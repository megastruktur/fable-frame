<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Scene from "$lib/components/scenes/Scene.svelte";
  import type { CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getCampaignWithCharactersAndActiveScene, subscribeToCampaign } from "$models/campaign";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import type { UnsubscribeFunc } from "pocketbase";
	import { onDestroy, onMount } from "svelte";


  let scene: ScenesResponse
  let campaign: CampaignsResponse
  let unsubscribeFromCampaign: UnsubscribeFunc

  async function loadData() {
    await setCampaignAndScene()
    unsubscribeFromCampaign = await subscribeToCampaign($page.params.campaignId, testSub)
  }

  async function setCampaignAndScene() {
    campaign = await getCampaignWithCharactersAndActiveScene($page.params.campaignId)
    scene = campaign.expand.activeScene
  }

  async function testSub({action, record}: {action: string, record: any}) {

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
  <ProgressBar />
{/if}

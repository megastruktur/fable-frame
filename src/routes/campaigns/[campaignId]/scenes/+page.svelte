<script lang="ts">
	import BsPlus from 'svelte-icons-pack/bs/BsPlus';
  import { page } from "$app/stores"
	import { onMount } from 'svelte';
	import type { CampaignsResponse, ScenesResponse } from '$lib/pocketbase-types';
	import { activateScene, deactivateScene, getCampaignScenes } from '$models/scenes';
	import SceneCard from '$lib/components/scenes/SceneCard.svelte';
	import { flip } from 'svelte/animate';
	import { receive, send } from '$lib/animation';
  import Icon from "svelte-icons-pack";
	import { getCampaign } from '$models/campaign';
	import type { e } from 'vitest/dist/index-5aad25c1';

  let scenes: ScenesResponse[] = []
  let campaign: CampaignsResponse
  let campaignActiveScene: string

  onMount(async() => {
    [scenes, campaign] = await Promise.all([
      getCampaignScenes($page.params.campaignId),
      getCampaign($page.params.campaignId)
    ])
    campaignActiveScene = campaign.activeScene
  })

  async function activateSceneHandler({detail: {sceneId, campaignId}}: {detail:{sceneId: string, campaignId: string}}) {
    campaign = await activateScene(campaignId, sceneId)
    campaignActiveScene = campaign.activeScene
  }

  async function deactivateSceneHandler({detail: {sceneId, campaignId}}: {detail:{sceneId: string, campaignId: string}}) {
    campaign = await deactivateScene(campaignId)
    campaignActiveScene = campaign.activeScene
  }

</script>

<div class="flex flex-wrap justify-center">
  {#each scenes as scene(scene.id)}
    <div class="relative m-3"
        animate:flip
        in:receive={{ key: scene.id }}
        out:send={{ key: scene.id }}
      >
      <SceneCard {scene}
        on:activateScene={activateSceneHandler}
        on:deactivateScene={deactivateSceneHandler}
        isAcivated={campaignActiveScene === scene.id}
        />
    </div>
  {/each}
  <a
    class="card w-96 shadow-xl card-hover overflow-hidden bg-contain h-96 m-3 flex items-center justify-center"
    href="/campaigns/{$page.params.campaignId}/scenes/create">
    <Icon className="flex" size="100" color="" src={BsPlus} />
  </a>
</div>

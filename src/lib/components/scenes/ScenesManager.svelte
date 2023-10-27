<script lang="ts">
	import BsPlus from 'svelte-icons-pack/bs/BsPlus';
	import type { CampaignsResponse, ScenesResponse } from '$lib/pocketbase-types';
	import { activateScene, deactivateScene, deleteScene } from '$models/scenes';
	import SceneCard from '$lib/components/scenes/SceneCard.svelte';
	import { flip } from 'svelte/animate';
	import { receive, send } from '$lib/animation';
  // @ts-ignore
  import Icon from "svelte-icons-pack";
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { toastShow } from '$lib/toast';

  export let scenes: ScenesResponse[] = []
  export let campaign: CampaignsResponse
  let campaignActiveScene: string = campaign.activeScene

  const modalStore = getModalStore()
  const toastStore = getToastStore()

  async function activateSceneHandler({detail: {sceneId, campaignId}}: {detail:{sceneId: string, campaignId: string}}) {
    campaign = await activateScene(campaignId, sceneId)
    campaignActiveScene = campaign.activeScene
  }

  async function deactivateSceneHandler({detail: {sceneId, campaignId}}: {detail:{sceneId: string, campaignId: string}}) {
    campaign = await deactivateScene(campaignId)
    campaignActiveScene = campaign.activeScene
  }

  function deleteScenePromptHandler({detail: {sceneId}}: {detail:{sceneId: string}}) {

    const scene = scenes.find(scene => scene.id === sceneId)

    if (scene !== undefined) {

      const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: `Are you sure you want to remove scene <span class="text-error-900">${scene.name}</span>? This action cannot be undone.`,
        response: async (r: boolean) => {
          if (r === true) {

            await deleteScene(sceneId)
            scenes = scenes.filter(scene => scene.id !== sceneId)

            toastShow(`Scene <span class="text-error-900">${scene.name}</span> has been removed`, toastStore)

          }
        }
      };
      modalStore.trigger(modal);
    }
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
        on:deleteScenePrompt={deleteScenePromptHandler}
        isAcivated={campaignActiveScene === scene.id}
        />
    </div>
  {/each}
  <a
    class="card w-96 shadow-xl card-hover overflow-hidden bg-contain h-96 m-3 flex items-center justify-center"
    href="/campaigns/{campaign.id}/scenes/create">
    <Icon className="flex" size="100" color="" src={BsPlus} />
  </a>
</div>

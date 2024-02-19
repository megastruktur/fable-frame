<script lang="ts">
	import type { CampaignsResponse, ScenesResponse } from '$lib/pocketbase-types';
	import { activateScene, deactivateScene, deleteScene } from '$models/scenes';
	import SceneCard from '$lib/components/scenes/SceneCard.svelte';
	import { flip } from 'svelte/animate';
	import { receive, send } from '$lib/animation';
	import { getModalStore, getToastStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { toastShow } from '$lib/toast';
	import SceneEdit from './SceneEdit.svelte';
	import SquareCard from '../global/SquareCard.svelte';

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

  function onSceneUpdatedHandler({ detail: {scene } }: { detail: { scene: ScenesResponse } }) {
    scenes = scenes.map(s => s.id === scene.id ? scene : s)
  }

  async function createSceneModalHandler() {

    const SceneEditModalComponent: ModalComponent = {
      ref: SceneEdit,
      props: {
        campaignId: campaign.id,
      },
    }
    const sceneEditModal: ModalSettings = {
      type: 'component',
      component: SceneEditModalComponent,
      response: async ({scene, action}: {scene: ScenesResponse | null, action: string} = {scene: null, action: ""}) => {
        if (scene !== undefined && scene !== null) {
          if (action === "update") {
            scenes = scenes.map(scene => scene.id === scene.id? scene : scene)
          }
          else if (action === "create") {
            scenes = [...scenes, scene]
          }
        }
      },
    }
    modalStore.trigger(sceneEditModal);
  }

</script>

<div class="grid grid-cols-1 gap-4">
  {#each scenes as scene(scene.id)}
    <div class="mx-auto"
        animate:flip
        in:receive={{ key: scene.id }}
        out:send={{ key: scene.id }}
      >
      <SceneCard {scene}
        on:activateScene={activateSceneHandler}
        on:deactivateScene={deactivateSceneHandler}
        on:deleteScenePrompt={deleteScenePromptHandler}
        on:updatedScene={onSceneUpdatedHandler}
        isAcivated={campaignActiveScene === scene.id}
        />
    </div>
  {/each}

  <div class="mx-auto">

    <button
      on:click={createSceneModalHandler}
      >
      <SquareCard
        isAddButton={true}
      />
    </button>
  </div>
</div>

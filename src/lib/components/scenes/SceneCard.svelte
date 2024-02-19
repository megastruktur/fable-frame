<script lang="ts">
	import type { ScenesResponse } from "$lib/pocketbase-types"
	import { getSceneImage } from "$models/scenes";
	import { popup, type ModalComponent, type PopupSettings, type ModalSettings, getModalStore } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";
	import SceneEdit from './SceneEdit.svelte';
	import SquareCard from "../global/SquareCard.svelte";

  // BsCheckLg

  export let scene: ScenesResponse
  export let classes: string = ""
  export let isAcivated = false

  const dispatch = createEventDispatcher()
  const modalStore = getModalStore()

  let sceneImage = getSceneImage(scene)

  if (sceneImage === "") {
    sceneImage = "/images/fantasy-background-campaign.jpg"
  }

  const sceneOperationsPopup: PopupSettings = {
		event: 'focus-click',
		target: `sceneOperationsPopup-${scene.id}`,
		placement: 'bottom',
		closeQuery: '.list-option'
	};
  

  async function activateSceneHandler() {
    if (isAcivated) {
      dispatch("deactivateScene", {
        sceneId: scene.id,
        campaignId: scene.campaign
      })
    }
    else {
      dispatch("activateScene", {
        sceneId: scene.id,
        campaignId: scene.campaign
      })
    }
  }

  function deleteScenePromptHandler() {
    dispatch("deleteScenePrompt", {
      sceneId: scene.id,
    })
  }

  async function sceneEditModalHandler() {
    
    const SceneEditModalComponent: ModalComponent = {
      ref: SceneEdit,
      props: {
        campaignId: scene.campaign,
        sceneId: scene.id
      },
    }
    
    const sceneEditModal: ModalSettings = {
      type: 'component',
      component: SceneEditModalComponent,
      response: async ({scene, action}: {scene: ScenesResponse | null, action: string} = {scene: null, action: ""}) => {
        if (scene !== undefined && scene !== null) {
          if (action === "update") {
            dispatch("updatedScene", {
              scene: scene
            })
            sceneImage = getSceneImage(scene)
          }
        }
      },
    }
    modalStore.trigger(sceneEditModal);
  }


</script>

<SquareCard
  link="/campaigns/{scene.campaign}/scenes/{scene.id}"
  title="{scene.name}"
  imageUrl="{sceneImage}"
  width="w-40"
  height="h-40"
  >
  <svelte:fragment slot="actionButtons">

    <button type="button" class="btn btn-icon btn-icon-sm {isAcivated ? "text-white" : "text-gray-400"}" on:click|stopPropagation={activateSceneHandler}>
      {#if isAcivated}
        <div class="i-[fa6-solid--eye] text-5xl"></div>
      {:else}
        <div class="i-[fa6-solid--eye-slash] text-5xl"></div>
      {/if}
    </button>

    <!-- Scene Operations Popup -->
    <button
      class="btn btn-icon btn-icon-sm variant-ghost-secondary"
      use:popup={sceneOperationsPopup}
    >⋮</button>
  </svelte:fragment>
</SquareCard>


<!-- Operations Popup -->
<div class="card shadow-xl py-2" data-popup="sceneOperationsPopup-{scene.id}">
  <ul class="list-nav px-2">
    <li class="mb-2">
      <button on:click={sceneEditModalHandler}>Edit</button>
    </li>
    <li>
      <a class="bg-error-900" href="/" on:click|preventDefault={deleteScenePromptHandler}>Remove</a></li>
  </ul>
  <div class="arrow bg-surface-100-800-token" />
</div>

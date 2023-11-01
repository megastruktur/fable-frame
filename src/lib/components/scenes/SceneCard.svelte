<script lang="ts">
	import type { ScenesResponse } from "$lib/pocketbase-types"
	import { getSceneImage } from "$models/scenes";
	import { popup, type ModalComponent, type PopupSettings, type ModalSettings, getModalStore } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";
  // @ts-ignore
  import FaEye from 'svelte-icons/fa/FaEye.svelte'
  // @ts-ignore
  import FaRegEyeSlash from 'svelte-icons/fa/FaRegEyeSlash.svelte'
	import SceneEdit from './SceneEdit.svelte';

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

<div
  class="block card w-40 h-40 shadow-xl card-hover overflow-hidden {classes} bg-cover bg-center relative bg-no-repeat"
  
  style="background-image: url('{sceneImage}')"
>
  <button type="button" class="btn btn-icon btn-icon-sm absolute top-2 right-2 {isAcivated ? "text-white" : "text-gray-400"}" on:click|stopPropagation={activateSceneHandler}>
    {#if isAcivated}
    <FaEye />
    {:else}
    <FaRegEyeSlash />
    {/if}
  </button>

  <!-- Scene Operations Popup -->
  <button
    class="btn btn-icon btn-icon-sm variant-ghost-secondary absolute left-2 top-2"
    use:popup={sceneOperationsPopup}
  >⋮</button>

  <a
    class="block w-full h-full"
    href="/campaigns/{scene.campaign}/scenes/{scene.id}">
    <div class="bg-primary-900/70 w-full bottom-0 absolute h-1/4 flex items-center">
      <h5 class="h5 text-center mx-auto">{scene.name}</h5>
    </div>
  </a>


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

</div>

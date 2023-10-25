<script lang="ts">
	import type { ScenesResponse } from "$lib/pocketbase-types"
	import { getSceneImage } from "$models/scenes";
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";
  // @ts-ignore
  import FaEye from 'svelte-icons/fa/FaEye.svelte'
  // @ts-ignore
  import FaRegEyeSlash from 'svelte-icons/fa/FaRegEyeSlash.svelte'

  // BsCheckLg

  export let scene: ScenesResponse
  export let classes: string = ""
  export let isAcivated = false

  const dispatch = createEventDispatcher()

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


</script>

<div
  class="block card w-96 h-96 shadow-xl card-hover overflow-hidden {classes} bg-cover bg-center relative bg-no-repeat"
  
  style="background-image: url('{sceneImage}')"
>
  <button type="button" class="btn btn-icon absolute top-0 right-3 {isAcivated ? "text-white" : "text-gray-400"}" on:click|stopPropagation={activateSceneHandler}>
    {#if isAcivated}
    <FaEye />
    {:else}
    <FaRegEyeSlash />
    {/if}
  </button>

  <!-- Scene Operations Popup -->
  <button
    class="btn-icon variant-ghost-secondary absolute left-2 top-2"
    use:popup={sceneOperationsPopup}
  >⋮</button>

  <a
    class="block w-full h-full"
    href="/campaigns/{scene.campaign}/scenes/{scene.id}">
    <div class="p-4 bg-primary-900/70 w-full bottom-0 absolute h-1/4">
      <h3 class="h3 text-center">{scene.name}</h3>
    </div>
  </a>


  <!-- Operations Popup -->
  <div class="card w-48 shadow-xl py-2" data-popup="sceneOperationsPopup-{scene.id}">
    <ul class="list-nav px-2">
      <li class="mb-2"><a href="/campaigns/{scene.campaign}/scenes/{scene.id}/edit">Edit</a></li>
      <li>
        <a class="bg-error-900" href="/" on:click|preventDefault={deleteScenePromptHandler}>Remove</a></li>
    </ul>
    <div class="arrow bg-surface-100-800-token" />
  </div>

</div>

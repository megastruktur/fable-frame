<script lang="ts">
	import type { ScenesResponse } from "$lib/pocketbase-types"
	import { getSceneImage } from "$models/scenes";
	import { createEventDispatcher } from "svelte";
  import FaEye from 'svelte-icons/fa/FaEye.svelte'
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
  <a
    class="block w-full h-full"
    href="/campaigns/{scene.campaign}/scenes/{scene.id}">
    <div class="p-4 bg-primary-900/70 w-full bottom-0 absolute h-1/4">
      <h3 class="h3 text-center">{scene.name}</h3>
    </div>
  </a>
</div>

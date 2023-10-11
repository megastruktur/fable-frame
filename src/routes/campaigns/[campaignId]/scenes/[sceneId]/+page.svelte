<script lang="ts">
	import { page } from "$app/stores";
	import type { ScenesResponse } from "$lib/pocketbase-types";
	import { getScene, getSceneImage } from "$models/scenes";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

  let scene: ScenesResponse
  let sceneImage: string

  async function loadData() {
    scene = await getScene($page.params.sceneId)
    sceneImage = getSceneImage(scene)
  }
  
</script>

<div>
  {#await loadData()}
    <ProgressBar />
  {:then}
    <div class="w-screen h-screen bg-cover bg-center relative bg-no-repeat"
      
      style="background-image: url('{sceneImage}')">
  
    </div>
  {/await}
</div>

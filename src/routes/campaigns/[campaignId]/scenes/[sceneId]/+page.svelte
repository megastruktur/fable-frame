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
    <div class="w-screen h-screen bg-contain bg-center relative bg-no-repeat"
      style="background-image: url('{sceneImage}')">

      <div class="bg-surface-900/70 py-2">
        <h1 class="h1 text-center">{scene.name}</h1>
      </div>
    </div>
  {/await}
</div>

<script lang="ts">
	import { page } from "$app/stores";
	import SceneEdit from "$lib/components/scenes/SceneEdit.svelte";
	import type { ScenesResponse } from "$lib/pocketbase-types";
	import { getScene } from "$models/scenes";
	import { onMount } from "svelte";

  let sceneId = $page.params.sceneId
  let scene: ScenesResponse

  onMount(async () => {
    scene = await getScene(sceneId)
  })
</script>

{#if scene !== undefined}
  <SceneEdit campaignId={scene.campaign} sceneId={$page.params.sceneId} />
{/if}

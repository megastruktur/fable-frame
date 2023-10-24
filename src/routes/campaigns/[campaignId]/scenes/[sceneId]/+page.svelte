<script lang="ts">
	import { page } from "$app/stores";
	import Scene from "$lib/components/scenes/Scene.svelte";
import type { CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getCampaignWithCharacters } from "$models/campaign";
	import { getScene } from "$models/scenes";
	import { ProgressBar } from "@skeletonlabs/skeleton";


  let scene: ScenesResponse
  let campaign: CampaignsResponse

  async function loadData() {
    scene = await getScene($page.params.sceneId)
    campaign = await getCampaignWithCharacters($page.params.campaignId)
}

</script>

{#await loadData()}
  <ProgressBar />
{:then}
  <Scene {campaign} {scene} />
{/await}

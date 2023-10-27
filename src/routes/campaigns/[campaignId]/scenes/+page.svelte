<script lang="ts">
  import { page } from "$app/stores"
	import type { CampaignsResponse, ScenesResponse } from '$lib/pocketbase-types';
	import { getCampaignScenes } from '$models/scenes';
	import { getCampaign } from '$models/campaign';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import ScenesManager from '$lib/components/scenes/ScenesManager.svelte';

  let scenes: ScenesResponse[] = []
  let campaign: CampaignsResponse

  async function loadData() {
    [scenes, campaign] = await Promise.all([
      getCampaignScenes($page.params.campaignId),
      getCampaign($page.params.campaignId)
    ])
  }

</script>

{#await loadData()}
  <ProgressBar />
{:then}
  <ScenesManager {scenes} {campaign} />
{/await}

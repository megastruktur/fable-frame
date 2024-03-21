<script lang="ts">
	import CampaignEdit from './CampaignEdit.svelte';
	import type { CampaignsResponse } from "$lib/pocketbase-types";


  export let campaign: CampaignsResponse

</script>

<div class="p-3">
  <CampaignEdit {campaign} />
</div>

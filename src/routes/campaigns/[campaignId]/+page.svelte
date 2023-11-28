<script lang="ts">
  import { page } from "$app/stores"
	import CampaignPage from "$lib/components/pages/campaigns/CampaignPage.svelte";
	import { pageName } from "$lib/stores";

	pageName.set("Campaign")

</script>

<CampaignPage campaignId={$page.params.campaignId} />

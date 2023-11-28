<script>
	import CampaignsPage from "$lib/components/pages/campaigns/CampaignsPage.svelte";
	import { pageName } from "$lib/stores";

	pageName.set("Campaigns")

</script>
<CampaignsPage />

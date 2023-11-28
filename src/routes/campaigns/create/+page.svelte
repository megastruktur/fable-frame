<script>
	import CampaignCreatePage from "$lib/components/pages/campaigns/CampaignCreatePage.svelte";
	import { pageName } from "$lib/stores";

	pageName.set("Create Campaign")

</script>
<CampaignCreatePage />

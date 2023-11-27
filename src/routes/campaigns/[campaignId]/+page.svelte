<script lang="ts">
  import { page } from "$app/stores"
	import CampaignPage from "$lib/components/pages/campaigns/CampaignPage.svelte";

</script>

<CampaignPage campaignId={$page.params.campaignId} />

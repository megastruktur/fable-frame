<script lang="ts">
	import { page } from "$app/stores";
	import SceneEdit from "$lib/components/scenes/SceneEdit.svelte"

</script>

<SceneEdit campaignId={$page.params.campaignId} />

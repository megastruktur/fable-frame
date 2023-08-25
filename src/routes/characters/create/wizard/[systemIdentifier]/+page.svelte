<script lang="ts">
  import { page } from "$app/stores"
	import { onMount } from "svelte";

  let CharacterWizard: any

  onMount(async () => {
    CharacterWizard = (await import(`../../../../../data/systems/${$page.params.systemIdentifier}/components/CharacterCreateWizard.svelte`)).default
  })

</script>

{#if CharacterWizard !== undefined}
  <svelte:component this={CharacterWizard} />
{/if}

<!-- All Characters -->
<script lang="ts">
  import { page } from "$app/stores"
	import { currentUser } from "$lib/pocketbase";
	import { goto } from "$app/navigation";
	import CharacterSheet from "$lib/components/characters/CharacterSheet.svelte";
	import { onMount } from "svelte";
	import { getCharacterWithSystemAndCampaign } from "$models/character";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import { pageName } from "$lib/stores";

	pageName.set("Character Sheet")

  onMount(() => {
    if ($currentUser === null) {
      goto("/login")
    }
  })

</script>

{#if $page.params.characterId !== undefined }
  {#await getCharacterWithSystemAndCampaign($page.params.characterId)}
    <ProgressBar />
  {:then character}
    <CharacterSheet
      {character}
      rpgSystem={character.expand.rpgSystem}
      campaign={character.expand.campaign}
      />
  {/await}
{/if}

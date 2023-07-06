<script lang="ts">
  import { page } from "$app/stores"
	import { getCharacter } from "$models/character";
	import { onMount } from "svelte";
  import { characterStore } from "$lib/stores"

  let CharacterSheet: any
  let characterName: string = ""
  onMount(async () => {

    $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem"}))
    characterName = $characterStore.name
    /* @vite-ignore */
    CharacterSheet = (await import(`../../../data/systems/${$characterStore.expand.rpgSystem.identifier}/components/CharacterSheet.svelte`)).default
  })


</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-3">{characterName}</h1>
  <svelte:component this={CharacterSheet} />
</div>

<script lang="ts">
  import { page } from "$app/stores"
	import { getCharacter, updateCharacterWithHash } from "$models/character";
	import { onMount } from "svelte";
  import { characterStore, editMode } from "$lib/stores"

  let CharacterSheet: any
  let characterName: string = ""
  
  onMount(async () => {

    $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem"}))

    characterName = $characterStore.name
    /* @vite-ignore */
    CharacterSheet = (await import(`../../../data/systems/${$characterStore.expand.rpgSystem.identifier}/components/CharacterSheet.svelte`)).default

    editMode.set(false)
  })


  $: $characterStore, saveCharacter()

  async function saveCharacter() {
    if ($characterStore && $characterStore.id) {
      try {
        await updateCharacterWithHash($characterStore.id, $characterStore)
      }
      catch (e) {
        console.error(e)
      }
    }
  }


</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-3">{characterName}</h1>
  <svelte:component this={CharacterSheet} />
</div>

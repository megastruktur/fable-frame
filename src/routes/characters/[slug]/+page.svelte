<!-- All Characters -->
<script lang="ts">
  import { page } from "$app/stores"
	import { currentUser } from "$lib/pocketbase";
	import { goto } from "$app/navigation";
	import CharacterSheet from "$lib/components/characters/CharacterSheet.svelte";
	import { onMount } from "svelte";


  onMount(() => {
    if ($currentUser === null) {
      goto("/login")
    }
  })

</script>

<CharacterSheet characterId={$page.params.slug} />

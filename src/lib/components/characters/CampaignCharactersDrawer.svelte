<script lang="ts">
	import CharacterSheet from "./CharacterSheet.svelte";

  export let characterIds: string[]
</script>

<div class="flex flex-col w-96">
  {#each characterIds as characterId(characterId)}
    <CharacterSheet {characterId} />
  {/each}
</div>

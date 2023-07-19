<script lang="ts">
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { getCharacterAvatar } from "$models/character";

  export let character: CharactersResponse

</script>


<a href="/characters/{character.id}"
class="card w-52 card-hover shadow-xl m-4">
<header>
  {#if character.avatar}
  <img src={getCharacterAvatar(character)} alt={character.name} />
  {/if}
</header>
<div class="p-4 space-y-4">
  <h3 class="h3">{character.name}</h3>
  {#if character.expand && character.expand.rpgSystem}
    <article>{character.expand.rpgSystem.name}</article>
  {/if}
</div>
</a>

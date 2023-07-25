<script lang="ts">
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { getCharacterAvatar } from "$models/character";

  export let character: CharactersResponse

</script>


<a
  href="/characters/{character.id}"
  class="card w-52 h-64 card-hover shadow-xl m-4 relative overflow-hidden"
  style="background-image: url({getCharacterAvatar(character)});background-repeat: no-repeat; background-size: cover;"
>
<div class="p-4 space-y-4 absolute bg-surface-900/90 w-full h-full flex flex-col items-center" >
  <h3 class="h3">{character.name}</h3>
  {#if character.expand && character.expand.rpgSystem}
    <article>{character.expand.rpgSystem.name}</article>
  {/if}
</div>
</a>

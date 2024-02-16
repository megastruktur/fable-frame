<script lang="ts">
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { getCharacterAvatar } from "$models/character";
	import { getRpgSystemImage } from "$models/rpg_system";

  export let character: CharactersResponse
  export let classes: string = ""

  let bgCharacterImage = getBgCharacterImage()

  // Get the Avatar. If Avatar is not set - take Campaign image.
  function getBgCharacterImage(): string {

    let image: string = ""

    image = getCharacterAvatar(character)
    if (image === "") {
      image = getRpgSystemImage(character.expand.rpgSystem)
    }

    return image
  }
  
</script>

<div
  class="card w-72 h-72 bg-cover bg-no-repeat bg-center relative overflow-hidden {classes}"
  style="background-image: url('{bgCharacterImage}');"
  >
  
  <div class="w-full h-full bg-surface-900/70 flex flex-col justify-center">
      <section class="p-4">
        <h2 class="h2 text-center">{character.name}</h2>
        {#if character.expand && character.expand.rpgSystem}
          <p class="text-center italic text-sm">{character.expand.rpgSystem.name}</p>
        {/if}
      </section>
    
      <footer class="card-footer text-center">

        {#if character.expand?.campaign !== undefined}
          <article>
            <a class="btn variant-ghost-warning" href="/campaigns/{character.expand.campaign.id}">{character.expand.campaign.name}</a>
          </article>
        {/if}
      </footer>
  </div>
</div>

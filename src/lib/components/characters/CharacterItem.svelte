<script lang="ts">
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { getCharacterAvatar } from "$models/character";
	import { Avatar } from "@skeletonlabs/skeleton";

  export let character: CharactersResponse
  export let classes: string = ""
  
</script>

<div class="flex flex-row {classes}">
  <Avatar
    initials={character.name.charAt(0)}
    border="border-4 border-surface-300-600-token mr-3"
    src={getCharacterAvatar(character)} />
  <span class="flex flex-col justify-center">
    <h3 class="h3 flex">{character.name}</h3>
    {#if character.expand && character.expand.rpgSystem}
      <article class="flex">{character.expand.rpgSystem.name}</article>
    {/if}
    {#if character.expand?.campaign !== undefined}
      <span>Campaign: <a href="/campaigns/{character.expand.campaign.id}">{character.expand.campaign.name}</a></span>
    {/if}
  </span>
</div>

<script lang="ts">
	import type { RpgSystemsResponse } from "$lib/pocketbase-types";
	import { getRpgSystemImage } from "$models/rpg_system";

  export let rpgSystem: RpgSystemsResponse
  export let selected: boolean = false
  export let classes: string = ""
</script>

<button class="{classes} card w-52 card-hover {selected === true ? "border border-primary-50" : ""}" on:click>
  <header>
    {#if rpgSystem.image}
    <img class="w-full" src={getRpgSystemImage(rpgSystem)} alt={rpgSystem.name} />
    {/if}
  </header>
  <div class="p-4 space-y-4">
    <h3 class="h3">{rpgSystem.name}</h3>
    <article>{rpgSystem.description}</article>
  </div>
</button>

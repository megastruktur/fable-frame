<script lang="ts">
	import { getAllRpgSystems } from "$models/rpg_system";
	import { ProgressRadial } from "@skeletonlabs/skeleton";

	import RpgSystemCard from "$lib/components/RpgSystemCard.svelte";

  const avaiableWizards = ["broken-compass"]
</script>

<div class="pt-3">

	<h1 class="text-3xl m-auto mb-3 text-center">Choose the RPG System</h1>

  {#await getAllRpgSystems({ status: true })}
    <ProgressRadial value={undefined} />
  {:then rpgSystems}
    <div class="flex justify-around flex-wrap mb-3">
      {#each rpgSystems as rpgSystem}
        {#if avaiableWizards.includes(rpgSystem.identifier)}
          <a href="/characters/create/wizard/{rpgSystem.identifier}">
            <RpgSystemCard classes="mb-3" rpgSystem={rpgSystem} />
          </a>
        {/if}
      {/each}
    </div>
  {/await}

</div>

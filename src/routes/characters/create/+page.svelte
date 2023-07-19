<script lang="ts">
	import { goto } from "$app/navigation";
	import RpgSystemCard from "$lib/components/RpgSystemCard.svelte";
import type { RpgSystemsResponse } from "$lib/pocketbase-types";
	import { createNewCharacter } from "$models/character";
	import { getAllRpgSystems } from "$models/rpg_system";
	import { ProgressRadial, Step, Stepper } from "@skeletonlabs/skeleton";

  let characterName: string = ""
  let selectedSystem: RpgSystemsResponse


	async function createAndRedirect() {
		const character = await createNewCharacter(selectedSystem.id, characterName);
		goto('/characters/' + character.id)
	}

</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-3">Create New Character</h1>
	<hr />
  <div>
    <Stepper on:complete={createAndRedirect}>
      <Step stepTerm="Pick a name" locked={!characterName}>
        <svelte:fragment slot="header">Pick a name</svelte:fragment>
        <input class="input" type="text"
        bind:value={characterName} placeholder="Input"
        name="name" />
      </Step>
      <Step stepTerm="Select RPG System" locked={!selectedSystem}>
        <svelte:fragment slot="header">Select the System or start from scratch</svelte:fragment>
        {#await getAllRpgSystems({ status: true })}
          <ProgressRadial value={undefined} />
        {:then rpgSystems} 
          {#each rpgSystems as rpgSystem}
          {@const selected = selectedSystem && selectedSystem.id === rpgSystem.id}
          <RpgSystemCard {selected} rpgSystem={rpgSystem} on:click={() => selectedSystem = rpgSystem} />
          {/each}
        {/await}
      </Step>
      <Step stepTerm="Confirm" locked={!characterName && !selectedSystem}>
        <svelte:fragment slot="header">Verify your selection</svelte:fragment>
        <h4 class="h4"><span class="text-primary-400">{characterName}</span> with <span class="text-primary-400">{selectedSystem.name}</span></h4>
      </Step>
    </Stepper>
  </div>
</div>

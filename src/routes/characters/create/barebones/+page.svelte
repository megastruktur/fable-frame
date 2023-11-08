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

<div class="flex flex-col px-3">
	<h1 class="text-3xl m-auto my-3">Create New Character</h1>
  <div>
    <Stepper on:complete={createAndRedirect}>
      <!-- Select name -->
      <Step stepTerm="Pick a name" locked={!characterName}>
        <svelte:fragment slot="header">Pick a name</svelte:fragment>
        <input
          class="input" type="text"
          bind:value={characterName}
          placeholder="Character Name"
          name="name" />
      </Step>
      <!-- Select System -->
      <Step stepTerm="Select RPG System" locked={!selectedSystem}>
        <svelte:fragment slot="header">Select the System or start from scratch</svelte:fragment>
        {#await getAllRpgSystems({ status: true })}
          <ProgressRadial value={undefined} />
        {:then rpgSystems}
          <div class="flex justify-around flex-wrap">
            {#each rpgSystems as rpgSystem}
            {@const selected = selectedSystem && selectedSystem.id === rpgSystem.id}
            <RpgSystemCard classes="mb-3" {selected} rpgSystem={rpgSystem} on:click={() => selectedSystem = rpgSystem} />
            {/each}
          </div>
        {/await}
      </Step>
      <!-- Confirm -->
      <Step stepTerm="Confirm" locked={!characterName && !selectedSystem}>
        <svelte:fragment slot="header">Verify your selection</svelte:fragment>
        <h4 class="h4"><span class="text-primary-400">{characterName}</span> with <span class="text-primary-400">{selectedSystem.name}</span></h4>
      </Step>
    </Stepper>
  </div>
</div>

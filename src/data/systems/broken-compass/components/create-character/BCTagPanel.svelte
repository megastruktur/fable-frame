<script lang="ts">
	import type { Field } from "$lib/types";
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import { createEventDispatcher, onMount } from "svelte";


  export let tag: Field
  export let expertise: Field[]
  export let skillsAvailable: Field[]


  const dispatch = createEventDispatcher()

  let expertiseSelectedName: string = expertise[0].name

  let fieldSkill = skillsAvailable?.find((skill) => skill.name === tag.data.field)
  let backupFieldSkill = skillsAvailable?.find((skill) => skill.name === tag.data.backup_field)

  function selectExpertise() {
    if (tag !== undefined) {
      dispatch('selectExpertise', {
        tagName: tag.name,
        expertiseName: expertiseSelectedName
      })
    }
  }

  onMount(() => {
    if (expertise !== undefined) {
      selectExpertise()
    }
  })

  

</script>

{#if tag !== undefined && expertise !== undefined && tag.data !== undefined}
<div class="card p-4 w-80 m-3">
  <h2 class="h2 mb-3 text-center">{tag.label}</h2>

  <h3 class="h3 text-center">Fields</h3>
  <dl>
    {#if fieldSkill !== undefined}
    <div>
      <dt class="h5 capitalize">{fieldSkill.label}</dt>
      <dd class="italic text-sm">{fieldSkill.description}</dd>
    </div>
    {/if}
    {#if backupFieldSkill !== undefined}
    <div>
      <dt class="h5 capitalize">{backupFieldSkill.label}</dt>
      <dd class="italic text-sm">{backupFieldSkill.description}</dd>
    </div>
    {/if}
  </dl>

  <h3 class="h3 text-center mt-3">Expertise</h3>

  <div class="flex justify-center">
    <RadioGroup>
      {#each expertise as e(e.name)}
        <RadioItem bind:group={expertiseSelectedName} name="expertise" value={e.name} on:change={selectExpertise}>{e.label}</RadioItem>
      {/each}
    </RadioGroup>
  </div>

  {#if expertiseSelectedName !== undefined}
    {@const expertiseField = expertise.find(e => e.name === expertiseSelectedName)}
    {#if expertiseField !== undefined}
      <article class="italic">{expertise.find(e => e.name === expertiseSelectedName).description}</article>
    {/if}
  {/if}

  {#if skillsAvailable !== undefined}
    <h3 class="h3 text-center mt-3">Skills</h3>
    <dl>
      {#each tag.data.skills as skill}
        {@const skillField = skillsAvailable.find(s => s.name === skill)}
        {#if skillField !== undefined}
        <div class="flex flex-col mb-3">
          <dt class="h5 capitalize">{skillField.label}</dt>
          <dd class="italic text-sm">{skillField.description}</dd>
        </div>
        {/if}
      {/each}
    </dl>
  {/if}

</div>
{/if}

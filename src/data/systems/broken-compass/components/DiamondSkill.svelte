<script lang="ts">
	import type { Field } from "$lib/types";

  import Icon from "svelte-icons-pack/Icon.svelte"
  import DiamondFilled from 'svelte-icons-pack/ri/RiFinanceVipDiamondFill';
  import DiamondLine from 'svelte-icons-pack/ri/RiFinanceVipDiamondLine';
  import { countSkillValue, skillDecrementEvent, skillIncrementEvent } from "../lib/fieldOperations"
	import { createEventDispatcher, onMount } from "svelte"
  

  export let skill: Field
  export let editMode: boolean = false

  export let blockIncrement = false
  export let blockDecrement = false

  const dispatch = createEventDispatcher()

  onMount(() => {
    countSkillValue
    skillDecrementEvent
    skillIncrementEvent
  })

</script>

{#if skill !== undefined}
<div class="flex items-center">
  {#if !blockDecrement && editMode && countSkillValue(skill.value) !== 0}
    <button type="button" on:click={() => skill = skillDecrementEvent(skill, dispatch)} class="btn-icon btn-icon-sm variant-filled mr-1">-</button>
  {/if}
  <div class="flex mr-3 uppercase">{skill.label}</div>
  <div class="flex">
    {#each Array(skill.value.length) as _, i}
      {#if skill.value.charAt(i) === "+"}
        <Icon color="white" src={DiamondFilled} />
      {:else}
        <Icon color="gray" src={DiamondLine} />
      {/if}
    {/each}
  </div>
  {#if !blockIncrement && editMode && countSkillValue(skill.value) < 3}
    <button type="button" on:click={() => skill = skillIncrementEvent(skill, dispatch)} class="btn-icon btn-icon-sm variant-filled ml-1">+</button>
  {/if}
</div>
{/if}

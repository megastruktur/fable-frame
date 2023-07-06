<script lang="ts">
	import type { Field } from "$lib/types";

  import Icon from "svelte-icons-pack/Icon.svelte"
  import DiamondFilled from 'svelte-icons-pack/ri/RiFinanceVipDiamondFill';
  import DiamondLine from 'svelte-icons-pack/ri/RiFinanceVipDiamondLine';
  import { editMode } from "$lib/stores";

  import { createEventDispatcher } from "svelte"

  export let skill: Field
  export let name: string

  const dispatch = createEventDispatcher()

  function skillIncrement() {
    skill.value += 1
    dispatch("fieldUpdate", skill)
  }

  function skillDecrement() {
    skill.value -= 1
    dispatch("fieldUpdate", skill)
  }

</script>

<div class="flex items-center">
  {#if $editMode}
    <button type="button" on:click={skillDecrement} class="btn btn-circle btn-xs mr-3">-</button>
  {/if}
  <div class="flex mr-3">{name}</div>
  <div class="flex">
    {#each Array(skill.value) as _, i}
      <Icon color="white" src={DiamondFilled} />
    {/each}
    {#each Array(3 - parseInt(skill.value)) as _, i}
      <Icon color="gray" src={DiamondLine} />
    {/each}
  </div>
  {#if $editMode}
    <button type="button" on:click={skillIncrement} class="btn btn-circle btn-xs ml-3">+</button>
  {/if}
</div>

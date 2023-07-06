<script lang="ts">
	import type { Field } from "$lib/types";

  import Icon from "svelte-icons-pack/Icon.svelte"
  import DiamondFilled from 'svelte-icons-pack/ri/RiFinanceVipDiamondFill';
  import DiamondLine from 'svelte-icons-pack/ri/RiFinanceVipDiamondLine';
  import { editMode } from "$lib/stores";


  export let skill: Field
  export let name: string

</script>

<div class="flex items-center">
  {#if $editMode}
    <button type="button" class="btn btn-circle btn-xs mr-3">-</button>
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
    <button type="button" class="btn btn-circle btn-xs ml-3">+</button>
  {/if}
</div>

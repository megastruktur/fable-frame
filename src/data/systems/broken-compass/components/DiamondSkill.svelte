<script lang="ts">
	import type { Field } from "$lib/types";

  import Icon from "svelte-icons-pack/Icon.svelte"
  import DiamondFilled from 'svelte-icons-pack/ri/RiFinanceVipDiamondFill';
  import DiamondLine from 'svelte-icons-pack/ri/RiFinanceVipDiamondLine';
  import { editMode } from "$lib/stores";

  import { createEventDispatcher } from "svelte"

  export let skill: Field

  const dispatch = createEventDispatcher()

  function skillIncrement() {

    let value: string = "";
    let incremented = false;
    for (let i = 0; i < skill.value.length; i++) {

      if (skill.value.charAt(i) === "-" && !incremented) {
        value += "+"
        incremented = true
      }
      else {
        value += skill.value.charAt(i)
      }
    }

    skill.value = value

    dispatch("fieldUpdate", skill)
  }

  function skillDecrement() {

    let value: string = "";
    let decremented = false;

    for (let i = (skill.value.length - 1); i >= 0; i--) {

      if (skill.value.charAt(i) === "+" && !decremented) {
        value = "-" + value
        decremented = true
      }
      else {
        value = skill.value.charAt(i) + value
      }
    }

    skill.value = value


    dispatch("fieldUpdate", skill)
  }

</script>

<div class="flex items-center">
  {#if $editMode}
    <button type="button" on:click={skillDecrement} class="btn-icon btn-icon-sm variant-filled mr-1">-</button>
  {/if}
  <div class="flex mr-3">{skill.label}</div>
  <div class="flex">
    {#each Array(skill.value.length) as _, i}
      {#if skill.value.charAt(i) === "+"}
        <Icon color="white" src={DiamondFilled} />
      {:else}
        <Icon color="gray" src={DiamondLine} />
      {/if}
    {/each}
  </div>
  {#if $editMode}
    <button type="button" on:click={skillIncrement} class="btn-icon btn-icon-sm variant-filled ml-1">+</button>
  {/if}
</div>

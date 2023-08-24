<script lang="ts">
	import type { Field } from "$lib/types";

  import Icon from "svelte-icons-pack/Icon.svelte"
  import BsCircleFill from 'svelte-icons-pack/bs/BsCircleFill';
  import BsCircle from 'svelte-icons-pack/bs/BsCircle';

  import { createEventDispatcher } from "svelte"

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false

  const dispatch = createEventDispatcher()

  function fieldIncrement() {

    const dispatchData = {
      operation: "increment",
      field: field
    }

    const dispatched = dispatch("fieldUpdate", dispatchData, { cancelable: true })

    if (dispatched) {

      let value: string = "";
      let incremented = false;
      for (let i = 0; i < field.value.length; i++) {

        if (field.value.charAt(i) === "-" && !incremented) {
          value += "+"
          incremented = true
        }
        else {
          value += field.value.charAt(i)
        }
      }

      field.value = value
    }
  }

  function fieldDecrement() {
    
    const dispatchData = {
      operation: "decrement",
      field: field
    }

    const dispatched = dispatch("fieldUpdate", dispatchData, { cancelable: true })

    if (dispatched) {

      let value: string = "";
      let decremented = false;

      for (let i = (field.value.length - 1); i >= 0; i--) {

        if (field.value.charAt(i) === "+" && !decremented) {
          value = "-" + value
          decremented = true
        }
        else {
          value = field.value.charAt(i) + value
        }
      }

      field.value = value
    }
  }

</script>

<div class="{classes} flex items-center">
  {#if editable && editMode}
    <button type="button" on:click={fieldDecrement} class="btn-icon btn-icon-sm variant-filled mr-1">-</button>
  {/if}
  <p class="flex mr-3 text-xl">{field.label}</p>
  <div class="flex">
    {#each Array(field.value.length) as _, i}
      {#if field.value.charAt(i) === "+"}
        <Icon color="white" src={BsCircleFill} />
      {:else}
        <Icon color="gray" src={BsCircle} />
      {/if}
    {/each}
  </div>
  {#if editable && editMode}
    <button type="button" on:click={fieldIncrement} class="btn-icon btn-icon-sm variant-filled ml-1">+</button>
  {/if}
</div>

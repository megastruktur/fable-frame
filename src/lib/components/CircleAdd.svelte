<script lang="ts">
	import { popup, Stepper, type PopupSettings, Step } from "@skeletonlabs/skeleton";
  import Icon from "svelte-icons-pack/Icon.svelte"
  import BsPlus from "svelte-icons-pack/bs/BsPlus"
	import FieldCreate from "./FieldCreate.svelte";
	import { characterStore } from "$lib/stores";

  export let group: string;
  export let type: string;


  let field = {
    id: "",
    type: type,
    name: "",
    label: "",
    group: group,
    value: "",
    description: ""
  }

  // Select proper type.
  let selected = type
  $: field.type = selected
  
  const openCircle: PopupSettings = {
    event: 'click',
    target: `circlePopup-${group}`,
    placement: 'bottom',
    closeQuery: '.will-close',
  }

  // Get list of all Compendium Items with Group and Type from the System Compendium
  // @todo Get list of all Compendium Items with Group and Type from all Compendiums
  // If type is empty - list ONLY default types like Text, Tag, Counter and Etc.

  function createComplete() {
    characterStore.addField(field)
    console.log(`Added field ${field.name} to character ${$characterStore.name}`)
  }
</script>

<div class="card p-4 variant-filled-neutral-900/90" data-popup="circlePopup-{group}">
  
  <Stepper buttonComplete="will-close" on:complete={createComplete}>
    <Step>
      <svelte:fragment slot="header">Field</svelte:fragment>
      <select bind:value={selected} class="select">
        <option value="text">Text</option>
        <option value="counter">Counter</option>
        <option value="tag">Tag</option>
      </select>
    </Step>
    <Step>
      <svelte:fragment slot="header">Data</svelte:fragment>
      <FieldCreate bind:field={field} /> 
    </Step>
  </Stepper>

	<div class="arrow variant-filled-neutral-900/90" />
</div>

<button class="btn btn-circle" use:popup={openCircle} >
  <Icon size="40" color="" src={BsPlus} />
</button>


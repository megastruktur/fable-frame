<script lang="ts">
	import { popup, Stepper, type PopupSettings, Step } from "@skeletonlabs/skeleton";
  import BsPlus from "svelte-icons-pack/bs/BsPlus"
	import FieldCreate from "./FieldCreate.svelte";
	import { characterStore } from "$lib/stores";

  import BsTextCenter from "svelte-icons-pack/bs/BsTextCenter";
  import BsThreeDots from "svelte-icons-pack/bs/BsThreeDots";
  import BsHash from "svelte-icons-pack/bs/BsHash";
	import CircleAddFieldTypeButton from "./CircleAddFieldTypeButton.svelte";
	import Icon from "svelte-icons-pack";

  export let group: string;
  export let type: string = "";


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
  $: {
    field.type = type
  }

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

  const fieldTypes: {[type: string]: any} = {
    text: {
      name: "Text",
      icon: BsTextCenter,
      description: "A text field"
    },
    tag: {
      name: "Tag",
      icon: BsHash,
      description: "A tag field. The Value will be displayed on character sheet without the label."
    },
    counter: {
      name: "Counter",
      icon: BsThreeDots,
      description: "To use it set the value to +++ where each + represents max count."
    }
  }

</script>

<div class="card p-4 variant-filled-neutral-900/90" data-popup="circlePopup-{group}">
  
  <Stepper buttonComplete="will-close" on:complete={createComplete}>
    <Step>
      <svelte:fragment slot="header">Field</svelte:fragment>

      <div class="flex flex-wrap justify-around">
        {#each Object.entries(fieldTypes) as [fieldType, fieldData]}
          <CircleAddFieldTypeButton bind:selectedType={type} type={fieldType} icon={fieldData.icon} />
        {/each}
      </div>

      <!-- Field description goes here -->
      <div>
        {#if type}
        {fieldTypes[type].description}
        {/if}
      </div>

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


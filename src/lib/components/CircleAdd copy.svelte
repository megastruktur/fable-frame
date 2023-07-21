<script lang="ts">
	import { popup, Stepper, type PopupSettings, Step, ProgressRadial, Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import BsPlus from "svelte-icons-pack/bs/BsPlus"
	import FieldCreate from "./FieldCreate.svelte";
	import { characterStore } from "$lib/stores";

  import BsTextCenter from "svelte-icons-pack/bs/BsTextCenter";
  import BsThreeDots from "svelte-icons-pack/bs/BsThreeDots";
  import BsHash from "svelte-icons-pack/bs/BsHash";
	import CircleAddFieldTypeButton from "./CircleAddFieldTypeButton.svelte";
	import Icon from "svelte-icons-pack";
	import { getCompendiumItems } from "$lib/getCompendiumItems";
	import { autoPlacement } from "@floating-ui/dom";

  export let group: string;
  export let type: string = "";

  // Which compendium to use.
  // Set empty if no compendium.
  export let compendium: string = "";
  export let compendiumGroup: string = "";

  let field = {
    id: "",
    type: type,
    name: "",
    label: "",
    group: group,
    value: "",
    description: ""
  }

  // const openCircle: PopupSettings = {
  //   event: 'click',
  //   target: `circlePopup-${group}`, // adding for particular tab
  //   placement: 'bottom',
  //   closeQuery: '.will-close',
  // }

  // Get list of all Compendium Items with Group and Type from the System Compendium
  // @todo Get list of all Compendium Items with Group and Type from all Compendiums
  // If type is empty - list ONLY default types like Text, Tag, Counter and Etc.

  function createComplete() {

    // characterStore.addField(field)

    console.log(`Added field ${field.name} to character ${$characterStore.name}`)

    // reset selected field
    field = {
      id: "",
      type: type,
      name: "",
      label: "",
      group: group,
      value: "",
      description: ""
    }
  }

  const fieldTypes: {[type: string]: any} = {
    text: {
      name: "text",
      type: "text",
      label: "Text",
      icon: BsTextCenter,
      description: "A text field"
    },
    tag: {
      name: "tag",
      type: "tag",
      label: "Tag",
      icon: BsHash,
      description: "A tag field. The Value will be displayed on character sheet without the label."
    },
    counter: {
      name: "counter",
      type: "counter",
      label: "Counter",
      icon: BsThreeDots,
      description: "To use it set the value to +++ where each + represents max count."
    }
  }

</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="summary"><Icon size="40" color="" src={BsPlus} /></svelte:fragment>
		<svelte:fragment slot="content">


    <div class="card p-4 variant-filled-neutral-900/90">
  
      <Stepper buttonComplete="will-close" on:complete={createComplete}>
        <Step>
          <svelte:fragment slot="header">Field</svelte:fragment>
          
          <!-- Load Compendium fields if needed -->
          {#if compendium !== ""}
            <div class="flex flex-wrap justify-around">
            {#await getCompendiumItems(compendium, compendiumGroup)}
              <ProgressRadial value={undefined} />
            {:then compendiumFields}
              {#each compendiumFields as compendiumField}
                <CircleAddFieldTypeButton bind:selectedField={field} field={compendiumField} />
              {/each}
            {/await}
            </div>
            <hr />
          {/if}
    
          <div class="flex flex-wrap justify-around">
            {#each Object.entries(fieldTypes) as [fieldType, fieldData]}
              <CircleAddFieldTypeButton bind:selectedField={field} field={fieldData} />
            {/each}
          </div>
    
          <!-- Field description goes here -->
          <div>
            {#if field.description!==undefined && field.description !== ""}
            {field.description}
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
    </svelte:fragment>
	</AccordionItem>
</Accordion>


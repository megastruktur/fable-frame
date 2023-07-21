<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent, Modal } from "@skeletonlabs/skeleton";
	import Icon from "svelte-icons-pack";
	import BsPlus from "svelte-icons-pack/bs/BsPlus";
	import CircleAddModal from "$lib/components/CircleAddModal.svelte";

  export let group: string;
  export let type: string = "";

  // Which compendium to use.
  // Set empty if no compendium.
  export let compendium: string = "";
  export let compendiumGroup: string = "";

  const modal: ModalSettings = {
    type: 'component',
    // Pass the component registry key as a string:
    component: {
      // Pass a reference to your custom component
      ref: CircleAddModal,
      // Add the component properties as key/value pairs
      props: {
        group,
        type,
        compendium,
        compendiumGroup
      },
      // Provide a template literal for the default component slot
      slot: '<p>Loading...</p>'
    },
  };

  async function openModal() {
    modalStore.trigger(modal)
  }
</script>

<button class="btn btn-circle" on:click={openModal}>
  <Icon size="40" color="" src={BsPlus} />
</button>


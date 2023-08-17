<script lang="ts">
	import { modalStore, type ModalSettings} from "@skeletonlabs/skeleton";
	import Icon from "svelte-icons-pack";
	import BsPlus from "svelte-icons-pack/bs/BsPlus";
	import CircleAddModal from "./CircleAddModal.svelte";
	import { editMode } from "$lib/stores";

  export let group: string = "general";
  export let type: string = "";

  // Which compendium to use.
  // Set empty if no compendium.
  export let compendium: string = "";
  export let compendiumGroup: string = "";

  async function openModal() {
    
    modalStore.clear();

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
      },
    };

    modalStore.trigger(modal)
  }
</script>

<button class="btn btn-circle hover:bg-surface-800 w-full" on:click={openModal}>
  <Icon size="40" color="" src={BsPlus} />
</button>


<script lang="ts">
	import { getModalStore, type ModalSettings} from "@skeletonlabs/skeleton";
  // @ts-ignore
	import Icon from "svelte-icons-pack";
	import BsPlus from "svelte-icons-pack/bs/BsPlus";
	import CircleAddModal from "./CircleAddModal.svelte";
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { createEventDispatcher } from "svelte";

  export let group: string = "general";
  export let type: string = "";
  export let character: CharactersResponse

  // Which compendium to use.
  // Set empty if no compendium.
  export let compendium: string = "";
  export let compendiumGroup: string = "";

  const modalStore = getModalStore()
  const dispatch = createEventDispatcher()

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
          compendiumGroup,
          character,
        },
      },
      response(r) {
        if (r !== undefined && r.field !== undefined) {
          dispatch("fieldAdd", {
            field: r.field
          })
        }
      },
    };

    modalStore.trigger(modal)
  }
</script>

<button class="btn btn-circle hover:bg-surface-800 w-full" on:click={openModal}>
  <Icon size="40" color="" src={BsPlus} />
</button>


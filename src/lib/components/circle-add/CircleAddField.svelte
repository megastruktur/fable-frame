<script lang="ts">
	import type { Field } from "$lib/types";
	import { loadRpgSystemData } from "$models/rpg_system";
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  // @ts-ignore
	import Icon from "svelte-icons-pack";
	import BsPlus from "svelte-icons-pack/bs/BsPlus";
	import CircleAddCompendiumModal from "./CircleAddFieldModal.svelte";
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { createEventDispatcher } from "svelte";

  export let character: CharactersResponse
  export let fields: Field[]
  export let classes: string = ""

  const modalStore = getModalStore();
  const dispatch = createEventDispatcher()

  async function openCompendiumModal() {

    if (fields !== undefined && fields.length > 0) {

      const modal: ModalSettings = {

        type: 'component',
        component: {
          ref: CircleAddCompendiumModal,
          props: {
            fields: fields
          },
        },

        response: (r: Field) => {
          if (r !== undefined) {
            addField(r)
          }
        },
      };
      modalStore.trigger(modal);
    }
  }

  function addField(field: Field) {
    dispatch("fieldAdd", {
      field: field
    })
  }
</script>

<button
  class="btn btn-circle hover:bg-surface-800 {classes}"
  on:click={() => openCompendiumModal()}
  >
  <Icon size="40" color="" src={BsPlus} />
</button>

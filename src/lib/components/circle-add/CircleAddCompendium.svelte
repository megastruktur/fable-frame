<script lang="ts">
	import type { Field } from "$lib/types";
	import { loadRpgSystemData } from "$models/rpg_system";
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  // @ts-ignore
	import Icon from "svelte-icons-pack";
	import BsPlus from "svelte-icons-pack/bs/BsPlus";
	import CircleAddFieldModal from "./CircleAddFieldModal.svelte";
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { createEventDispatcher } from "svelte";
	import TraitFieldInfo from "$data/systems/kult4e/components/fields/TraitFieldInfo.svelte";

  export let character: CharactersResponse
  export let rpgSystemName: string
  export let compendiumName: string
  export let classes: string = ""
  export let modalComponent: any = CircleAddFieldModal
  export let descriptionComponent: any = TraitFieldInfo
  export let title: string = "Select an option below"

  // Save field to the database
  export let saveField: boolean = false

  const modalStore = getModalStore();
  const dispatch = createEventDispatcher()

  async function openCompendiumModal() {
    const data = await loadRpgSystemData(rpgSystemName, compendiumName)

    if (data !== undefined && data.length > 0) {

      const modal: ModalSettings = {

        type: 'component',
        component: {
          ref: modalComponent,
          props: {
            itemDescriptionComponent: descriptionComponent,
            fields: data.sort((a: Field, b: Field) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)),
            title: title
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
      field: field,
      saveField: saveField,
    })
  }
</script>

<button
  class="btn btn-circle hover:bg-surface-800 {classes}"
  on:click={() => openCompendiumModal()}
  >
  <Icon size="40" color="" src={BsPlus} />
</button>

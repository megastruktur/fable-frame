<script lang="ts">
	import { Avatar, getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import CharacterAvatarUploadModal from "./CharacterAvatarUploadModal.svelte";

  // @ts-ignore
  import Icon from "svelte-icons-pack"
  import BsPencil from "svelte-icons-pack/bs/BsPencil";
	import { createEventDispatcher } from "svelte";

  export let avatarUrl: string = ""
  export let characterId: string = ""
  export let characterName: string
  export let editMode: boolean = false

  const modalStore = getModalStore()
  const dispatch = createEventDispatcher()

  async function openModal() {
    
    modalStore.clear();

    const modal: ModalSettings = {
      type: 'component',
      // Pass the component registry key as a string:
      component: {
        // Pass a reference to your custom component
        ref: CharacterAvatarUploadModal,
        // Add the component properties as key/value pairs
        props: {
          characterId: characterId
        },
      },
      response: (r) => {
        if (r !== undefined && r.avatar !== undefined) {
          dispatch("avatarSet", {avatar: r.avatar})
        }
      },
    };

    modalStore.trigger(modal)
  }

</script>

<div class="relative">
  <Avatar src={avatarUrl} width="w-32" rounded="rounded-3xl" initials={characterName.charAt(0)} />

  {#if editMode}
  <button class="btn-icon btn-icon-sm variant-filled-secondary absolute bottom-0 right-0" type="button" on:click={openModal}>
    <Icon src={BsPencil} />
  </button>
  {/if}
</div>

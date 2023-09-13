<script lang="ts">
	import { characterStore } from "$lib/stores";
	import { characterUpdateAvatar } from "$models/character";
	import { FileDropzone, ProgressBar, type ToastSettings, getToastStore, getModalStore } from "@skeletonlabs/skeleton";

  import Icon from "svelte-icons-pack";
  import BsUpload from "svelte-icons-pack/bs/BsUpload";


  export let characterId = ""
  export let parent: any;

  const toastStore = getToastStore()
  const modalStore = getModalStore()

  let files: FileList;
  let loading: boolean = false;

  /**
   * Change the avatar of the character
   * @param e
   */
  async function onChangeHandler(e: Event): Promise<void> {

    loading = true
    const formData = new FormData()

    if (files[0] !== undefined) {
      formData.append("avatar", files[0])

      try {
        let character = await characterUpdateAvatar(characterId, formData)
        loading = false
        characterStore.setAvatar(character.avatar)
        modalStore.close()
        
      } catch (error) {
        console.log(error)
        const t: ToastSettings = {
          message: `An error occured. Please try again`,
          background: "variant-filled-error",
          timeout: 5000
        };
        toastStore.trigger(t);
      }
    }
  }
</script>

<div class="w-modal-slim">
  {#if loading}
    <ProgressBar />
  {:else}
    <FileDropzone name="avatar" bind:files={files} on:change={onChangeHandler}>
      <svelte:fragment slot="lead">
        <Icon size="40" src={BsUpload} className="inline-block" />
      </svelte:fragment>
      <svelte:fragment slot="message">Upload a file</svelte:fragment>
      <svelte:fragment slot="meta">PNG, JPG and GIF allowed</svelte:fragment>
    </FileDropzone>
  {/if}
  <slot />
</div>

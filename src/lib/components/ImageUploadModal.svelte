<script lang="ts">
	import { FileDropzone, ProgressBar, getModalStore } from "@skeletonlabs/skeleton"

  const modalStore = getModalStore()

  let files: FileList;
  let loading: boolean = false;

  /**
   * Change the avatar of the character
   * @param e
   */
  async function onChangeHandler(e: Event): Promise<void> {
    if (files[0] !== undefined) {
        if ($modalStore[0].response) {
          $modalStore[0].response(files[0])
        }
        modalStore.close()
    }
  }
</script>

{#if $modalStore[0]}
<div class="w-modal-slim">
  {#if loading}
    <ProgressBar />
  {:else}
    <FileDropzone name="image" bind:files={files} on:change={onChangeHandler}>
      <svelte:fragment slot="lead">
        <span class="i-[material-symbols--upload] text-6xl"></span>
      </svelte:fragment>
      <svelte:fragment slot="message">Upload a file</svelte:fragment>
      <svelte:fragment slot="meta">PNG, JPG and GIF allowed</svelte:fragment>
    </FileDropzone>
  {/if}
  <slot />
</div>
{/if}

<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { sceneCreate } from "$models/scenes";
  import { FileDropzone } from "@skeletonlabs/skeleton";

  let sceneName: string = ""
  let files: FileList;
  let previewImageSrc: string = "";

  function fileSelectedHandler(e: any) {
    // If no file was selected, empty the preview <img>
    if(!e.target.files.length) return previewImageSrc = "";
    // Set the <img>'s src to a reference URL to the selected file
    return previewImageSrc = URL.createObjectURL(e.target.files.item(0))
  }

  async function createScene() {
    const formData = new FormData()

    if (sceneName !== "") {
      formData.set("name", sceneName)
      formData.set("campaign", $page.params.campaignId)
      formData.set("status", "0")
      formData.set("weight", "0")

      if (files[0] !== undefined) {
        formData.set("image", files[0])
      }
    }
    
    try {
      const scene = await sceneCreate(formData)
      goto(`/campaigns/${$page.params.campaignId}/scenes`)
    }
    catch(error) {
      console.log({error})
    }
  }

</script>


<form class="flex flex-col items-center mx-auto space-y-3 w-96">
  <input
    class="input"
    type="text" bind:value={sceneName} placeholder="Scene name"/>
  {#if previewImageSrc !== ""}
    <img src={previewImageSrc} alt="{sceneName}" />
  {/if}
  <FileDropzone name="files" bind:files={files} on:change={fileSelectedHandler}>
    <svelte:fragment slot="message">Upload scene image</svelte:fragment>
  </FileDropzone>
  <button class="btn variant-filled-secondary" on:click={createScene}>Create</button>
</form>

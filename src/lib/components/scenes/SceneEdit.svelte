<script lang="ts">
	import { goto } from "$app/navigation";
	import type { ScenesResponse } from "$lib/pocketbase-types";
	import { getScene, getSceneImage, createScene, updateScene } from "$models/scenes";
  import { FileDropzone, ProgressBar, getModalStore } from "@skeletonlabs/skeleton";
  export let campaignId: string

  export let sceneId: string = "new"
  
  const modalStore = getModalStore()

  let scene: ScenesResponse
  let files: FileList
  let previewImageSrc: string
  let sceneEditImageSrc: string

  function fileSelectedHandler(e: any) {
    // If no file was selected, empty the preview <img>
    if(!e.target.files.length) return previewImageSrc = "";
    // Set the <img>'s src to a reference URL to the selected file
    return previewImageSrc = URL.createObjectURL(e.target.files.item(0))
  }

  async function createSceneHandler() {
    const formData = new FormData()

    if (scene.name !== "") {
      formData.set("name", `${scene.name}`)
      formData.set("campaign", campaignId)
      formData.set("status", "0")
      formData.set("weight", "0")

      if (files !== undefined && files[0] !== undefined) {
        formData.set("image", files[0])
      }
      try {
        scene = await createScene(formData)
        // @ts-ignore
        $modalStore[0].response({scene: scene, action: "create"})
        modalStore.close()
      }
      catch(error) {
        console.log({error})
      }
    }
    
  }

  async function updateSceneHandler() {

    if (scene !== undefined && scene.id !== undefined && scene.id !== "new") {
      const formData = new FormData()
      if (scene.name !== "") {
        formData.set("name", `${scene.name}`)
  
        if (files !== undefined && files[0] !== undefined) {
          formData.set("image", files[0])
        }
      }
      try {
        scene = await updateScene(scene.id, formData)
        // @ts-ignore
        $modalStore[0].response({scene: scene, action: "update"})
        modalStore.close()
      }
      catch(error) {
        console.log({error})
      }
    }
  }

  async function loadData() {

    if (sceneId !== "new") {
      scene = await getScene(sceneId)

      if (scene !== undefined && scene) {
        sceneEditImageSrc = getSceneImage(scene)
      }
    }
    else {
      // @ts-ignore
      scene = {
        id: sceneId,
        name: "",
        image: "",
        status: 0,
        weight: 0,
        campaign: campaignId,
        group: "",
        secret_hash: "",
      }
    }
  }
</script>

{#await loadData()}
  <ProgressBar />
{:then}
  <form class="flex flex-col items-center mx-auto space-y-3 w-96">
    <input
      class="input"
      type="text" bind:value={scene.name} placeholder="Scene name" required/>

    {#if sceneEditImageSrc !== "" || previewImageSrc !== ""}
      <img src={previewImageSrc !== undefined ? previewImageSrc : sceneEditImageSrc} alt="{scene.name}" />
    {/if}

    <FileDropzone name="files" bind:files={files} on:change={fileSelectedHandler}>
      <svelte:fragment slot="message">Upload scene image</svelte:fragment>
    </FileDropzone>
    {#if scene !== undefined && scene.id !== "new"}
      <button
        class="btn variant-filled-secondary"
        on:click={updateSceneHandler}>Save</button>
    {:else}
    <button
      class="btn variant-filled-secondary"
      on:click={createSceneHandler}>Create</button>
    {/if}
  </form>
{/await}

<script lang="ts">
	import { CampaignNotesTypeOptions } from "$lib/pocketbase-types.d";
	import { createCampaignNote } from "$models/campaign_notes";
	import { SlideToggle, FileButton } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";
	import CircleIconButton from "../global/CircleIconButton.svelte";

  export let campaignId: string

  let noteText: string = ""
  let isGmNote: boolean = true
  let files: FileList
  let fileInput: null | HTMLInputElement
  let previewImageSrc: string

  const dispatch = createEventDispatcher()

  function fileSelectedHandler(e: any) {
    // If no file was selected, empty the preview <img>
    if(!e.target.files.length) return previewImageSrc = "";
    // Set the <img>'s src to a reference URL to the selected file
    return previewImageSrc = URL.createObjectURL(e.target.files.item(0))
  }

  function clearNoteImage() {
    previewImageSrc = ""
    if (fileInput) {
      fileInput.value = ""
    }
  }

  async function createNote() {

    if (noteText !== "") {

      const formData = new FormData()
  
      formData.set("campaign", `${campaignId}`)
      formData.set("active", `${true}`)
      formData.set("active", `${true}`)
      formData.set("type", `${CampaignNotesTypeOptions.gm}`)
      formData.set("note", `${noteText}`)
  
      if (files !== undefined
        && files[0] !== undefined
        && previewImageSrc !== "") {
        formData.set("image", files[0])
      }
  
      const campaignNoteCreated = await createCampaignNote(formData)
  
      dispatch('campaignNoteAdded', {
        note: campaignNoteCreated
      });
  
      noteText = ""
      isGmNote = false
      clearNoteImage()
    }
  }
</script>

<div class="flex flex-col items-center py-3">
  {#if previewImageSrc !== undefined && previewImageSrc !== ""}
    <div class="relative">
      <button
        class="text-error-900"
        on:click={clearNoteImage}>✕</button>
      <img src={previewImageSrc} alt="" />
    </div>
   
  {/if}
  <textarea class="textarea mb-3" bind:value={noteText}></textarea>
  <div class="flex items-center space-x-3">
    <FileButton
      width="btn btn-sm"
      name="files"
      bind:files={files}
      on:change={fileSelectedHandler} />


    <CircleIconButton
      on:click={createNote}
      color="variant-ghost-success"
      icon="i-[material-symbols--save]"
    />
  </div>
</div>

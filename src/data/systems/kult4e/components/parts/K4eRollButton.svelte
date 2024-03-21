<script lang="ts">
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import K4eRollModal from "./K4eRollModal.svelte";

  const modalStore = getModalStore()

  function openRollModal() {

    const modal: ModalSettings = {
      type: "component",
      component: {
        ref: K4eRollModal
      }
    }

    modalStore.trigger(modal)
  }

</script>

<button
  on:click={openRollModal}
  class="btn btn-icon variant-ghost-warning hover:bg-surface-800">
  <span class="i-[fa6-solid--dice] text-3xl"></span>
</button>

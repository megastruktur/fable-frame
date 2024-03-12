<script lang="ts">

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

  export let src: string
  export let alt: string = ""

  const zoomModal: ModalSettings = {
    type: "alert",
    image: src,
    buttonTextCancel: "Close",
  }
  const modalStore = getModalStore();

  function zoomImageModal() {
    modalStore.trigger(zoomModal)
  }


</script>


<button
  on:click={zoomImageModal}>
  <img src={src} alt={alt} />
</button>

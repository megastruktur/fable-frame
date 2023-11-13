<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";


  export let description: string = ""

  const modalStore = getModalStore()

</script>
<div class="card w-96 p-5">
  <div class="mb-3">
    {description}
  </div>

  <button
    class="btn variant-filled-secondary"
    on:click={() => modalStore.close()}>Close</button>
</div>

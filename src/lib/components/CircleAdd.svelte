<script lang="ts">
  import Icon from "svelte-icons-pack/Icon.svelte"
  import BsPlus from "svelte-icons-pack/bs/BsPlus"

  export let group: string;
  export let type: string;

  // <span class="loading loading-spinner"></span>

  function openCircle() {
    console.log("Open Circle Menu")
  }
</script>

<dialog id="circleModal-${group}-${type}" class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>

<button class="btn btn-circle" on:click={openCircle} >
  <Icon size="40" color="" src={BsPlus} />
</button>

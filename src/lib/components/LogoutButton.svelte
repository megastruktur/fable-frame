<script lang="ts">
	import { goto } from "$app/navigation";
  import { pb } from "$lib/pocketbase"
  import Icon from "svelte-icons-pack/Icon.svelte"
  import IconDoorOpen from 'svelte-icons-pack/fa/FaSolidDoorOpen';

  async function logout() {
    pb.authStore.clear()
    goto("/")
  }
</script>


<a href="/" class="btn variant-filled" on:click|preventDefault={logout}>Logout</a>

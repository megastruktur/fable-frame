<script>
	import { goto } from "$app/navigation";
  import { pb } from "$lib/pocketbase"
  import Icon from "svelte-icons-pack/Icon.svelte"
  import IconDoorOpen from 'svelte-icons-pack/fa/FaSolidDoorOpen';

  async function logout() {
    pb.authStore.clear()
    goto("/")
  }
</script>


<button class="btn btn-ghost btn-circle" on:click={logout}>
  <Icon size=25 color="white" src={IconDoorOpen}/>
</button>

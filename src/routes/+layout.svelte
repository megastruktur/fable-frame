<script>
  import Navbar from '$lib/Navbar.svelte';

  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"
  import HomeIconPath from 'svelte-icons-pack/fa/FaSolidHome';
  import NewspaperIconPath from 'svelte-icons-pack/fa/FaNewspaper';
  import NewspaperIconCharacters from 'svelte-icons-pack/fa/FaUser';
  import "../app.css";
</script>

<div class="flex w-screen h-screen bg-slate-800 text-white shadow-lg">
  <div class="flex-col">

    <Navbar />
    
    <slot />
  </div>
</div>

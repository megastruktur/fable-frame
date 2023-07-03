<script>
  import Navbar from '$lib/Navbar.svelte';
  import "../app.css";
</script>

<div class="flex w-screen h-screen bg-slate-800 text-white shadow-lg">
  <div class="flex-col">

    <Navbar />
    
    <slot />
  </div>
</div>

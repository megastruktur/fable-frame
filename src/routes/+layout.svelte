<script lang="ts">
  import Navbar from '$lib/Navbar.svelte';
  import "../app.css";

  let theme: string = "luxury"
</script>

<div data-theme="{theme}" class="w-screen h-screen bg-base-200 text-base-content shadow-lg">
  <div class="">

    <Navbar />
    
    <slot />
  </div>
</div>

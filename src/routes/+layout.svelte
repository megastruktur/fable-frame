<script lang="ts">
  import Navbar from '$lib/Navbar.svelte';
  import "../app.css";
  import { theme } from "$lib/stores"
</script>

<div data-theme="{$theme}" class="w-screen h-screen bg-base-200 text-base-content shadow-lg">
  <div class="">

    <Navbar />
    
    <slot />
  </div>
</div>

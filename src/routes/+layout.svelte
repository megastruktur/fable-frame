<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import "../app.css";
  import { theme } from "$lib/stores"
  import { onMount } from "svelte";
  import {Toaster} from "svelte-french-toast";

</script>

<div data-theme="{$theme}" class="bg-base-200 text-base-content shadow-lg">
  <Toaster />
  <div class="">

    <Navbar />
    
    <slot />
  </div>
</div>

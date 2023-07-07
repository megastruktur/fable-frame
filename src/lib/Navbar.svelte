<script lang="ts">
  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"
  import "../app.css";
  import { currentUser } from "./pocketbase";
  import LogoutButton from "./LogoutButton.svelte";
  import { theme } from "./stores";

  function themeSelect(event: any) {
    // Get data-theme attribute from clicked event
    const themeName = event.target.getAttribute("data-theme");
    // Set the theme
    theme.set(themeName);
  }

</script>
  <div class="navbar bg-base-100 w-screen">
    <div class="navbar-start">
      <div class="dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52 drop-shadow shadow-xl">
          <li><a href="/">Homepage</a></li>
          <li><a href="/news">News</a></li>
          {#if $currentUser}
            <li><a href="/characters">Characters</a></li>
            <li><a href="/campaigns">Campaigns</a></li>
          {/if}
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a href="/" class="btn btn-ghost normal-case text-xl">Fable Frame</a>
    </div>
    <div class="navbar-end">
      
      <details class="flex dropdown">
        <summary class="m-1 btn">theme</summary>
        <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li><a href="/" data-theme="luxury" on:click|preventDefault={themeSelect}>Luxury</a></li>
          <li><a href="/" data-theme="cupcake" on:click|preventDefault={themeSelect}>Cupcake</a></li>
          <li><a href="/" data-theme="night" on:click|preventDefault={themeSelect}>Night</a></li>
          <li><a href="/" data-theme="dark" on:click|preventDefault={themeSelect}>Dark</a></li>
          <li><a href="/" data-theme="light" on:click|preventDefault={themeSelect}>Light</a></li>
          <li><a href="/" data-theme="synthwave" on:click|preventDefault={themeSelect}>Synthwave</a></li>
        </ul>
      </details>

      {#if $currentUser}
        <p>Hello {$currentUser.username}</p>
        <LogoutButton />
      {:else}
      <a href="/login" class="btn btn-ghost btn-circle">
        Login
      </a>
      {/if}
    </div>
  </div>

<script>
  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"
  import IconCharacters from 'svelte-icons-pack/fa/FaUser';
  import "../app.css";
  import { currentUser } from "./pocketbase";
  import LogoutButton from "./LogoutButton.svelte";
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
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/">Homepage</a></li>
          <li><a href="/news">News</a></li>
          {#if currentUser}
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
      <button class="btn btn-ghost btn-circle">
        <Icon size=25 color="white" src={IconCharacters}/>
      </button>
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

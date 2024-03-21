<script lang="ts">
  import { currentUser, pb } from "$lib/pocketbase"
  import { goto } from "$app/navigation";
  // @ts-ignore
  import Icon from "svelte-icons-pack";
  import BsGoogle from "svelte-icons-pack/bs/BsGoogle";
	import { pageName } from "$lib/stores";

  let isError = false
  let errorText = ""
  let username: string
  let password: string

  pageName.set("Login")

  async function login() {
    errorText = ""
    try {
      const loggedIn = await pb.collection("users").authWithPassword(username, password)
      goto("/characters")
    }
    catch (e: any) {
      console.log({error: e})
      isError = true
      errorText = "Please check your username and password"
    }
    if (!isError) {
      goto("/")
    }
  }

  async function signUp() {
    const data = {
      username,
      password,
      passwordConfirm: password
    }

    try {
      const createdUser = await pb.collection("users").create(data)

      if (createdUser) {
        console.log("User created")
        await login()
      }
    } catch (e) {
      console.log(e)
    }
  }

  
  async function logout() {
    pb.authStore.clear()
    goto("/")
  }

  async function googleLogin() {

    // "logout" the last authenticated model
    pb.authStore.clear();

    const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
  }
</script>

<svelte:head>
    <title>Fable Frame - Login</title>
    <meta name="description" content="Log In or Register">
</svelte:head>

<div class="flex flex-col items-center m-3">

  {#if $currentUser}
    <h1 class="h1 mx-auto text-center my-3 flex">Signed in as {$currentUser.email}</h1>

    <button
      on:click={logout}
      class="btn variant-filled-primary">
      <span class="h2">Logout</span>
      <i class="i-[material-symbols--logout] text-3xl"></i>
    </button>

  {:else}
  
    <h1 class="h1 m-auto my-3 flex">Login</h1>

    <button class="btn variant-filled mt-3" on:click={googleLogin}><Icon src={BsGoogle} />oogle</button>
    <div class="text-center text-2xl my-6">OR</div>
    <form>
        {#if errorText !== ""}
            <p class="text-error-500">{errorText}</p>
        {/if}
        <input class="input mt-2" type="text" placeholder="Username" bind:value={username} />
        <input class="input mt-2" type="password" placeholder="Password" bind:value={password} />
        <button class="btn mt-2 variant-filled-secondary" on:click={login}>Login</button>
    </form>
  {/if}
</div>

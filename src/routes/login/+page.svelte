<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase"
    import { goto } from "$app/navigation";
    import Icon from "svelte-icons-pack";
    import BsGoogle from "svelte-icons-pack/bs/BsGoogle";

    let isLogin = true
    let isError = false
    let errorText = ""
    let username: string
    let password: string

    async function login() {
        try {
            const loggedIn = await pb.collection("users").authWithPassword(username, password)
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

<div class="flex flex-col items-center my-3">

    {#if $currentUser}
        <h1 class="h1 m-auto my-3 flex">Signed in as {$currentUser.email}</h1>
    {:else}
    
    
    <h1 class="h1 m-auto my-3 flex">Login</h1>

    <hr class="w-full" />

    <button class="btn variant-filled mt-3" on:click={googleLogin}><Icon src={BsGoogle} />oogle</button>
    {/if}
</div>

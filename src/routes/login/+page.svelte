<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase"
    import { goto } from "$app/navigation";

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
</script>


<div class="flex flex-col justify-center items-center">

    {#if $currentUser}
        <p>Signed in as {$currentUser.username}</p>
    {:else}
        <div class="tabs">
            <a on:click|preventDefault={() => isLogin = true} href="/" class="tab tab-lg {isLogin  === true ? 'tab-active' : ''}">Login</a> 
            <a on:click|preventDefault={() => isLogin = false} href="/" class="tab tab-lg {isLogin  !== true ? 'tab-active' : ''}">Register</a>
        </div>
        
        <div class="m-auto mt-3">

            <form on:submit|preventDefault class="flex-col">

                <div>
                    <input
                        class="input input-lg {isError ? " input-bordered input-error " : ""}"
                        type="text"
                        name="username"
                        placeholder="username"
                        bind:value={username} />
                    <input
                        class="input input-lg {isError ? " input-bordered input-error " : ""}"
                        type="password"
                        name="password"
                        placeholder="password"
                        bind:value={password} />
                </div>

        
                {#if isError}
                <div class="alert alert-error mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{errorText}</span>
                </div>
                {/if}

                <div class="mt-3">
                    {#if isLogin === true}
                        <button class="btn" on:click={login}>Login</button>
                    {:else}
                        <button class="btn" on:click={signUp}>Sign Up</button>
                    {/if}
                </div>
            </form>
        </div>
    {/if}
</div>

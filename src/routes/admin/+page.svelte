<script lang="ts">

    import { updateRpgSystem } from "$models/rpg_system"

    export let data

    async function updateRpgSystemStatus(systemId: string, status: boolean): Promise<void> {
        updateRpgSystem(systemId, {status: status})
    }

</script>

<section class="flex flex-col m-auto items-center">

    <div class="tabs">
        <a href="/" class="tab tab-active" on:click|preventDefault>RPG Systems</a>
    </div>

    <div class="flex">
        {#each data.systemsDb as rpgSystem}
            <input
                type="checkbox" class="toggle"
                bind:checked={rpgSystem.status}
                on:change={() => updateRpgSystemStatus(rpgSystem.id, rpgSystem.status)} />
            <div class="ml-3">{rpgSystem.name}</div>
        {/each}
    </div>
    
</section>

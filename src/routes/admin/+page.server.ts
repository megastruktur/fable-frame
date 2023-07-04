// import getAvailableSystems from "$lib/getAvailableSystems"
import syncSystems from "$lib/syncSystems"
import { getAllRpgSystems } from "$models/rpg_system.ts"

export async function load() {
    await syncSystems()
    const syncedSystems = await getAllRpgSystems()
    return {
        systemsDb: JSON.parse(JSON.stringify(syncedSystems))
    }
}

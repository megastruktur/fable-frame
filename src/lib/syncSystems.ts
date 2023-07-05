import getAvailableSystems from '$lib/getAvailableSystems';
import { getAllRpgSystems, deleteRpgSystem, updateRpgSystem, createRpgSystem } from '$models/rpg_system';
import getSystemSchemaHash from '$lib/getSystemSchemaHash';

export default async function syncSystems() {

  const [availableSystems, dbSystems] = await Promise.all([getAvailableSystems(), getAllRpgSystems()]);


  // @todo check if anything exists at all in systems

  // Cleanup the DB systems
  const dbSyncPromise = dbSystems.map( async (dbSystem: any) => {
    // Check Systems to remove
    const foundSystem = availableSystems.find( systemAvailable => dbSystem.identifier === systemAvailable.id)

    if (!foundSystem) {
      console.log(`System ${dbSystem.identifier} is not in the list of available systems. Removing.`);
      try {
        deleteRpgSystem(dbSystem.id);
      } catch (e) {
        console.error(`Error removing system ${dbSystem.identifier}: ${e}`);
      }
    }
    else {
      // Compare hash
      const foundSystemHash = await getSystemSchemaHash(foundSystem.id)
      if (dbSystem.hash !== foundSystemHash) {
        console.log(`System ${dbSystem.identifier} has a different hash. Update Schema and run Migrations.`);
        updateRpgSystem(dbSystem.id, {
          data: foundSystem,
          hash: foundSystemHash,
        });
      }
    }
  })

  // Create New systems.
  const createdSystemsPromise = availableSystems.map( async (system: any) => {
    if (!dbSystems.find( (dbSystem: any) => dbSystem.identifier === system.id)) {
      const foundSystemHash = await getSystemSchemaHash(system.id)

      console.log(`System ${system.id} is not in the DB. Creating.`);
      const data = {
        identifier: system.id,
        name: system.name,
        description: system.description,
        status: false,
        hash: foundSystemHash,
        data: system
      }
      console.log(data)
      return await createRpgSystem(data);
    }
  })


  await Promise.all([...dbSyncPromise, ...createdSystemsPromise]);
}

import { promises as fs } from 'fs'
import path from "path"
import { env } from "$env/dynamic/private"

export default async function getAvailableSystems(): Promise<any[]> {

  if (env.DATA_DIR !== undefined) {

    const dataDir = env.DATA_DIR

    const systemsDirsPath = path.join(dataDir, 'systems')
    const directories = await fs.readdir(systemsDirsPath)
  
    const systems: Promise<any[]> = Promise.all(directories.map(async (systemId) => {
      const systemJsonPath = path.join(dataDir, 'systems', systemId, 'system.json')
      const systemJson = await fs.readFile(systemJsonPath, 'utf8')
      return JSON.parse(systemJson)
    }))
  
    return systems
  }
  return []
}

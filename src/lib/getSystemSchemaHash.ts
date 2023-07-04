import path from "path"
import { promises as fs } from "fs"
import crypto from "crypto"
import { env } from "$env/dynamic/private"

export default async function getSystemSchemaHash(systemId: string) {

  const systemJsonPath = path.join(env.DATA_DIR, 'systems', systemId, 'system.json')
  const fileBuffer = await fs.readFile(systemJsonPath, 'utf8')

  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);

  return hashSum.digest('hex');
}

import fs from 'fs-extra'
import { getManifest } from '../src/manifest'
import { logger, r } from './utils'

export async function writeManifest() {
  await fs.ensureFile(r('extension/prod/manifest.json'))
  await fs.writeJSON(r('extension/prod/manifest.json'), await getManifest(), {
    spaces: 2
  })
  logger('PRE', 'write manifest.json')
}

writeManifest()

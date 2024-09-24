import { execSync } from 'child_process'
;(function writeManifest() {
  execSync('npx esno ./scripts/manifest-prod.ts', { stdio: 'inherit' })
})()

import { readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

import { expect } from 'vitest'

interface SnapshotStateUpdateMode {
  _updateSnapshot?: string
  updateSnapshot?: string
}

// Tracks cleaned fixture directories during the current test run
const cleanedImageDirs = new Set<string>()

// Returns whether Vitest is currently updating snapshots (`-u` or `u`)
// Uses internal snapshot state for compatibility across Vitest versions
function isUpdatingSnapshots() {
  const snapshotState = expect.getState().snapshotState

  if (!snapshotState) return false

  const state = snapshotState as unknown as SnapshotStateUpdateMode

  return state.updateSnapshot === 'all' || state._updateSnapshot === 'all'
}

async function removeImageSnapshots(dir: string) {
  const files = await readdir(dir, { withFileTypes: true })

  await Promise.all(
    files
      .filter(file => file.isFile() && file.name.startsWith('image.'))
      .map(file => rm(join(dir, file.name)))
  )
}

export async function cleanImageSnapshotsOnce(dir: string) {
  if (!isUpdatingSnapshots()) return
  if (cleanedImageDirs.has(dir)) return

  cleanedImageDirs.add(dir)

  await removeImageSnapshots(dir)
}

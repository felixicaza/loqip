import type { GetLoqipColor, GetLoqipCSS, GetLoqipMetadata, GetLoqipReturn } from '../src/index.ts'

import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { getLoqip, serializeSVG } from '../src/index.ts'

import { cleanImageSnapshotsOnce } from './helpers/snapshots.ts'
import { cases } from './data/loqip.ts'

const EXPECTED_DIR = fileURLToPath(new URL('./expected/', import.meta.url))

function formatResult(result: GetLoqipCSS | GetLoqipColor | GetLoqipMetadata) {
  return JSON.stringify(result, null, 2)
}

async function expectFixture(name: string, result: GetLoqipReturn) {
  const fixtureDir = join(EXPECTED_DIR, name)

  await mkdir(fixtureDir, { recursive: true })

  const image = Buffer.from(result.base64.slice(result.base64.indexOf(',') + 1), 'base64')

  await cleanImageSnapshotsOnce(fixtureDir)

  await expect(image).toMatchFileSnapshot(join(fixtureDir, `image.${result.metadata.format}`))
  await expect(serializeSVG(result.svg)).toMatchFileSnapshot(join(fixtureDir, 'placeholder.svg'))
  await expect(formatResult(result.css)).toMatchFileSnapshot(join(fixtureDir, 'css.json'))
  await expect(formatResult(result.color)).toMatchFileSnapshot(join(fixtureDir, 'color.json'))
  await expect(formatResult(result.metadata)).toMatchFileSnapshot(join(fixtureDir, 'metadata.json'))
}

describe('loqip fixtures tests', () => {
  it.each(cases)('$name', async({ name, image, options }) => {
    const result = await getLoqip(image, options)

    await expectFixture(name, result)
  })
})

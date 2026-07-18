import { Console } from 'node:console'
import { cpus, freemem, totalmem, platform, release, arch } from 'node:os'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { PassThrough } from 'node:stream'

import { Bench } from 'tinybench'

import { getPlaiceholder } from 'plaiceholder'
import { getLoqip } from '../packages/loqip/src/index.ts'

const fixtures = new URL('../packages/loqip/tests/fixtures/', import.meta.url)
const images = (await readdir(fixtures))
  .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
  .sort()

const ANSI_REGEX = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g')

function getSystemInfo() {
  const usedMemory = totalmem() - freemem()

  return [
    `OS: ${platform()} ${release()} ${arch()}`,
    `Kernel: ${release()}`,
    `CPU: ${cpus()[0]?.model ?? 'Unknown'}`,
    `Memory: ${Math.round(usedMemory / 1024 / 1024)}MiB / ${Math.round(totalmem() / 1024 / 1024)}MiB`,
    ''
  ].join('\n')
}

let results = `${await getSystemInfo()}\n`

await images.reduce(
  async(previous, imageName) => {
    await previous

    const buffer = await readFile(new URL(imageName, fixtures))

    const bench = new Bench({
      name: imageName,
      iterations: 100
    })

    bench
      .add('loqip', async() => {
        await getLoqip(buffer, { size: 10 })
      })
      .add('plaiceholder', async() => {
        await getPlaiceholder(buffer, { size: 10 })
      })

    await bench.run()

    const table = bench.table()

    const output = new PassThrough()
    let text = ''

    output.on('data', chunk => {
      text += chunk.toString()
    })

    const logger = new Console({
      stdout: output,
      stderr: output
    })

    logger.log(`=== ${imageName} ===`)
    logger.table(table)

    output.end()

    await new Promise(resolve => {
      output.on('finish', resolve)
    })

    results += `${text.replace(ANSI_REGEX, '')}\n`
  },
  Promise.resolve()
)

await writeFile(new URL('./results.txt', import.meta.url), results, 'utf8')

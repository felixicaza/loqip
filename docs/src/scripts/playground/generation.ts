import type { GetLoqipOptions, GetLoqipReturn } from 'loqip'

export async function generatePlaceholder(inputFile: File, options: GetLoqipOptions): Promise<GetLoqipReturn> {
  const { getLoqip } = await import('loqip')
  const buffer = new Uint8Array(await inputFile.arrayBuffer())

  return getLoqip(buffer, options)
}

export const LANGUAGES = {
  base64: 'css',
  color: 'css',
  css: 'css',
  svg: 'xml',
  json: 'json'
} as const

export type OutputType = keyof typeof LANGUAGES

export const OUTPUT_TYPES = Object.keys(LANGUAGES) as OutputType[]

export const PLACEHOLDER_PROPERTIES = [
  '--background',
  '--background-position',
  '--background-size',
  '--background-repeat'
] as const

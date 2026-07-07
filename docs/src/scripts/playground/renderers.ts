import type { GetLoqipReturn } from 'loqip'
import type { Elements, PlaceholderRenderer } from './types.ts'

import { setCustomProperties } from './dom.ts'

export function createRenderers(elements: Elements): Record<string, PlaceholderRenderer> {
  return {
    '--background': (data: GetLoqipReturn) => {
      setCustomProperties(elements.placeholder, {
        '--background': `url("${data.base64}")`,
        '--background-size': 'contain'
      })
    },

    '--background-color': (data: GetLoqipReturn) => {
      setCustomProperties(elements.placeholder, {
        '--background': data.color.hex
      })
    },

    '--background-image': (data: GetLoqipReturn) => {
      setCustomProperties(elements.placeholder, {
        '--background': data.css.backgroundImage,
        '--background-position': data.css.backgroundPosition,
        '--background-size': data.css.backgroundSize,
        '--background-repeat': data.css.backgroundRepeat
      })
    },

    '--background-svg': async(data: GetLoqipReturn) => {
      const { serializeSVG } = await import('loqip')
      const svg = serializeSVG(data.svg)
      const svgUrl = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`

      setCustomProperties(elements.placeholder, {
        '--background': svgUrl,
        '--background-size': '100% 100%',
        '--background-repeat': 'no-repeat'
      })
    }
  }
}

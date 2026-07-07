import type { GetLoqipOptions } from 'loqip'
import type { Elements } from './types.ts'

export function getOptions(elements: Elements): GetLoqipOptions {
  return {
    size: Number(elements.size.value),
    brightness: Number(elements.brightness.value),
    saturation: Number(elements.saturation.value),
    hue: elements.hue.value ? Number(elements.hue.value) : undefined,
    autoOrient: elements.autoOrient.checked,
    removeAlpha: elements.removeAlpha.checked,
    getExif: elements.getExif.checked
  }
}

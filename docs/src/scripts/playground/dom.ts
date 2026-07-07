import type { CSSCustomProperties, Elements } from './types.ts'

export function $<T extends HTMLElement>(root: HTMLElement, selector: string): T {
  const element = root.querySelector<T>(selector)
  if (!element) throw new Error(`Element not found: ${selector}`)
  return element
}

export function createElements(root: HTMLElement): Elements {
  return {
    root,
    original: $(root, '.original') as HTMLImageElement,
    placeholder: $(root, '.placeholder') as HTMLDivElement,
    fileDropzone: $(root, '.dropzone') as HTMLLabelElement,
    fileInput: $(root, '#file') as HTMLInputElement,
    testImages: $(root, '.test-images') as HTMLElement,
    size: $(root, '#size') as HTMLInputElement,
    sizeValue: $(root, '#sizeValue') as HTMLOutputElement,
    type: $(root, '#type') as HTMLSelectElement,
    brightness: $(root, '#brightness') as HTMLInputElement,
    saturation: $(root, '#saturation') as HTMLInputElement,
    hue: $(root, '#hue') as HTMLInputElement,
    autoOrient: $(root, '#autoOrient') as HTMLInputElement,
    removeAlpha: $(root, '#removeAlpha') as HTMLInputElement,
    getExif: $(root, '#getExif') as HTMLInputElement,
    generateButton: $(root, '#generate') as HTMLButtonElement,
    outputContent: $(root, '.output-content') as HTMLDivElement,
    tabs: $(root, '.tabs') as HTMLElement
  }
}

export function setCustomProperties(element: HTMLElement, properties: CSSCustomProperties) {
  for (const [property, value] of Object.entries(properties)) {
    element.style.setProperty(property, value)
  }
}

export function clearCustomProperties(element: HTMLElement, properties: readonly string[]) {
  for (const property of properties) {
    element.style.removeProperty(property)
  }
}

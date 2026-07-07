import type { GetLoqipReturn } from 'loqip'
import type { Elements, OutputType, PlaceholderRenderer } from './types.ts'

import { dedent } from 'ts-dedent'
import { highlightHTML } from '@speed-highlight/core'
import '@speed-highlight/core/themes/atom-dark.css'

import { LANGUAGES, OUTPUT_TYPES, PLACEHOLDER_PROPERTIES } from './constants.ts'
import { clearCustomProperties } from './dom.ts'
import { formatSVG } from './utils.ts'

export function getOutputElements(elements: Elements): Record<OutputType, HTMLPreElement> {
  return Object.fromEntries(OUTPUT_TYPES.map((type) => [
    type,
    elements.root.querySelector(`[data-panel="${type}"] pre`) as HTMLPreElement
  ])) as Record<OutputType, HTMLPreElement>
}

export function selectOutputTab(elements: Elements, selectedTab: OutputType) {
  const tabs = elements.tabs.querySelectorAll('.tab') as NodeListOf<HTMLButtonElement>
  const panels = elements.root.querySelectorAll('.panel') as NodeListOf<HTMLElement>

  tabs.forEach((tab) => {
    const isSelected = tab.dataset.tab === selectedTab

    tab.classList.toggle('is-active', isSelected)
    tab.setAttribute('aria-selected', String(isSelected))
  })

  panels.forEach((panel) => {
    const isSelected = panel.dataset.panel === selectedTab

    panel.classList.toggle('is-active', isSelected)
    panel.hidden = !isSelected
  })
}

export function selectOutputTabForType(elements: Elements, type: string) {
  const tabByType: Record<string, OutputType> = {
    '--background': 'base64',
    '--background-color': 'color',
    '--background-image': 'css',
    '--background-svg': 'svg'
  }

  const selectedTab = tabByType[type]
  if (selectedTab) selectOutputTab(elements, selectedTab)
}

export async function render(elements: Elements, data: GetLoqipReturn, renderers: Record<string, PlaceholderRenderer>) {
  const { serializeSVG } = await import('loqip')
  const outputs = getOutputElements(elements)

  const output = {
    base64: dedent`.loqip-placeholder {
      background-image: url("${data.base64}");
      background-size: cover;
    }`,
    color: dedent`.loqip-placeholder {
      background-color: ${data.color.hex};
    }`,
    css: dedent`.loqip-placeholder {
      background-image: ${data.css.backgroundImage};
      background-position: ${data.css.backgroundPosition};
      background-size: ${data.css.backgroundSize};
      background-repeat: ${data.css.backgroundRepeat};
    }`,
    svg: formatSVG(serializeSVG(data.svg)),
    json: JSON.stringify(
      {
        metadata: data.metadata,
        base64: data.base64,
        color: data.color,
        pixels: data.pixels,
        css: data.css,
        svg: data.svg
      },
      null,
      2
    )
  }

  await Promise.all(
    OUTPUT_TYPES.map(async(type) => {
      const element = outputs[type]
      const language = LANGUAGES[type]

      element.classList.add(`shj-lang-${language}`, 'shj-block')
      element.innerHTML = await highlightHTML(output[type], language)
    })
  )

  clearCustomProperties(elements.placeholder, PLACEHOLDER_PROPERTIES)

  const renderer = renderers[elements.type.value]
  if (!renderer) throw new Error(`Unsupported output type: ${elements.type.value}`)

  await renderer(data)

  selectOutputTabForType(elements, elements.type.value)
}

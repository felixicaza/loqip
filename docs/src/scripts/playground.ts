import { Buffer } from 'buffer'

import { mountPlayground } from './playground/mount.ts'

if (typeof (globalThis as { Buffer?: unknown }).Buffer === 'undefined') {
  (globalThis as { Buffer?: unknown }).Buffer = Buffer
}

/**
 * Prevents the same playground from being mounted more than once.
 *
 * This is useful when the module is imported from multiple places or when
 * external code also attempts to initialize the playground.
 */
const mountedPlaygrounds = new WeakSet<HTMLElement>()

/**
 * Finds and automatically mounts all playgrounds currently present in the DOM.
 */
function mountAllPlaygrounds() {
  const playgrounds = document.querySelectorAll('.playground') as NodeListOf<HTMLElement>

  playgrounds.forEach((root) => {
    if (mountedPlaygrounds.has(root)) return

    try {
      mountPlayground(root)
      mountedPlaygrounds.add(root)
    } catch(error) {
      console.error('Failed to mount playground:', error)
    }
  })
}

/**
 * Automatically initializes the playgrounds.
 *
 * If the HTML document has already finished loading, the playgrounds are
 * mounted immediately. Otherwise, waits for the `DOMContentLoaded` event
 * before mounting them.
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAllPlaygrounds, { once: true })
} else {
  mountAllPlaygrounds()
}

export { mountPlayground }

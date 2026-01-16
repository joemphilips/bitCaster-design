/**
 * Event model loading and parsing utilities
 */

import type { EventModel, DomainEvent } from '@/types/product'

// Load event model markdown file at build time
const eventModelFiles = import.meta.glob('/product/event-model/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/**
 * Parse event-model.md content into EventModel structure
 *
 * Expected format:
 * # Event Model
 *
 * ## Domain Events
 *
 * ### EventName
 * Description of what this event represents and when it occurs.
 *
 * ### AnotherEvent
 * Description of this event.
 *
 * ## Event Flows
 *
 * - When Event1 occurs, it triggers Event2
 * - Event3 happens in response to Event4
 */
export function parseEventModel(md: string): EventModel | null {
  if (!md || !md.trim()) return null

  try {
    const events: DomainEvent[] = []
    const flows: string[] = []

    // Extract events section
    const eventsSection = md.match(/## Domain Events\s*\n+([\s\S]*?)(?=\n## |\n#[^#]|$)/)

    if (eventsSection?.[1]) {
      // Match ### EventName followed by description
      const eventMatches = [...eventsSection[1].matchAll(/### ([^\n]+)\n+([\s\S]*?)(?=\n### |\n## |$)/g)]
      for (const match of eventMatches) {
        events.push({
          name: match[1].trim(),
          description: match[2].trim(),
        })
      }
    }

    // Extract event flows section
    const flowsSection = md.match(/## Event Flows\s*\n+([\s\S]*?)(?=\n## |\n#[^#]|$)/)

    if (flowsSection?.[1]) {
      const lines = flowsSection[1].split('\n')
      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.startsWith('- ')) {
          flows.push(trimmed.slice(2).trim())
        }
      }
    }

    // Return null if we couldn't parse anything meaningful
    if (events.length === 0 && flows.length === 0) {
      return null
    }

    return { events, flows }
  } catch {
    return null
  }
}

/**
 * Load the event model from markdown file
 */
export function loadEventModel(): EventModel | null {
  const content = eventModelFiles['/product/event-model/event-model.md']
  return content ? parseEventModel(content) : null
}

/**
 * Check if event model has been defined
 */
export function hasEventModel(): boolean {
  return '/product/event-model/event-model.md' in eventModelFiles
}

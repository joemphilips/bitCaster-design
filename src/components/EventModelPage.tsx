import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { loadProductData } from '@/lib/product-loader'

export function EventModelPage() {
  const productData = useMemo(() => loadProductData(), [])
  const eventModel = productData.eventModel

  const hasEventModel = !!eventModel
  const stepStatus: StepStatus = hasEventModel ? 'completed' : 'current'

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Event Model
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Define the core domain events and event flows in your product using event storming.
          </p>
        </div>

        {/* Step 1: Event Model */}
        <StepIndicator step={1} status={stepStatus} isLast={!hasEventModel}>
          {!eventModel ? (
            <EmptyState type="event-model" />
          ) : (
            <div className="space-y-6">
              {/* Domain Events */}
              <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    Domain Events
                    <span className="ml-2 text-sm font-normal text-stone-500 dark:text-stone-400">
                      ({eventModel.events.length})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {eventModel.events.length === 0 ? (
                    <p className="text-stone-500 dark:text-stone-400">No events defined.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {eventModel.events.map((event, index) => (
                        <div
                          key={index}
                          className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-4"
                        >
                          <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                            {event.name}
                          </h3>
                          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Event Flows */}
              <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    Event Flows
                    <span className="ml-2 text-sm font-normal text-stone-500 dark:text-stone-400">
                      ({eventModel.flows.length})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {eventModel.flows.length === 0 ? (
                    <p className="text-stone-500 dark:text-stone-400">No event flows defined.</p>
                  ) : (
                    <ul className="space-y-2">
                      {eventModel.flows.map((flow, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 mt-2 shrink-0" />
                          <span className="text-stone-700 dark:text-stone-300">
                            {flow}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Edit hint */}
              <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-3">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  To update the event model, run{' '}
                  <code className="font-mono text-stone-800 dark:text-stone-200">/event-model</code>{' '}
                  or edit the file directly at{' '}
                  <code className="font-mono text-stone-800 dark:text-stone-200">
                    product/event-model/event-model.md
                  </code>
                </p>
              </div>
            </div>
          )}
        </StepIndicator>

        {/* Next Phase Button - shown when all steps complete */}
        {hasEventModel && (
          <StepIndicator step={2} status="current" isLast>
            <NextPhaseButton nextPhase="design" />
          </StepIndicator>
        )}
      </div>
    </AppLayout>
  )
}

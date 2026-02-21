import { Plus, Trash2, Upload } from 'lucide-react'
import type { WizardOutcome, OutcomeType } from '../types'

interface OutcomesStepProps {
  outcomeType: OutcomeType
  outcomes: WizardOutcome[] | null
  onAddOutcome?: () => void
  onRemoveOutcome?: (outcomeId: string) => void
  onOutcomeLabelChange?: (outcomeId: string, label: string) => void
  onOutcomeProbabilityChange?: (outcomeId: string, probability: number) => void
  onNext?: () => void
}

export function OutcomesStep({
  outcomeType,
  outcomes,
  onAddOutcome,
  onRemoveOutcome,
  onOutcomeLabelChange,
  onOutcomeProbabilityChange,
  onNext,
}: OutcomesStepProps) {
  const totalProbability = outcomes?.reduce((sum, o) => sum + (o.probability ?? 0), 0) ?? 0

  if (outcomeType === 'yesno') {
    return (
      <div className="w-full max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Market Outcomes</h2>
        <p className="text-sm text-slate-400 mb-8">
          Your Yes/No market has two fixed outcomes.
        </p>

        <div className="space-y-3 mb-8">
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center">
                <span className="text-green-400 font-bold text-sm">Y</span>
              </div>
              <div>
                <p className="font-medium text-white text-sm">Yes</p>
                <p className="text-xs text-slate-400">The condition is met</p>
              </div>
              <div className="ml-auto text-right">
                <span className="text-sm font-medium text-slate-300">50%</span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/15 flex items-center justify-center">
                <span className="text-red-400 font-bold text-sm">N</span>
              </div>
              <div>
                <p className="font-medium text-white text-sm">No</p>
                <p className="text-xs text-slate-400">The condition is not met</p>
              </div>
              <div className="ml-auto text-right">
                <span className="text-sm font-medium text-slate-300">50%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Probability bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Target Probability Summary</span>
            <span>100%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex">
            <div className="h-full bg-green-500" style={{ width: '50%' }} />
            <div className="h-full bg-red-500" style={{ width: '50%' }} />
          </div>
        </div>

        <button
          onClick={() => onNext?.()}
          className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/25"
        >
          Next
        </button>
      </div>
    )
  }

  // Categorical outcomes
  const canProceed = outcomes && outcomes.length >= 2 && outcomes.every((o) => o.label.trim().length > 0)

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Define Outcomes</h2>
      <p className="text-sm text-slate-400 mb-8">
        Add at least 2 possible outcomes for your categorical market.
      </p>

      <div className="space-y-3 mb-4">
        {outcomes?.map((outcome) => (
          <div key={outcome.id} className="p-4 rounded-lg bg-slate-900 border border-slate-700">
            <div className="flex items-start gap-3">
              {/* Thumbnail placeholder */}
              <button className="w-12 h-12 shrink-0 rounded-lg border border-dashed border-slate-600 bg-slate-800 flex items-center justify-center text-slate-500 hover:border-slate-500 transition-colors">
                <Upload className="w-4 h-4" strokeWidth={1.5} />
              </button>

              {/* Label input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={outcome.label}
                  onChange={(e) => onOutcomeLabelChange?.(outcome.id, e.target.value)}
                  placeholder="Outcome label..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Probability input */}
              <div className="w-20 shrink-0">
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={outcome.probability ?? ''}
                    onChange={(e) => onOutcomeProbabilityChange?.(outcome.id, Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm text-right pr-7 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">%</span>
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => onRemoveOutcome?.(outcome.id)}
                className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add outcome */}
      <button
        onClick={() => onAddOutcome?.()}
        className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-6"
      >
        <Plus className="w-4 h-4" strokeWidth={1.5} />
        Add Outcome
      </button>

      {/* Probability bar */}
      {outcomes && outcomes.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Target Probability Summary</span>
            <span className={totalProbability === 100 ? 'text-green-400' : totalProbability > 100 ? 'text-red-400' : ''}>
              {totalProbability}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex">
            {outcomes.map((outcome) => (
              <div
                key={outcome.id}
                className="h-full bg-blue-500 first:rounded-l-full last:rounded-r-full"
                style={{ width: `${Math.min(outcome.probability ?? 0, 100)}%` }}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onNext?.()}
        disabled={!canProceed}
        className={`w-full py-3 rounded-full font-semibold text-sm transition-colors ${
          canProceed
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  )
}

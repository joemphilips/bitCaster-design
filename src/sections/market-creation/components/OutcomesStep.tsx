import { Plus, Trash2, Upload } from 'lucide-react'
import type { WizardOutcome, OutcomeType } from '@/../product/sections/market-creation/types'

interface OutcomesStepProps {
  outcomeType: OutcomeType
  outcomes: WizardOutcome[] | null
  loBound?: number
  hiBound?: number
  precision?: number
  unit?: string
  onAddOutcome?: () => void
  onRemoveOutcome?: (outcomeId: string) => void
  onOutcomeLabelChange?: (outcomeId: string, label: string) => void
  onLoBoundChange?: (value: number) => void
  onHiBoundChange?: (value: number) => void
  onPrecisionChange?: (value: number) => void
  onUnitChange?: (value: string) => void
  onNext?: () => void
}

export function OutcomesStep({
  outcomeType,
  outcomes,
  loBound,
  hiBound,
  precision,
  unit,
  onAddOutcome,
  onRemoveOutcome,
  onOutcomeLabelChange,
  onLoBoundChange,
  onHiBoundChange,
  onPrecisionChange,
  onUnitChange,
  onNext,
}: OutcomesStepProps) {
  // Numeric market
  if (outcomeType === 'numeric') {
    const canProceed =
      loBound !== undefined &&
      hiBound !== undefined &&
      hiBound > loBound

    return (
      <div className="w-full max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Numeric Range</h2>
        <p className="text-sm text-slate-400 mb-8">
          Define the range and precision for your numeric market.
        </p>

        <div className="space-y-5 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Low Bound</label>
              <input
                type="number"
                value={loBound ?? ''}
                onChange={(e) => onLoBoundChange?.(Number(e.target.value))}
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">High Bound</label>
              <input
                type="number"
                value={hiBound ?? ''}
                onChange={(e) => onHiBoundChange?.(Number(e.target.value))}
                placeholder="100"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Unit</label>
            <input
              type="text"
              value={unit ?? ''}
              onChange={(e) => onUnitChange?.(e.target.value)}
              placeholder="e.g. USD, BTC, %"
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Precision (decimal places)</label>
            <input
              type="number"
              min={0}
              max={8}
              value={precision ?? ''}
              onChange={(e) => onPrecisionChange?.(Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
            />
            <p className="text-xs text-slate-500 mt-1.5">Number of decimal places for the outcome value</p>
          </div>
        </div>

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

  // Yes/No market — labels are fixed by the selected outcome type.
  if (outcomeType === 'yesno' && outcomes) {
    const canProceedYesNo = outcomes.every((outcome) => outcome.label.trim().length > 0)

    return (
      <div className="w-full max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Market Outcomes</h2>
        <p className="text-sm text-slate-400 mb-8">
          Your Yes/No market has two fixed outcomes.
        </p>

        <div className="space-y-3 mb-4">
          {outcomes.map((outcome) => (
            <div key={outcome.id} className="p-4 rounded-lg bg-slate-900 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${outcome.id === 'yes' ? 'bg-green-500/15' : 'bg-red-500/15'} flex items-center justify-center`}>
                  <span className={`${outcome.id === 'yes' ? 'text-green-400' : 'text-red-400'} font-bold text-sm`}>
                    {outcome.id === 'yes' ? 'Y' : 'N'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{outcome.label}</p>
                  {outcome.description && <p className="text-xs text-slate-400">{outcome.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNext?.()}
          disabled={!canProceedYesNo}
          className={`w-full py-3 rounded-full font-semibold text-sm transition-colors ${
            canProceedYesNo
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
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
        className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-8"
      >
        <Plus className="w-4 h-4" strokeWidth={1.5} />
        Add Outcome
      </button>

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

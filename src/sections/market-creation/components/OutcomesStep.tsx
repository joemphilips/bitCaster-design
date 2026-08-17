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
  if (outcomeType === 'numeric') {
    const canProceed = loBound !== undefined && hiBound !== undefined && hiBound > loBound
    return (
      <div className="w-full max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Numeric Range</h2>
        <p className="text-sm text-slate-400 mb-8">Define the range and precision for your numeric market.</p>
        <div className="space-y-5 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-slate-300">Low Bound
              <input type="number" value={loBound ?? ''} onChange={(e) => onLoBoundChange?.(Number(e.target.value))} placeholder="0" className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm" />
            </label>
            <label className="block text-sm font-medium text-slate-300">High Bound
              <input type="number" value={hiBound ?? ''} onChange={(e) => onHiBoundChange?.(Number(e.target.value))} placeholder="100" className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm" />
            </label>
          </div>
          <label className="block text-sm font-medium text-slate-300">Unit
            <input type="text" value={unit ?? ''} onChange={(e) => onUnitChange?.(e.target.value)} placeholder="e.g. USD, BTC, %" className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm" />
          </label>
          <label className="block text-sm font-medium text-slate-300">Precision (decimal places)
            <input type="number" min={0} max={8} value={precision ?? ''} onChange={(e) => onPrecisionChange?.(Number(e.target.value))} placeholder="0" className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm" />
          </label>
        </div>
        <button onClick={() => onNext?.()} disabled={!canProceed} className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-sm disabled:bg-slate-800 disabled:text-slate-500">Next</button>
      </div>
    )
  }

  const isYesNo = outcomeType === 'yesno'
  const canProceed = isYesNo
    ? Boolean(outcomes && outcomes.length === 2 && outcomes.every((o) => o.label.trim().length > 0))
    : Boolean(outcomes && outcomes.length >= 2 && outcomes.every((o) => o.label.trim().length > 0))

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{isYesNo ? 'Market Outcomes' : 'Define Outcomes'}</h2>
      <p className="text-sm text-slate-400 mb-8">{isYesNo ? 'Your Yes/No market has two fixed outcomes.' : 'Add at least 2 possible outcomes for your categorical market.'}</p>
      <div className="space-y-3 mb-4">
        {outcomes?.map((outcome) => (
          <div key={outcome.id} className="p-4 rounded-lg bg-slate-900 border border-slate-700">
            <div className="flex items-start gap-3">
              {!isYesNo && <button className="w-12 h-12 shrink-0 rounded-lg border border-dashed border-slate-600 bg-slate-800 flex items-center justify-center text-slate-500"><Upload className="w-4 h-4" strokeWidth={1.5} /></button>}
              <div className="flex-1">
                <input type="text" value={outcome.label} onChange={(e) => onOutcomeLabelChange?.(outcome.id, e.target.value)} placeholder="Outcome label..." className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm" />
                {outcome.description && <p className="text-xs text-slate-400 mt-1">{outcome.description}</p>}
              </div>
              {!isYesNo && <button onClick={() => onRemoveOutcome?.(outcome.id)} className="p-2 rounded-lg text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" strokeWidth={1.5} /></button>}
            </div>
          </div>
        ))}
      </div>
      {!isYesNo && <button onClick={() => onAddOutcome?.()} className="flex items-center gap-1.5 text-sm text-blue-400 mb-8"><Plus className="w-4 h-4" strokeWidth={1.5} />Add Outcome</button>}
      <button onClick={() => onNext?.()} disabled={!canProceed} className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-sm disabled:bg-slate-800 disabled:text-slate-500">Next</button>
    </div>
  )
}

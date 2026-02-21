import { ToggleLeft, LayoutGrid } from 'lucide-react'
import type { OutcomeType } from '../types'

interface GetStartedProps {
  outcomeType: OutcomeType | null
  onOutcomeTypeSelect?: (type: OutcomeType) => void
  onNext?: () => void
}

export function GetStarted({ outcomeType, onOutcomeTypeSelect, onNext }: GetStartedProps) {
  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Get Started</h2>
      <p className="text-sm text-slate-400 mb-8">
        Choose the type of market you want to create.
      </p>

      <div className="space-y-4 mb-8">
        <button
          onClick={() => onOutcomeTypeSelect?.('yesno')}
          className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
            outcomeType === 'yesno'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-700 bg-slate-900 hover:border-slate-600'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-lg ${outcomeType === 'yesno' ? 'bg-blue-500/20' : 'bg-slate-800'}`}>
              <ToggleLeft className={`w-6 h-6 ${outcomeType === 'yesno' ? 'text-blue-400' : 'text-slate-500'}`} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Yes / No</p>
              <p className="text-sm text-slate-400">
                A simple binary market with two outcomes. Example: "Will Bitcoin reach $200k by 2027?"
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onOutcomeTypeSelect?.('categorical')}
          className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
            outcomeType === 'categorical'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-700 bg-slate-900 hover:border-slate-600'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-lg ${outcomeType === 'categorical' ? 'bg-blue-500/20' : 'bg-slate-800'}`}>
              <LayoutGrid className={`w-6 h-6 ${outcomeType === 'categorical' ? 'text-blue-400' : 'text-slate-500'}`} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Categorical</p>
              <p className="text-sm text-slate-400">
                Multiple possible outcomes. Example: "Which team will win the Champions League?"
              </p>
            </div>
          </div>
        </button>
      </div>

      <button
        onClick={() => onNext?.()}
        disabled={!outcomeType}
        className={`w-full py-3 rounded-full font-semibold text-sm transition-colors ${
          outcomeType
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  )
}

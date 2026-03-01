import { AlertTriangle, ArrowLeft, Check, X } from 'lucide-react'
import type { SeedVerifyPhase } from '../types'

interface SeedDisplayProps {
  seedWords: string[]
  seedSaved: boolean
  seedVerifyPhase: SeedVerifyPhase
  seedVerifyInputs: { word3: string; word7: string; word12: string }
  onSeedSavedToggle?: (saved: boolean) => void
  onContinue?: () => void
  onSeedVerifyInput?: (position: 3 | 7 | 12, word: string) => void
  onSeedVerifyComplete?: () => void
  onSeedVerifyBack?: () => void
}

const VERIFY_POSITIONS = [3, 7, 12] as const

export function SeedDisplay({
  seedWords,
  seedSaved,
  seedVerifyPhase,
  seedVerifyInputs,
  onSeedSavedToggle,
  onContinue,
  onSeedVerifyInput,
  onSeedVerifyComplete,
  onSeedVerifyBack,
}: SeedDisplayProps) {
  if (seedVerifyPhase === 'verify') {
    const entries = VERIFY_POSITIONS.map((pos) => {
      const key = `word${pos}` as keyof typeof seedVerifyInputs
      const input = seedVerifyInputs[key].trim().toLowerCase()
      const expected = seedWords[pos - 1]
      const isEmpty = input === ''
      const isCorrect = input === expected
      return { pos, key, input, isEmpty, isCorrect }
    })

    const allCorrect = entries.every((e) => e.isCorrect)

    return (
      <div className="max-w-lg mx-auto">
        {/* Back link */}
        <button
          onClick={() => onSeedVerifyBack?.()}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to seed phrase
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Verify Your Seed Phrase
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Enter the following words from your seed phrase to confirm you saved it
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {entries.map(({ pos, isEmpty, isCorrect }) => {
            const key = `word${pos}` as keyof typeof seedVerifyInputs
            return (
              <div key={pos}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Word #{pos}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={seedVerifyInputs[key]}
                    onChange={(e) => onSeedVerifyInput?.(pos as 3 | 7 | 12, e.target.value)}
                    placeholder={`Enter word #${pos}`}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-mono bg-white dark:bg-slate-900/60 pr-10 transition-colors ${
                      isEmpty
                        ? 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        : isCorrect
                          ? 'border-emerald-400 dark:border-emerald-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    } text-slate-900 dark:text-white outline-none`}
                  />
                  {!isEmpty && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isCorrect ? (
                        <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                      ) : (
                        <X className="w-4 h-4 text-red-500" strokeWidth={2.5} />
                      )}
                    </span>
                  )}
                </div>
                {!isEmpty && !isCorrect && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">Incorrect word</p>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={() => onSeedVerifyComplete?.()}
          disabled={!allCorrect}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white disabled:text-slate-500 dark:disabled:text-slate-500 font-semibold transition-colors"
        >
          Verify & Continue
        </button>
      </div>
    )
  }

  // Display phase (default)
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Your Seed Phrase
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Write down these 12 words in order and store them safely
        </p>
      </div>

      {/* Seed word grid */}
      <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 mb-5">
        <div className="grid grid-cols-3 gap-3">
          {seedWords.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700"
            >
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 w-5 text-right tabular-nums">
                {index + 1}.
              </span>
              <span className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 mb-5">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
          Write down these words in order. You will need them to recover your wallet.
          Never share your seed phrase.
        </p>
      </div>

      {/* Checkbox + Continue */}
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={seedSaved}
            onChange={(e) => onSeedSavedToggle?.(e.target.checked)}
            className="w-4.5 h-4.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            I have saved my seed phrase
          </span>
        </label>

        <button
          onClick={() => onContinue?.()}
          disabled={!seedSaved}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white disabled:text-slate-500 dark:disabled:text-slate-500 font-semibold transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

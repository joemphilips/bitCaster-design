import { Calculator, AlertTriangle } from 'lucide-react'
import type { WizardStepMarketPreview } from '@/../product/sections/market-creation/types'

interface MarketPreviewStepProps {
  data: WizardStepMarketPreview
  onCalculatePreview?: () => void
  onConfirmPreview?: (confirmed: boolean) => void
  onNext?: () => void
}

export function MarketPreviewStep({
  data,
  onCalculatePreview,
  onConfirmPreview,
  onNext,
}: MarketPreviewStepProps) {
  const hasCalculated = data.estimatedInitialCost > 0 || data.worstCaseLoss > 0

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Market Preview</h2>
      <p className="text-sm text-slate-400 mb-8">
        Review the estimated costs and risks before creating your market.
      </p>

      {/* Calculate button */}
      {!hasCalculated && (
        <button
          onClick={() => onCalculatePreview?.()}
          className="w-full p-6 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all mb-8 group"
        >
          <Calculator className="w-8 h-8 text-slate-500 group-hover:text-blue-400 mx-auto mb-3 transition-colors" strokeWidth={1.5} />
          <p className="font-semibold text-white text-sm mb-1">Calculate Market Preview</p>
          <p className="text-xs text-slate-400">
            Estimate the initial cost and worst-case loss for your market configuration
          </p>
        </button>
      )}

      {/* Results */}
      {hasCalculated && (
        <div className="space-y-4 mb-8">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-700">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/15">
                <Calculator className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 mb-1">Estimated Initial Cost</p>
                <p className="text-2xl font-bold text-white">
                  {data.estimatedInitialCost.toLocaleString()} <span className="text-sm font-normal text-slate-400">sats</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/15">
                <AlertTriangle className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 mb-1">Worst Case Loss</p>
                <p className="text-2xl font-bold text-white">
                  {data.worstCaseLoss.toLocaleString()} <span className="text-sm font-normal text-slate-400">sats</span>
                </p>
                <p className="text-xs text-amber-400/80 mt-1">
                  Maximum amount you could lose if the market resolves unfavorably
                </p>
              </div>
            </div>
          </div>

          {/* Recalculate */}
          <button
            onClick={() => onCalculatePreview?.()}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Recalculate
          </button>

          {/* Confirmation checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-lg bg-slate-900 border border-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={data.confirmed}
              onChange={(e) => onConfirmPreview?.(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500/40"
            />
            <span className="text-sm text-slate-300">
              I understand the costs and risks associated with creating this market
            </span>
          </label>
        </div>
      )}

      <button
        onClick={() => onNext?.()}
        disabled={!hasCalculated || !data.confirmed}
        className={`w-full py-3 rounded-full font-semibold text-sm transition-colors ${
          hasCalculated && data.confirmed
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  )
}

import type { WizardStepMarketSettings } from '../types'

interface MarketSettingsProps {
  data: WizardStepMarketSettings
  onSellFeeChange?: (percent: number) => void
  onBuyFeeChange?: (percent: number) => void
  onWinFeeChange?: (percent: number) => void
  onNext?: () => void
}

function FeeInput({
  label,
  description,
  value,
  onChange,
}: {
  label: string
  description: string
  value: number
  onChange?: (value: number) => void
}) {
  const bps = Math.round(value * 100)

  return (
    <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={value}
            onChange={(e) => onChange?.(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm text-right pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">%</span>
        </div>
        <span className="text-xs text-slate-500 w-16 text-right">{bps} BPS</span>
      </div>
    </div>
  )
}

export function MarketSettings({
  data,
  onSellFeeChange,
  onBuyFeeChange,
  onWinFeeChange,
  onNext,
}: MarketSettingsProps) {
  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Market Settings</h2>
      <p className="text-sm text-slate-400 mb-8">
        Configure the fee structure for your market. Fees are collected from traders.
      </p>

      <div className="space-y-4 mb-8">
        <FeeInput
          label="Sell Fee"
          description="Fee charged when traders sell positions"
          value={data.sellFeePercent}
          onChange={onSellFeeChange}
        />
        <FeeInput
          label="Buy Fee"
          description="Fee charged when traders buy positions"
          value={data.buyFeePercent}
          onChange={onBuyFeeChange}
        />
        <FeeInput
          label="Win Fee"
          description="Fee charged on winning payouts"
          value={data.winFeePercent}
          onChange={onWinFeeChange}
        />
      </div>

      {/* Fee summary */}
      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 mb-8">
        <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Fee Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-white">{data.sellFeePercent}%</p>
            <p className="text-xs text-slate-500">Sell</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{data.buyFeePercent}%</p>
            <p className="text-xs text-slate-500">Buy</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{data.winFeePercent}%</p>
            <p className="text-xs text-slate-500">Win</p>
          </div>
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

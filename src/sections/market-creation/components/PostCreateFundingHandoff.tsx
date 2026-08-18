import { useState } from 'react'
import { Coins, Info } from 'lucide-react'
import type { PostCreateFundingChoice, PostCreateFundingHandoffProps } from '@/../product/sections/market-creation/types'

const presetAmounts = [
  { label: 'Minimal', amountSats: 10_000 },
  { label: 'Standard', amountSats: 100_000 },
  { label: 'Deep', amountSats: 500_000 },
]

/**
 * Optional handoff shown after registration succeeds.
 * The selected action is passed to the durable funding flow. It is not part
 * of the market registration request.
 */
export function PostCreateFundingHandoff({ marketId, context = 'creation', onComplete }: PostCreateFundingHandoffProps) {
  const [choice, setChoice] = useState<PostCreateFundingChoice>('none')
  const [amountSats, setAmountSats] = useState(0)

  const canContinue = choice === 'none' || amountSats > 0

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
        {context === 'liquidity' ? 'Add market capacity' : 'Market created'}
      </h2>
      <p className="text-sm text-slate-400 mb-8">
        {context === 'liquidity'
          ? <>Use the durable funding flow for <span className="font-mono text-slate-300">{marketId}</span>. Funding adds capacity, but does not guarantee an executable order or set a confirmed price.</>
          : <>Market <span className="font-mono text-slate-300">{marketId}</span> is Open. Registration did not deposit funds or set a price.</>}
      </p>

      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" strokeWidth={1.5} />
          <p className="text-xs text-blue-300/80 leading-relaxed">
            A market shows No trades yet until a confirmed trade exists. This handoff is separate from registration and can be repeated from the LIQUIDITY tab. Funding adds capacity; it does not itself create an order or a price.
          </p>
        </div>
      </div>

      <fieldset className="space-y-3 mb-8">
        <legend className="text-sm font-medium text-slate-300 mb-3">Funding options</legend>
        {([
          ['none', 'No liquidity', 'Keep the market open without bot liquidity.'],
          ['preset', 'Presets', 'Choose a standard funding amount.'],
          ['custom', 'Custom', 'Enter an amount for the durable funding flow.'],
        ] as const).map(([value, label, description]) => (
          <label key={value} className={`block p-4 rounded-lg border cursor-pointer transition-colors ${choice === value ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-900 hover:border-slate-600'}`}>
            <input
              type="radio"
              name="post-create-funding"
              value={value}
              checked={choice === value}
              onChange={() => setChoice(value)}
              className="sr-only"
            />
            <span className="font-medium text-white text-sm">{label}</span>
            <span className="block text-xs text-slate-400 mt-1">{description}</span>
          </label>
        ))}
      </fieldset>

      {choice === 'preset' && (
        <div className="flex flex-wrap gap-2 mb-8">
          {presetAmounts.map(({ label, amountSats: amount }) => (
            <button
              key={amount}
              type="button"
              onClick={() => setAmountSats(amount)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${amountSats === amount ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}`}
            >
              {label} · {amount.toLocaleString()} sats
            </button>
          ))}
        </div>
      )}

      {choice === 'custom' && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="post-create-funding-sats">Amount (sats)</label>
          <div className="relative">
            <Coins className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" strokeWidth={1.5} />
            <input
              id="post-create-funding-sats"
              type="number"
              min={0}
              value={amountSats || ''}
              onChange={(event) => setAmountSats(Math.max(0, Number(event.target.value)))}
              placeholder="0"
              className="w-full pl-11 pr-16 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">sats</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => onComplete?.(choice, choice === 'none' ? undefined : amountSats)}
        disabled={!canContinue}
        className={`w-full py-3 rounded-full font-semibold text-sm transition-colors ${canContinue ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
      >
        {choice === 'none' ? 'Continue without liquidity' : 'Continue to funding'}
      </button>
    </div>
  )
}

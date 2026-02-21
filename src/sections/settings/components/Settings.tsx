import { useState } from 'react'
import type {
  SettingsProps,
  BaseCurrency,
  ThemeOption,
  MintConfig,
} from '@/../product/sections/settings/types'
import {
  Trash2,
  Plus,
  Eye,
  Copy,
  Check,
  Shield,
  ExternalLink,
} from 'lucide-react'

// ─── Segmented Control ──────────────────────────────────────────────────────

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[]
  value: T
  onChange?: (v: T) => void
}) {
  return (
    <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-700/50 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange?.(opt.value)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            value === opt.value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ─── Status Dot ─────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: MintConfig['connectionStatus'] }) {
  const colors = {
    connected: 'bg-green-500',
    disconnected: 'bg-slate-400',
    error: 'bg-red-500',
  }
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${colors[status]}`}
      title={status}
    />
  )
}

// ─── Main Settings Component ────────────────────────────────────────────────

export function Settings({
  baseCurrency,
  theme,
  mints,
  appVersion,
  onBaseCurrencyChange,
  onThemeChange,
  onAddMint,
  onRemoveMint,
  onViewSeedPhrase,
}: SettingsProps) {
  const [showAddMint, setShowAddMint] = useState(false)
  const [newMintUrl, setNewMintUrl] = useState('')
  const [showSeedConfirm, setShowSeedConfirm] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [copied, setCopied] = useState(false)

  // Dummy seed phrase for design preview
  const seedPhrase = 'abandon ability able about above absent absorb abstract absurd abuse access accident'

  const handleAddMint = () => {
    if (newMintUrl.trim()) {
      onAddMint?.(newMintUrl.trim())
      setNewMintUrl('')
      setShowAddMint(false)
    }
  }

  const handleCopySeed = () => {
    navigator.clipboard.writeText(seedPhrase)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Settings
      </h1>

      {/* ── Base Currency ──────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Base Currency
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Choose how amounts are displayed throughout the app.
        </p>
        <SegmentedControl<BaseCurrency>
          options={[
            { label: 'BTC', value: 'BTC' },
            { label: 'USD', value: 'USD' },
            { label: 'JPY', value: 'JPY' },
          ]}
          value={baseCurrency}
          onChange={onBaseCurrencyChange}
        />
      </section>

      {/* ── Theme ──────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Theme
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Select your preferred appearance.
        </p>
        <SegmentedControl<ThemeOption>
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' },
          ]}
          value={theme}
          onChange={onThemeChange}
        />
      </section>

      {/* ── Connected Mints ────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
          Connected Mints
        </h2>

        <div className="space-y-3">
          {mints.map((mint) => (
            <div
              key={mint.url}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700"
            >
              <StatusDot status={mint.connectionStatus} />
              <span className="font-mono text-sm text-slate-700 dark:text-slate-300 truncate flex-1">
                {mint.url}
              </span>
              {mint.isDefault && (
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                  Default
                </span>
              )}
              {!mint.isDefault && (
                <button
                  onClick={() => onRemoveMint?.(mint.url)}
                  className="shrink-0 p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Remove mint"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Mint */}
        {showAddMint ? (
          <div className="mt-3 flex gap-2">
            <input
              type="url"
              value={newMintUrl}
              onChange={(e) => setNewMintUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddMint()}
              placeholder="https://mint.example.com"
              className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-sm font-mono text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleAddMint}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddMint(false)
                setNewMintUrl('')
              }}
              className="px-3 py-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddMint(true)}
            className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Mint
          </button>
        )}
      </section>

      {/* ── Seed Backup ────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Seed Backup
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Back up your wallet seed phrase. Anyone with this phrase can access your funds.
        </p>
        <button
          onClick={() => setShowSeedConfirm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-sm font-medium transition-colors border border-slate-200 dark:border-slate-600"
        >
          <Eye className="w-4 h-4" />
          View Seed Phrase
        </button>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
          About
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Version
            </span>
            <span className="text-sm font-mono text-slate-900 dark:text-white">
              {appVersion}
            </span>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-700" />
          <a
            href="https://github.com/joemphilips/bitCaster"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-1 group"
          >
            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Source Code
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </a>
          <a
            href="https://github.com/joemphilips/bitCaster/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-1 group"
          >
            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Documentation
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </a>
          <a
            href="https://github.com/joemphilips/bitCaster/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-1 group"
          >
            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Support
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </a>
        </div>
      </section>

      {/* ── Seed Phrase Confirmation Modal ──────────────────────────────── */}
      {showSeedConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Security Warning
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Your seed phrase is the master key to your wallet. Never share it
              with anyone. Make sure no one is looking at your screen before
              proceeding.
            </p>

            {!showSeedPhrase ? (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSeedConfirm(false)
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSeedPhrase(true)
                    onViewSeedPhrase?.()
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                >
                  I Understand, Show Phrase
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {seedPhrase.split(' ').map((word, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                    >
                      <span className="text-xs text-slate-400 dark:text-slate-500 w-4 text-right">
                        {i + 1}
                      </span>
                      <span className="font-mono text-sm text-slate-900 dark:text-white">
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCopySeed}
                    className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowSeedConfirm(false)
                      setShowSeedPhrase(false)
                      setCopied(false)
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

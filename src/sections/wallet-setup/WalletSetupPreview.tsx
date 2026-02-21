import { useState } from 'react'
import data from '@/../product/sections/wallet-setup/data.json'
import { WalletSetup } from './components/WalletSetup'
import type {
  SetupChoice,
  SetupStep,
  MintConnectionTest,
  WalletSetupProps,
} from '@/../product/sections/wallet-setup/types'

export function WalletSetupPreview() {
  const [currentStep, setCurrentStep] = useState<SetupStep>(data.currentStep as SetupStep)
  const [showTerms, setShowTerms] = useState(data.showTerms)
  const [choice, setChoice] = useState<SetupChoice | null>(data.choice as SetupChoice | null)
  const [seedSaved, setSeedSaved] = useState(data.seedSaved)
  const [inputSeedWords, setInputSeedWords] = useState<string[]>(data.inputSeedWords)
  const [mintConnections, setMintConnections] = useState<MintConnectionTest[]>(
    data.mintConnections as MintConnectionTest[]
  )

  const props: WalletSetupProps = {
    currentStep,
    showTerms,
    choice,
    seedWords: data.seedWords,
    inputSeedWords,
    seedSaved,
    mintConnections,
    onWelcomeNext: () => {
      console.log('Welcome Next clicked')
      setCurrentStep(2)
    },
    onShowTerms: () => {
      setShowTerms(true)
    },
    onCloseTerms: () => {
      setShowTerms(false)
    },
    onPwaNext: () => {
      console.log('PWA Next clicked')
      setCurrentStep(3)
    },
    onChoiceSelect: (c) => {
      console.log('Choice selected:', c)
      setChoice(c)
      setCurrentStep(4)
    },
    onSeedSavedToggle: (saved) => {
      setSeedSaved(saved)
    },
    onSeedWordInput: (index, word) => {
      setInputSeedWords((prev) => {
        const next = [...prev]
        next[index] = word
        return next
      })
    },
    onSeedPhrasePaste: (phrase) => {
      const words = phrase.trim().split(/[\s,]+/).slice(0, 12)
      const padded = [...words, ...Array(12).fill('')].slice(0, 12)
      setInputSeedWords(padded)
    },
    onRecover: () => {
      console.log('Recover clicked')
      setCurrentStep(5)
    },
    onContinue: () => {
      console.log('Continue clicked')
      setCurrentStep(5)
    },
    onBack: () => {
      if (currentStep === 2) {
        setCurrentStep(1)
      } else if (currentStep === 4) {
        setCurrentStep(3)
        setChoice(null)
        setSeedSaved(false)
      } else if (currentStep === 5) {
        setCurrentStep(4)
      }
    },
    onAddMint: (url) => {
      console.log('Add mint:', url)
      setMintConnections((prev) => [
        ...prev,
        { url, status: 'connecting' },
      ])
      setTimeout(() => {
        setMintConnections((prev) =>
          prev.map((m) =>
            m.url === url ? { ...m, status: 'connected' as const } : m
          )
        )
      }, 1500)
    },
    onRemoveMint: (url) => {
      console.log('Remove mint:', url)
      setMintConnections((prev) => prev.filter((m) => m.url !== url))
    },
    onFinishSetup: () => {
      console.log('Finish setup clicked')
      alert('Wallet setup complete! Would navigate to Portfolio.')
    },
  }

  const stepLabels: Record<number, string> = {
    1: 'Welcome',
    2: 'PWA',
    3: 'Choice',
    4: 'Seed',
    5: 'Mint',
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Preview Controls */}
      <div className="sticky top-0 z-[60] bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
              Step:
            </span>
            {([1, 2, 3, 4, 5] as SetupStep[]).map((step) => (
              <button
                key={step}
                onClick={() => {
                  setCurrentStep(step)
                  setShowTerms(false)
                  if (step <= 3) {
                    setChoice(null)
                    setSeedSaved(false)
                  }
                  if (step === 4 && !choice) setChoice('create')
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {step}. {stepLabels[step]}
              </button>
            ))}

            {currentStep === 4 && (
              <>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
                  Path:
                </span>
                <button
                  onClick={() => setChoice('create')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    choice === 'create'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Create
                </button>
                <button
                  onClick={() => setChoice('recover')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    choice === 'recover'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Recover
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <WalletSetup {...props} />
    </div>
  )
}

export default WalletSetupPreview

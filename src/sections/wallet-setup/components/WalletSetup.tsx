import { ArrowLeft } from 'lucide-react'
import type { WalletSetupProps } from '@/../product/sections/wallet-setup/types'
import { StepIndicator } from './StepIndicator'
import { WelcomeLanding } from './WelcomeLanding'
import { PwaConfirmation } from './PwaConfirmation'
import { ChoiceCards } from './ChoiceCards'
import { SeedDisplay } from './SeedDisplay'
import { SeedInput } from './SeedInput'
import { MintSetup } from './MintSetup'

export function WalletSetup(props: WalletSetupProps) {
  const {
    currentStep,
    showTerms,
    choice,
    seedWords,
    inputSeedWords,
    seedSaved,
    mintConnections,
    onWelcomeNext,
    onShowTerms,
    onCloseTerms,
    onPwaNext,
    onChoiceSelect,
    onSeedSavedToggle,
    onSeedWordInput,
    onSeedPhrasePaste,
    onRecover,
    onAddMint,
    onRemoveMint,
    onContinue,
    onBack,
    onFinishSetup,
  } = props

  // Step 1: Welcome landing — full-screen standalone
  if (currentStep === 1) {
    return (
      <WelcomeLanding
        showTerms={showTerms}
        onWelcomeNext={onWelcomeNext}
        onShowTerms={onShowTerms}
        onCloseTerms={onCloseTerms}
      />
    )
  }

  // Step 2: PWA confirmation — full-screen standalone
  if (currentStep === 2) {
    return (
      <PwaConfirmation
        onPwaNext={onPwaNext}
        onBack={onBack}
      />
    )
  }

  // Steps 3-5: Wallet setup wizard with step indicator
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-8 pb-4">
        {/* Back button */}
        <div className="h-10 mb-4">
          {currentStep > 3 && (
            <button
              onClick={() => onBack?.()}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Back
            </button>
          )}
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        {currentStep === 3 && (
          <ChoiceCards onChoiceSelect={onChoiceSelect} />
        )}

        {currentStep === 4 && choice === 'create' && (
          <SeedDisplay
            seedWords={seedWords}
            seedSaved={seedSaved}
            onSeedSavedToggle={onSeedSavedToggle}
            onContinue={onContinue}
          />
        )}

        {currentStep === 4 && choice === 'recover' && (
          <SeedInput
            inputSeedWords={inputSeedWords}
            onSeedWordInput={onSeedWordInput}
            onSeedPhrasePaste={onSeedPhrasePaste}
            onRecover={onRecover}
          />
        )}

        {currentStep === 5 && (
          <MintSetup
            mintConnections={mintConnections}
            onAddMint={onAddMint}
            onRemoveMint={onRemoveMint}
            onFinishSetup={onFinishSetup}
          />
        )}
      </div>
    </div>
  )
}

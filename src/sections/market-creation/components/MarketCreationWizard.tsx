import { ArrowLeft } from 'lucide-react'
import type { MarketCreationWizardProps } from '@/../product/sections/market-creation/types'
import { StepIndicator } from './StepIndicator'
import { OracleCheck } from './OracleCheck'
import { GetStarted } from './GetStarted'
import { BasicInfo } from './BasicInfo'
import { OutcomesStep } from './OutcomesStep'
import { MarketSettings } from './MarketSettings'
import { MarketPreviewStep } from './MarketPreviewStep'
import { ReviewAndCreate } from './ReviewAndCreate'

export function MarketCreationWizard(props: MarketCreationWizardProps) {
  const {
    draft,
    oracleAnnouncements,
    categoryTags,
    onOracleChoiceSelect,
    onAnnouncementSelect,
    onExit,
    onNext,
    onBack,
    onOutcomeTypeSelect,
    onTitleChange,
    onCategoryTagsChange,
    onClosingDateChange,
    onAnswerUrlsChange,
    onThumbnailUpload,
    onAddOutcome,
    onRemoveOutcome,
    onOutcomeLabelChange,
    onOutcomeProbabilityChange,
    onSellFeeChange,
    onBuyFeeChange,
    onWinFeeChange,
    onCalculatePreview,
    onConfirmPreview,
    onDescriptionChange,
    onCreateMarket,
  } = props

  const { currentStep } = draft

  // Step 1: Oracle Check — full-screen standalone
  if (currentStep === 1) {
    return (
      <OracleCheck
        choice={draft.stepOracleCheck?.choice ?? null}
        selectedAnnouncementId={draft.stepOracleCheck?.selectedAnnouncementId ?? null}
        announcements={oracleAnnouncements}
        onChoiceSelect={onOracleChoiceSelect}
        onAnnouncementSelect={onAnnouncementSelect}
        onContinue={onNext}
        onExit={onExit}
      />
    )
  }

  // Steps 2-7: Wizard with step indicator
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-8 pb-4">
        {/* Back button */}
        <div className="h-10 mb-4">
          {currentStep > 2 && (
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
        {currentStep === 2 && (
          <GetStarted
            outcomeType={draft.stepGetStarted?.outcomeType ?? null}
            onOutcomeTypeSelect={onOutcomeTypeSelect}
            onNext={onNext}
          />
        )}

        {currentStep === 3 && draft.stepBasicInfo && (
          <BasicInfo
            data={draft.stepBasicInfo}
            categoryTags={categoryTags}
            onTitleChange={onTitleChange}
            onCategoryTagsChange={onCategoryTagsChange}
            onClosingDateChange={onClosingDateChange}
            onAnswerUrlsChange={onAnswerUrlsChange}
            onThumbnailUpload={onThumbnailUpload}
            onNext={onNext}
          />
        )}

        {currentStep === 4 && draft.stepOutcomes && (
          <OutcomesStep
            outcomeType={draft.stepOutcomes.outcomeType}
            outcomes={draft.stepOutcomes.outcomes}
            onAddOutcome={onAddOutcome}
            onRemoveOutcome={onRemoveOutcome}
            onOutcomeLabelChange={onOutcomeLabelChange}
            onOutcomeProbabilityChange={onOutcomeProbabilityChange}
            onNext={onNext}
          />
        )}

        {currentStep === 5 && draft.stepMarketSettings && (
          <MarketSettings
            data={draft.stepMarketSettings}
            onSellFeeChange={onSellFeeChange}
            onBuyFeeChange={onBuyFeeChange}
            onWinFeeChange={onWinFeeChange}
            onNext={onNext}
          />
        )}

        {currentStep === 6 && draft.stepMarketPreview && (
          <MarketPreviewStep
            data={draft.stepMarketPreview}
            onCalculatePreview={onCalculatePreview}
            onConfirmPreview={onConfirmPreview}
            onNext={onNext}
          />
        )}

        {currentStep === 7 && (
          <ReviewAndCreate
            description={draft.stepReviewAndCreate?.description ?? ''}
            basicInfo={draft.stepBasicInfo}
            outcomes={draft.stepOutcomes}
            settings={draft.stepMarketSettings}
            preview={draft.stepMarketPreview}
            onDescriptionChange={onDescriptionChange}
            onCreateMarket={onCreateMarket}
          />
        )}
      </div>
    </div>
  )
}

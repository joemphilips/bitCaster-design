import { useState } from 'react'
import data from '@/../product/sections/market-creation/data.json'
import { MarketCreationWizard } from './components/MarketCreationWizard'
import type {
  WizardStep,
  WizardDraft,
  OracleCheckChoice,
  OutcomeType,
  OracleAnnouncement,
  MarketCreationWizardProps,
} from '@/../product/sections/market-creation/types'

export function MarketCreationPreview() {
  const [draft, setDraft] = useState<WizardDraft>(data.draft as WizardDraft)

  const updateDraft = (patch: Partial<WizardDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch, lastModified: new Date().toISOString() }))
  }

  const setStep = (step: WizardStep) => updateDraft({ currentStep: step })

  const props: MarketCreationWizardProps = {
    draft,
    oracleAnnouncements: data.oracleAnnouncements as OracleAnnouncement[],
    categoryTags: data.categoryTags,

    // Oracle Check
    onOracleChoiceSelect: (choice: OracleCheckChoice) => {
      updateDraft({
        stepOracleCheck: {
          choice,
          selectedAnnouncementId: null,
        },
      })
    },
    onAnnouncementSelect: (announcementId: string) => {
      updateDraft({
        stepOracleCheck: {
          choice: 'existing',
          selectedAnnouncementId: announcementId,
        },
      })
    },
    onExit: () => {
      alert('Would navigate to Settings.')
    },

    // Navigation
    onNext: () => {
      const { currentStep } = draft
      if (currentStep === 1) {
        // Moving from Oracle Check to Get Started
        setStep(2)
        if (!draft.stepGetStarted) {
          updateDraft({ currentStep: 2, stepGetStarted: { outcomeType: null } })
        }
      } else if (currentStep === 2) {
        // Moving from Get Started to Basic Info
        updateDraft({
          currentStep: 3,
          stepBasicInfo: draft.stepBasicInfo ?? {
            imageFile: null,
            title: '',
            categoryTags: [],
            closingDate: '',
            answerUrls: [],
          },
        })
      } else if (currentStep === 3) {
        // Moving from Basic Info to Outcomes
        const outcomeType = draft.stepGetStarted?.outcomeType ?? 'yesno'
        updateDraft({
          currentStep: 4,
          stepOutcomes: draft.stepOutcomes ?? {
            outcomeType,
            outcomes: outcomeType === 'categorical'
              ? [
                  { id: 'o1', label: '', description: '', probability: 50 },
                  { id: 'o2', label: '', description: '', probability: 50 },
                ]
              : null,
          },
        })
      } else if (currentStep === 4) {
        updateDraft({
          currentStep: 5,
          stepMarketSettings: draft.stepMarketSettings ?? {
            sellFeePercent: 1,
            buyFeePercent: 1,
            winFeePercent: 2,
          },
        })
      } else if (currentStep === 5) {
        updateDraft({
          currentStep: 6,
          stepMarketPreview: draft.stepMarketPreview ?? {
            estimatedInitialCost: 0,
            worstCaseLoss: 0,
            confirmed: false,
          },
        })
      } else if (currentStep === 6) {
        updateDraft({
          currentStep: 7,
          stepReviewAndCreate: draft.stepReviewAndCreate ?? { description: '' },
        })
      }
    },
    onBack: () => {
      const { currentStep } = draft
      if (currentStep > 2) {
        setStep((currentStep - 1) as WizardStep)
      }
    },

    // Get Started
    onOutcomeTypeSelect: (type: OutcomeType) => {
      updateDraft({
        stepGetStarted: { outcomeType: type },
      })
    },

    // Basic Info
    onTitleChange: (title: string) => {
      if (draft.stepBasicInfo) {
        updateDraft({ stepBasicInfo: { ...draft.stepBasicInfo, title } })
      }
    },
    onCategoryTagsChange: (tags: string[]) => {
      if (draft.stepBasicInfo) {
        updateDraft({ stepBasicInfo: { ...draft.stepBasicInfo, categoryTags: tags } })
      }
    },
    onClosingDateChange: (date: string) => {
      if (draft.stepBasicInfo) {
        updateDraft({ stepBasicInfo: { ...draft.stepBasicInfo, closingDate: date } })
      }
    },
    onAnswerUrlsChange: (urls: string[]) => {
      if (draft.stepBasicInfo) {
        updateDraft({ stepBasicInfo: { ...draft.stepBasicInfo, answerUrls: urls } })
      }
    },
    onThumbnailUpload: () => {
      console.log('Thumbnail upload triggered')
      if (draft.stepBasicInfo) {
        updateDraft({ stepBasicInfo: { ...draft.stepBasicInfo, imageFile: 'mock-thumbnail.jpg' } })
      }
    },

    // Outcomes
    onAddOutcome: () => {
      if (draft.stepOutcomes?.outcomes) {
        const id = `o${draft.stepOutcomes.outcomes.length + 1}`
        updateDraft({
          stepOutcomes: {
            ...draft.stepOutcomes,
            outcomes: [...draft.stepOutcomes.outcomes, { id, label: '', description: '', probability: 0 }],
          },
        })
      }
    },
    onRemoveOutcome: (outcomeId: string) => {
      if (draft.stepOutcomes?.outcomes) {
        updateDraft({
          stepOutcomes: {
            ...draft.stepOutcomes,
            outcomes: draft.stepOutcomes.outcomes.filter((o) => o.id !== outcomeId),
          },
        })
      }
    },
    onOutcomeLabelChange: (outcomeId: string, label: string) => {
      if (draft.stepOutcomes?.outcomes) {
        updateDraft({
          stepOutcomes: {
            ...draft.stepOutcomes,
            outcomes: draft.stepOutcomes.outcomes.map((o) =>
              o.id === outcomeId ? { ...o, label } : o
            ),
          },
        })
      }
    },
    onOutcomeProbabilityChange: (outcomeId: string, probability: number) => {
      if (draft.stepOutcomes?.outcomes) {
        updateDraft({
          stepOutcomes: {
            ...draft.stepOutcomes,
            outcomes: draft.stepOutcomes.outcomes.map((o) =>
              o.id === outcomeId ? { ...o, probability } : o
            ),
          },
        })
      }
    },

    // Market Settings
    onSellFeeChange: (percent: number) => {
      if (draft.stepMarketSettings) {
        updateDraft({ stepMarketSettings: { ...draft.stepMarketSettings, sellFeePercent: percent } })
      }
    },
    onBuyFeeChange: (percent: number) => {
      if (draft.stepMarketSettings) {
        updateDraft({ stepMarketSettings: { ...draft.stepMarketSettings, buyFeePercent: percent } })
      }
    },
    onWinFeeChange: (percent: number) => {
      if (draft.stepMarketSettings) {
        updateDraft({ stepMarketSettings: { ...draft.stepMarketSettings, winFeePercent: percent } })
      }
    },

    // Market Preview
    onCalculatePreview: () => {
      updateDraft({
        stepMarketPreview: {
          estimatedInitialCost: 10000,
          worstCaseLoss: 11000,
          confirmed: false,
        },
      })
    },
    onConfirmPreview: (confirmed: boolean) => {
      if (draft.stepMarketPreview) {
        updateDraft({ stepMarketPreview: { ...draft.stepMarketPreview, confirmed } })
      }
    },

    // Review
    onDescriptionChange: (description: string) => {
      updateDraft({ stepReviewAndCreate: { description } })
    },
    onCreateMarket: () => {
      console.log('Create market:', draft)
      alert('Market created! Would navigate to market detail page.')
    },
  }

  const stepLabels: Record<number, string> = {
    1: 'Oracle',
    2: 'Get Started',
    3: 'Basic Info',
    4: 'Outcomes',
    5: 'Settings',
    6: 'Preview',
    7: 'Review',
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
            {([1, 2, 3, 4, 5, 6, 7] as WizardStep[]).map((step) => (
              <button
                key={step}
                onClick={() => {
                  setStep(step)
                  // Initialize step data if needed
                  if (step >= 2 && !draft.stepGetStarted) {
                    updateDraft({ stepGetStarted: { outcomeType: 'yesno' } })
                  }
                  if (step >= 3 && !draft.stepBasicInfo) {
                    updateDraft({ stepBasicInfo: { imageFile: null, title: 'Will Bitcoin exceed $150,000 by Q2 2026?', categoryTags: ['Crypto'], closingDate: '2026-06-30T23:59', answerUrls: [] } })
                  }
                  if (step >= 4 && !draft.stepOutcomes) {
                    updateDraft({ stepOutcomes: { outcomeType: 'yesno', outcomes: null } })
                  }
                  if (step >= 5 && !draft.stepMarketSettings) {
                    updateDraft({ stepMarketSettings: { sellFeePercent: 1, buyFeePercent: 1, winFeePercent: 2 } })
                  }
                  if (step >= 6 && !draft.stepMarketPreview) {
                    updateDraft({ stepMarketPreview: { estimatedInitialCost: 10000, worstCaseLoss: 11000, confirmed: true } })
                  }
                  if (step >= 7 && !draft.stepReviewAndCreate) {
                    updateDraft({ stepReviewAndCreate: { description: '' } })
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  draft.currentStep === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {step}. {stepLabels[step]}
              </button>
            ))}

            {draft.currentStep === 1 && draft.stepOracleCheck && (
              <>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
                  Path:
                </span>
                <button
                  onClick={() => updateDraft({ stepOracleCheck: { choice: 'existing', selectedAnnouncementId: null } })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    draft.stepOracleCheck.choice === 'existing'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Existing
                </button>
                <button
                  onClick={() => updateDraft({ stepOracleCheck: { choice: 'become-oracle', selectedAnnouncementId: null } })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    draft.stepOracleCheck.choice === 'become-oracle'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Become Oracle
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <MarketCreationWizard {...props} />
    </div>
  )
}

export default MarketCreationPreview

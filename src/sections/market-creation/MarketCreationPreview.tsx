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
  PostCreateFundingChoice,
} from '@/../product/sections/market-creation/types'

export function MarketCreationPreview() {
  const [draft, setDraft] = useState<WizardDraft>(data.draft as WizardDraft)
  const [creationSucceeded, setCreationSucceeded] = useState(false)

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
        setStep(2)
        if (!draft.stepGetStarted) {
          updateDraft({ currentStep: 2, stepGetStarted: { outcomeType: null } })
        }
      } else if (currentStep === 2) {
        updateDraft({
          currentStep: 3,
          stepBasicInfo: draft.stepBasicInfo ?? {
            imageFile: null,
            title: '',
            categoryTags: [],
            closingDate: '',
          },
        })
      } else if (currentStep === 3) {
        const outcomeType = draft.stepGetStarted?.outcomeType ?? 'yesno'
        updateDraft({
          currentStep: 4,
          stepOutcomes: draft.stepOutcomes ?? {
            outcomeType,
            outcomes: outcomeType === 'yesno'
              ? [
                  { id: 'yes', label: 'Yes', description: 'The condition is met' },
                  { id: 'no', label: 'No', description: 'The condition is not met' },
                ]
              : outcomeType === 'categorical'
                ? [
                    { id: 'o1', label: '', description: '' },
                    { id: 'o2', label: '', description: '' },
                  ]
                : null,
          },
        })
      } else if (currentStep === 4) {
        updateDraft({
          currentStep: 5,
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
            outcomes: [...draft.stepOutcomes.outcomes, { id, label: '', description: '' }],
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
    // Review
    onDescriptionChange: (description: string) => {
      updateDraft({ stepReviewAndCreate: { description } })
    },
    onCreateMarket: () => {
      console.log('Create market:', draft)
      setCreationSucceeded(true)
    },
    creationSucceeded,
    createdMarketId: 'mkt-preview-001',
    onPostCreateFundingComplete: (choice: PostCreateFundingChoice, amountSats?: number) => {
      console.log('Post-create funding handoff:', { choice, amountSats })
    },
  }

  const stepLabels: Record<number, string> = {
    1: 'Oracle',
    2: 'Get Started',
    3: 'Basic Info',
    4: 'Outcomes',
    5: 'Review & Create',
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
            {([1, 2, 3, 4, 5] as WizardStep[]).map((step) => (
              <button
                key={step}
                onClick={() => {
                  setStep(step)
                  // Initialize step data if needed
                  if (step >= 2 && !draft.stepGetStarted) {
                    updateDraft({ stepGetStarted: { outcomeType: 'yesno' } })
                  }
                  if (step >= 3 && !draft.stepBasicInfo) {
                    updateDraft({ stepBasicInfo: { imageFile: null, title: 'Will Bitcoin exceed $150,000 by Q2 2026?', categoryTags: ['Crypto'], closingDate: '2026-06-30T23:59' } })
                  }
                  if (step >= 4 && !draft.stepOutcomes) {
                    updateDraft({ stepOutcomes: { outcomeType: 'yesno', outcomes: [
                      { id: 'yes', label: 'Yes', description: 'The condition is met' },
                      { id: 'no', label: 'No', description: 'The condition is not met' },
                    ] } })
                  }
                  if (step >= 5 && !draft.stepReviewAndCreate) {
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

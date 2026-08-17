// =============================================================================
// Oracle Check Types (Step 1)
// =============================================================================

export type OracleCheckChoice = 'existing' | 'become-oracle'

export interface OracleAnnouncement {
  id: string
  eventId: string           // Nostr event hex id (kind 88)
  oraclePubkey: string
  description: string
  resolutionDate: string    // ISO 8601
  outcomes: string[]
}

export interface WizardStepOracleCheck {
  choice: OracleCheckChoice | null
  selectedAnnouncementId: string | null
}

// =============================================================================
// Get Started Types (Step 2)
// =============================================================================

export type OutcomeType = 'yesno' | 'categorical'

export interface WizardStepGetStarted {
  outcomeType: OutcomeType | null
}

// =============================================================================
// Basic Info Types (Step 3)
// =============================================================================

export interface WizardStepBasicInfo {
  imageFile: string | null
  title: string
  categoryTags: string[]
  closingDate: string
}

// =============================================================================
// Outcomes Types (Step 4)
// =============================================================================

export interface WizardOutcome {
  id: string
  label: string
  description: string
  imageUrl?: string
}

export interface WizardStepOutcomes {
  outcomeType: OutcomeType
  outcomes: WizardOutcome[] | null  // null for yes/no
}

// =============================================================================
// Post-create funding handoff
// =============================================================================

export type PostCreateFundingChoice = 'none' | 'preset' | 'custom'

export interface PostCreateFundingHandoffProps {
  marketId: string
  onComplete?: (choice: PostCreateFundingChoice, amountSats?: number) => void
}

// =============================================================================
// Review & Create Types (Step 5)
// =============================================================================

export interface WizardStepReviewAndCreate {
  description: string
}

// =============================================================================
// Top-level Wizard Draft
// =============================================================================

export type WizardStep = 1 | 2 | 3 | 4 | 5

export interface WizardDraft {
  currentStep: WizardStep
  lastModified: string
  stepOracleCheck: WizardStepOracleCheck | null
  stepGetStarted: WizardStepGetStarted | null
  stepBasicInfo: WizardStepBasicInfo | null
  stepOutcomes: WizardStepOutcomes | null
  stepReviewAndCreate: WizardStepReviewAndCreate | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface MarketCreationWizardProps {
  /** Current wizard draft state */
  draft: WizardDraft

  /** Available oracle announcements for step 1 */
  oracleAnnouncements: OracleAnnouncement[]

  /** Available category tags for basic info */
  categoryTags: string[]

  // -------------------------------------------------------------------------
  // Oracle Check Callbacks (Step 1)
  // -------------------------------------------------------------------------

  /** Called when user selects oracle check choice */
  onOracleChoiceSelect?: (choice: OracleCheckChoice) => void

  /** Called when user selects an oracle announcement */
  onAnnouncementSelect?: (announcementId: string) => void

  /** Called when user exits the wizard (e.g. "Go to Settings") */
  onExit?: () => void

  // -------------------------------------------------------------------------
  // Navigation Callbacks
  // -------------------------------------------------------------------------

  /** Called when user advances to next step */
  onNext?: () => void

  /** Called when user goes back to previous step */
  onBack?: () => void

  /** Called when user changes outcome type in Get Started */
  onOutcomeTypeSelect?: (type: OutcomeType) => void

  // -------------------------------------------------------------------------
  // Basic Info Callbacks (Step 3)
  // -------------------------------------------------------------------------

  /** Called when user updates title */
  onTitleChange?: (title: string) => void

  /** Called when user updates category tags */
  onCategoryTagsChange?: (tags: string[]) => void

  /** Called when user updates closing date */
  onClosingDateChange?: (date: string) => void

  /** Called when user uploads a thumbnail */
  onThumbnailUpload?: () => void

  // -------------------------------------------------------------------------
  // Outcomes Callbacks (Step 4)
  // -------------------------------------------------------------------------

  /** Called when user adds an outcome */
  onAddOutcome?: () => void

  /** Called when user removes an outcome */
  onRemoveOutcome?: (outcomeId: string) => void

  /** Called when user updates an outcome label */
  onOutcomeLabelChange?: (outcomeId: string, label: string) => void

  // -------------------------------------------------------------------------
  // Review Callbacks (Step 5)
  // -------------------------------------------------------------------------

  /** Called when user updates the description */
  onDescriptionChange?: (description: string) => void

  /** Called when user clicks Create Market */
  onCreateMarket?: () => void

  /** True after registration succeeds. Funding is a separate durable flow. */
  creationSucceeded?: boolean

  /** Identifier of the newly registered market for the funding handoff. */
  createdMarketId?: string

  /** Called after the optional post-create funding flow completes. */
  onPostCreateFundingComplete?: (choice: PostCreateFundingChoice, amountSats?: number) => void
}

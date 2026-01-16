# Event Model

You are helping the user define the core event model for their product using **pure event modeling (event storming)**. This establishes the "what happens" in the system — the domain events and their flows, following the DCB (Domain Context Blocks) approach where there are no aggregates or entities, only events.

## Step 1: Check Prerequisites

First, verify that the product overview and roadmap exist:

1. Read `/product/product-overview.md` to understand what the product does
2. Read `/product/product-roadmap.md` to understand the planned sections

If either file is missing, let the user know:

"Before defining your event model, you'll need to establish your product vision. Please run `/product-vision` first, then `/product-roadmap` to define your sections."

Stop here if prerequisites are missing.

## Step 2: Gather Initial Input

Review the product overview and roadmap, then present your initial analysis:

"Based on your product vision and roadmap, I can see you're building **[Product Name]** with sections for [list sections].

Let me help you define the core event model using event storming — the main "events" (things that happen) in your system.

Looking at your product, here are some domain events I'm seeing:

- **[Event 1]** — [Brief description of what happens, when it happens]
- **[Event 2]** — [Brief description based on sections]
- **[Event 3]** — [Brief description]

In DCB/event sourcing, we model everything as events (things that happened), not entities. Each event represents a state change in your system.

Does this capture the main things that happen in your app? What would you add, remove, or change?"

Wait for their response before proceeding.

## Step 3: Refine Events

Use the AskUserQuestion tool to clarify:

- "Are there any other key events in your system that represent important state changes?"
- "For [Event], what data does it contain? (Don't need every field, just the key ones)"
- "What triggers this event? What happens after it?"
- "How do these events flow together?"

Keep the conversation focused on:
- **Event names** — What are the main domain events? (past tense, like "MarketCreated", "BetPlaced", "OutcomeResolved")
- **Plain-language descriptions** — What does each event represent?
- **Event flows** — How do events trigger other events or relate to each other?
- **Event data** — What key information does each event carry?

**Important:**
- Events are named in past tense (e.g., "UserRegistered", "OrderPlaced", "PaymentProcessed")
- We're modeling what HAPPENED, not what exists
- No entities or aggregates - just events and their flows
- Keep it minimal and conceptual - detailed schemas come later

## Step 4: Present Draft and Refine

Once you have enough information, present a draft:

"Here's your event model:

**Domain Events:**

- **[Event1]** — [Description of what happened and what data it contains]
- **[Event2]** — [Description]

**Event Flows:**

- When [Event1] occurs, it triggers [Event2]
- [Event3] happens in response to [Event4]
- [Event5] and [Event6] represent a complete business process

Does this look right? Any adjustments?"

Iterate until the user is satisfied.

## Step 5: Create the File

Once approved, create the file at `/product/event-model/event-model.md` with this format:

```markdown
# Event Model

## Domain Events

### [EventName]
[Plain-language description of what this event represents, when it occurs, and what key data it contains.]

### [AnotherEvent]
[Plain-language description.]

[Add more events as needed]

## Event Flows

- When [Event1] occurs, it triggers [Event2]
- [Event3] happens in response to [Event4]
- [Event5] completes the [business process] flow
[Add more flows as needed]
```

**Important:** Keep descriptions minimal — focus on what each event represents and what happened, not every field it contains. Leave room for the implementation agent to extend the model.

## Step 6: Confirm Completion

Let the user know:

"I've created your event model at `/product/event-model/event-model.md`.

**Events defined:**
- [List events]

**Event Flows:**
- [List key flows]

This provides a shared vocabulary of domain events that will be used when generating sample data for your sections. When you run `/sample-data`, it will reference this model to ensure consistency.

Next step: Run `/design-tokens` to choose your color palette and typography."

## Important Notes

- Keep the event model **minimal** — event names, descriptions, and flows
- Do NOT define detailed schemas, field types, or validation rules
- Use plain language that a non-technical person could understand
- Events should be named in past tense (what HAPPENED)
- Event flows should describe how events trigger or relate to each other
- In DCB/event sourcing, there are NO aggregates or entities - only events
- The implementation agent will extend this with additional fields as needed
- Event names should be in PascalCase past tense (UserRegistered, MarketCreated, BetPlaced)

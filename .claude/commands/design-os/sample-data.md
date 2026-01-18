# Sample Data

You are helping the user create realistic sample data for a section of their product. This data will be used to populate screen designs. You will also generate TypeScript types based on the data structure.

## Step 1: Check Prerequisites

First, identify the target section and verify that `spec.md` exists for it.

Read `/product/product-roadmap.md` to get the list of available sections.

If there's only one section, auto-select it. If there are multiple sections, use the AskUserQuestion tool to ask which section the user wants to generate data for.

The section-id is the slug version of the section title:
- Lowercase
- Spaces become hyphens
- " & " becomes "-and-" (e.g., "Market Discovery & Trading" → "market-discovery-and-trading")
- Remove any other special characters

Then check if `product/sections/[section-id]/spec.md` exists. If it doesn't:

"I don't see a specification for **[Section Title]** yet. Please run `/shape-section` first to define the section's requirements, then come back to generate sample data."

Stop here if the spec doesn't exist.

## Step 2: Check for Global Event Model

Check if `/product/event-model/event-model.md` exists.

**If it exists:**
- Read the file to understand the global event definitions
- Event names in your sample data should reference the global event model
- Use the event descriptions and flows as a guide for the data structure

**If it doesn't exist:**
Show a warning but continue:

"Note: A global event model hasn't been defined yet. I'll create data structures based on the section spec, but for consistency across sections, consider running `/event-model` first."

## Step 3: Analyze the Specification

Read and analyze `product/sections/[section-id]/spec.md` to understand:

- What domain events are implied by the user flows?
- What data would result from these events (current state)?
- What sample values would be realistic and helpful for design?
- What actions can trigger new events? (These become callback props)

**If a global event model exists:** Cross-reference the spec with the event model. Use the same event names and ensure the data reflects the results of those events.

## Step 4: Present Data Structure

Present your proposed data structure to the user in human-friendly language. Non-technical users should understand how their data is being organized.

**If using global event model:**

"Based on the specification for **[Section Title]** and your global event model, here's how I'm organizing the data:

**Domain Events (from your event model):**

- **[Event1]** — [Description from event model]
- **[Event2]** — [Description from event model]

**Current State (result of events):**

[Explain what data exists as a result of these events being processed]

**Section-specific data:**

[Any additional data specific to this section's UI needs]

**What You Can Do:**

- Trigger actions that create new events (e.g., [Event3], [Event4])
- View the current state resulting from past events
- [Other key actions from the spec]

**Sample Data:**

I'll create [X] realistic records showing the current state after various events have occurred, with varied content to make your screen designs feel real.

Does this structure make sense? Any adjustments?"

**If no global event model:**

"Based on the specification for **[Section Title]**, here's how I'm proposing to organize your data:

**Current State:**

- **[State1]** — [One sentence explaining what this represents]
- **[State2]** — [One sentence explanation]

**Events That Create This State:**

[Explain what events would have occurred to create this state]

**What You Can Do:**

- View, edit, and delete [entities]
- [Other key actions from the spec]

**Sample Data:**

I'll create [X] realistic [Entity1] records with varied content to make your screen designs feel real.

Does this structure make sense for your product? Any adjustments?"

Use the AskUserQuestion tool if there are ambiguities about what data is needed.

## Step 5: Generate the Data File

Once the user approves the structure, create `product/sections/[section-id]/data.json` with:

- **A `_meta` section** - Human-readable descriptions of each data model and their relationships (displayed in the UI)
- **Realistic sample data** - Use believable names, dates, descriptions, etc.
- **Varied content** - Mix short and long text, different statuses, etc.
- **Edge cases** - Include at least one empty array, one long description, etc.
- **TypeScript-friendly structure** - Use consistent field names and types

### Required `_meta` Structure

Every data.json MUST include a `_meta` object at the top level with:

1. **`events`** - An object where each key is an event name and value is a plain-language description
2. **`currentState`** - An object where each key is a state/view name and value describes what it represents
3. **`eventFlows`** - An array of strings explaining how events flow and create state

Example structure:

```json
{
  "_meta": {
    "events": {
      "InvoiceCreated": "Happens when a new invoice is created for a client",
      "InvoiceSent": "Happens when an invoice is sent to the client",
      "PaymentReceived": "Happens when the client pays the invoice"
    },
    "currentState": {
      "invoices": "The current list of invoices, reflecting all InvoiceCreated, InvoiceSent, and PaymentReceived events"
    },
    "eventFlows": [
      "InvoiceCreated event creates a new invoice in draft status",
      "InvoiceSent event marks the invoice as sent and sets the sent date",
      "PaymentReceived event marks the invoice as paid and records the payment"
    ]
  },
  "invoices": [
    {
      "id": "inv-001",
      "invoiceNumber": "INV-2024-001",
      "clientName": "Acme Corp",
      "clientEmail": "billing@acme.com",
      "total": 1500.00,
      "status": "sent",
      "dueDate": "2024-02-15",
      "lineItems": [
        { "description": "Web Design", "quantity": 1, "rate": 1500.00 }
      ]
    }
  ]
}
```

The `_meta` descriptions should:
- Use plain, non-technical language
- Explain what each event represents and when it occurs
- Describe the current state as the result of events
- Explain how events flow and create state
- **Match the global event model descriptions if one exists**

The data should directly support the user flows and UI requirements in the spec.

## Step 6: Generate TypeScript Types

After creating data.json, generate `product/sections/[section-id]/types.ts` based on the data structure.

### Type Generation Rules

1. **Infer types from the sample data values:**
   - Strings → `string`
   - Numbers → `number`
   - Booleans → `boolean`
   - Arrays → `TypeName[]`
   - Objects → Create a named interface

2. **Use union types for status/enum fields:**

   - If a field like `status` has known values, use a union: `'draft' | 'sent' | 'paid' | 'overdue'`

   - Base this on the spec and the variety in sample data

3. **Create a Props interface for the main component:**
   - Include the data as a prop (e.g., `invoices: Invoice[]`)
   - Include optional callback props for each action (e.g., `onDelete?: (id: string) => void`)

4. **Use consistent event names:**
   - If a global event model exists, use the same event names
   - This ensures consistency across sections

Example types.ts:

```typescript
// =============================================================================
// Data Types
// =============================================================================

export interface LineItem {
  description: string
  quantity: number
  rate: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail: string
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: string
  lineItems: LineItem[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface InvoiceListProps {
  /** The list of invoices to display */
  invoices: Invoice[]
  /** Called when user wants to view an invoice's details */
  onView?: (id: string) => void
  /** Called when user wants to edit an invoice */
  onEdit?: (id: string) => void
  /** Called when user wants to delete an invoice */
  onDelete?: (id: string) => void
  /** Called when user wants to archive an invoice */
  onArchive?: (id: string) => void
  /** Called when user wants to create a new invoice */
  onCreate?: () => void
}
```

### Naming Conventions

- Use PascalCase for interface names: `Invoice`, `LineItem`, `InvoiceListProps`

- Use camelCase for property names: `clientName`, `dueDate`, `lineItems`

- Props interface should be named `[SectionName]Props` (e.g., `InvoiceListProps`)

- Add JSDoc comments for callback props to explain when they're called

- **Match event names from the global event model if one exists**

## Step 7: Confirm and Next Steps

Let the user know:

"I've created two files for **[Section Title]**:

1. `product/sections/[section-id]/data.json` - Sample data with [X] records

2. `product/sections/[section-id]/types.ts` - TypeScript interfaces for type safety

The types include:

- `[Entity]` - The main data type
- `[SectionName]Props` - Props interface for the component (includes callbacks for [list actions])

When you're ready, run `/design-screen` to create the screen design for this section."

## Important Notes

- Generate realistic, believable sample data - not "Lorem ipsum" or "Test 123"
- Include 5-10 sample records for main entities (enough to show a realistic list)
- Include edge cases: empty arrays, long text, different statuses
- Keep field names clear and TypeScript-friendly (camelCase)
- The data structure should directly map to the spec's user flows
- Always generate types.ts alongside data.json
- Callback props should cover all actions mentioned in the spec
- **Use event names from the global event model for consistency across sections**

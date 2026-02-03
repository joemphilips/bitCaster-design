# Section Implementation Prompt

Use this template to implement one section at a time. Fill in the variables below before pasting into your coding agent.

---

## Variables (Fill These In)

```
SECTION_NAME: [e.g., "Market Discovery & Trading"]
SECTION_ID: [e.g., "market-discovery-and-trading"]
NN: [e.g., "02" for the milestone number]
```

---

## Prompt Template

I need to implement the **[SECTION_NAME]** section for bitCaster, a Bitcoin-native prediction market platform.

### Context Files

Please read these files to understand the implementation requirements:

1. `product-plan/product-overview.md` — Overall product context
2. `product-plan/instructions/incremental/[NN]-[SECTION_ID].md` — Detailed implementation requirements for this section
3. `product-plan/sections/[SECTION_ID]/README.md` — Section overview and design intent
4. `product-plan/sections/[SECTION_ID]/types.ts` — TypeScript interfaces
5. `product-plan/sections/[SECTION_ID]/sample-data.json` — Sample data for development
6. `product-plan/sections/[SECTION_ID]/components/` — Reference component implementations

### Prerequisites

Ensure the following are already in place:
- Design tokens from `design-system/tokens.css`
- Application shell from `shell/components/`
- Routing configured for this section

### Implementation Approach

1. Review the reference components in `sections/[SECTION_ID]/components/`
2. Implement each component following the types and patterns
3. Wire up state management and callbacks
4. Apply styling using design tokens
5. Test with sample data

### Test-Driven Development

Before implementing, read `product-plan/sections/[SECTION_ID]/tests.md` for test requirements:
1. Write failing tests based on the test instructions
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

### Questions for Clarification

Before you begin:
1. Is there an existing component library I should extend?
2. Are there specific state management patterns already in use?
3. Should I create new API endpoints or use mocked data?

### Additional Notes

[Add any project-specific context here]

---

*After reviewing the files, please propose an implementation plan for this section.*

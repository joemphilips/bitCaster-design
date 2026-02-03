# One-Shot Implementation Prompt

Copy and paste the following into your coding agent to implement the entire bitCaster application.

---

## Context

I need to implement **bitCaster**, a Bitcoin-native prediction market platform. The complete design package is in the `product-plan/` folder.

## Instructions

Please read the following files to understand the project:

1. `product-plan/product-overview.md` — Product description and key features
2. `product-plan/instructions/one-shot-instructions.md` — All 5 milestones with detailed implementation requirements
3. `product-plan/design-system/` — Design tokens, colors, and typography
4. `product-plan/event-model/` — Domain events and data flows

## Implementation Approach

- Implement all 5 milestones in order: Foundation → Market Discovery → Market Creation → MyPage → Market Detail
- Use the provided components in `product-plan/shell/` and `product-plan/sections/` as reference implementations
- Follow the types defined in each section's `types.ts`
- Use sample data from `sample-data.json` files for development and testing
- Apply design tokens from `design-system/tokens.css`

## Technology Stack

- React with TypeScript
- Tailwind CSS with blue/amber/slate color scheme
- lucide-react for icons
- Support light and dark mode

## Questions for Clarification

Before you begin, please clarify:

1. **Authentication**: How should user authentication work? (Options: mock auth, OAuth provider, custom auth)
2. **Data persistence**: Where should data be stored? (Options: localStorage, mock API, real backend endpoint)
3. **Routing**: What routing library preference? (Options: react-router, Next.js app router, TanStack Router)
4. **State management**: Preference for global state? (Options: React Context, Zustand, Redux Toolkit)

## Additional Notes

[Add any project-specific context or constraints here]

---

*After clarifying the above, please propose an implementation plan before writing code.*

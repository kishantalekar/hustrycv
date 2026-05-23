# HustryCV — Phase 1: Foundation Refactor

> **Goal**: Fix critical bugs, refactor the Zustand store for performance, and build a scalable AI service layer. All workstreams are independent and can execute in parallel.

---

## Workstream 1: Critical Bug Fixes + Dead Code Purge

Fast, low-risk fixes that should ship immediately.

### [MODIFY] [PostHog.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/analytics/posthog/PostHog.ts)
- **Bug**: `disabled: !__DEV__` disables analytics in production (inverted logic)
- **Fix**: Change to `disabled: __DEV__`

### [MODIFY] [resume.types.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/types/common/resume.types.ts)
- **Bug**: Line 91 — `publications.type` is set to `'awards'` instead of `'publications'`
- **Fix**: Change to `type: 'publications'`

### [MODIFY] [urlUtils.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/urlUtils.ts)
- **Bug**: Test code (lines 14-33) runs at module level on every app start
- **Fix**: Remove the test code, keep only `extractDomain` function

### [DELETE] [resumeChatManager.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/resumeChatManager.ts)
- 127 lines of entirely commented-out code. Dead weight.

### [DELETE] [prompts.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/prompts.ts)
- Duplicate of `prompts/index.ts`. Need to verify no file imports from this path first.

### [DELETE] [social.types.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/types/common/social.types.ts)
- 11 lines of entirely commented-out code. Dead weight.

---

## Workstream 2: Zustand Store Refactor

High-impact performance refactor. Changes the `resumes` data structure from `Resume[]` to `Record<string, Resume>`, fixing the O(n) `.find()` on every selector call and eliminating unnecessary re-renders.

### [MODIFY] [useResumeStore.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/useResumeStore.ts)
Changes:
1. `resumes: Resume[]` → `resumes: Record<string, Resume>`
2. Remove `as any` cast on line 208
3. Remove `@ts-ignore` on line 169
4. Type the `set` function properly instead of `any`
5. Update `updateBasics` to use direct key access instead of `.map()`
6. Update `deleteSection` to use direct key access
7. Update `partialize` to serialize `resumes` Record

### [MODIFY] [resumeSlice.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/slices/resumeSlice.ts)
Changes:
1. `getActiveResume` → direct lookup: `state.resumes[state.activeResumeId]`
2. `addResume` → `{ ...state.resumes, [id]: newResume }`
3. `deleteResume` → `const { [id]: _, ...rest } = state.resumes`
4. `updateResumeTemplateId` → direct key access and spread
5. `updateMetadata` → direct key access and spread
6. Type `set` parameter properly

### [MODIFY] [createSectionSlice.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/management/createSectionSlice.ts)
Changes:
1. All `.map()` over `resumes` array → direct key access on `resumes` Record
2. `set: any` → proper Zustand type
3. Remove `as any` casts on `resume.sections[sectionKey]`

### [MODIFY] [customSectionSlice.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/management/customSectionSlice.ts)
Same pattern as createSectionSlice — update from `.map()` to direct key access.

### [MODIFY] [resumeSelectors.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/selectors/resumeSelectors.ts)
Changes:
1. `selectActiveResume` → `state.resumes[state.activeResumeId]` (O(1), referentially stable)
2. All derived selectors remain the same pattern but now benefit from stable references

### Consumer updates (15 files)
All files that use `useResumeStore` with selectors or `getActiveResume()` need **zero changes** — the selector API and action API remain identical. The only change is internal data structure.

**Exception**: [Dashboard.tsx](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/screens/Dashboard/Dashboard.tsx) likely iterates `state.resumes` as an array for the resume list. This needs to change to `Object.values(state.resumes)`.

---

## Workstream 3: AI Service Layer

Replaces the scattered AI call pattern with a centralized, robust service.

### [NEW] [AIService.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/services/ai/AIService.ts)
New centralized AI service class with:
- Single `GoogleGenAI` instance (eliminates duplicate in chatParser.ts)
- `execute<T>(request)` entry point for all AI calls
- Request queue with priority levels
- Retry with exponential backoff (3 attempts)
- Timeout handling (15s default)
- AbortController integration for cancellation
- In-memory response cache with TTL
- Usage tracking (call count, tokens, errors) for future analytics/monetization
- Sentry error reporting

### [NEW] [types.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/services/ai/types.ts)
Types for the AI service:
- `AIRequest<T>` — request configuration
- `AIResult<T>` — standardized result wrapper
- `AIRequestType` — enum of all AI operations
- `AIServiceConfig` — service configuration

### [NEW] [index.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/services/ai/index.ts)
Barrel export for the AI service.

### [MODIFY] [aiClient.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/aiClient.ts)
- Refactor to use the new `AIService` internally
- Keep `callAIText` and `callAIJson` as thin wrappers for backward compatibility
- `fillPrompt` stays as-is (pure utility)

### [MODIFY] [chatParser.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/chatParser.ts)
- Remove duplicate `genAIInstance` singleton (lines 7-16)
- Use `AIService` for API calls instead of direct `GoogleGenAI` usage

### [NEW] [useAIFeature.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/hooks/useAIFeature.ts)
React hook that wraps any AI call with standard UX patterns:
- Loading state management
- Error handling with user-friendly messages
- Retry UI
- Cancellation on unmount
- Analytics tracking

---

## Workstream 4: Store Type Safety

Fixing all `set: any` types across the store layer.

### [MODIFY] All slice files in `src/store/management/`
For each of the 10 slice files (`workSlice.ts`, `educationSlice.ts`, `skillsSlice.ts`, `projectsSlice.ts`, `certificationSlice.ts`, `createHobbiesSlice.ts`, `strengthSlice.ts`, `referenceSlice.ts`, `languageSlice.ts`):
- Import proper Zustand `set` type
- Replace `set: any` with typed setter

> [!IMPORTANT]
> Workstreams 2 and 4 overlap on the store files. They should be executed by the same agent to avoid conflicts. The plan merges them into a single agent.

---

## Verification Plan

### Automated
1. `yarn ts` — TypeScript compilation must pass with zero errors
2. `yarn lint` — ESLint must pass
3. `yarn android` — App must build and run successfully

### Manual
- Open the app, verify dashboard loads
- Create a new resume, verify it persists
- Edit sections, verify data saves
- Verify AI features (bullet generation, summary) still work
- Verify preview renders correctly

---

## Execution Strategy

Three parallel agents:

| Agent | Workstreams | Files Touched |
|-------|-------------|---------------|
| **Agent 1: Bug Fixer** | WS1 (bugs + dead code) | PostHog.ts, resume.types.ts, urlUtils.ts, delete 3 files |
| **Agent 2: Store Refactor** | WS2 + WS4 (store + types) | useResumeStore.ts, resumeSlice.ts, createSectionSlice.ts, customSectionSlice.ts, resumeSelectors.ts, all management slices, Dashboard.tsx |
| **Agent 3: AI Service** | WS3 (AI layer) | New: services/ai/*, hooks/useAIFeature.ts. Modified: aiClient.ts, chatParser.ts |

No file conflicts between agents. All can run simultaneously.

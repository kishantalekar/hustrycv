# HustryCV — Deep Architectural Review

> **Reviewer perspective**: Senior React Native architect, AI product engineer, and UX strategist reviewing a pre-launch, solo-developer codebase before scaling.

> [!IMPORTANT]
> **Your profile**: Pre-launch, solo dev, Android-primary, no backend, no auth, Gemini API key shipped in bundle, all data local, wants best-in-class AI experience, resume-only focus.

---

## PART 1 — ARCHITECTURE AUDIT

### 1.1 Is the current AI utility layer scalable?

**Verdict: No — it has 3 structural problems that will compound.**

#### Problem A: Duplicate AI Singletons

[aiClient.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/aiClient.ts) creates a lazy `_genAI` singleton. But [chatParser.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/chatParser.ts) creates its *own* lazy `genAIInstance`. Two different entry points to the same API with no shared configuration, no shared rate limiting, and no shared error handling.

**Future problem**: When you add 7 more AI features (inline analysis, floating toolbar, ghost text, ATS scoring, coach, JD matching, cover letter), each feature developer (even future-you) will be tempted to create their own singleton. You'll end up with N separate API clients with no centralized:
- Rate limiting
- Token budgeting
- Request queuing
- Error recovery
- Usage analytics

**Redesign path**:
```typescript
// src/services/ai/AIService.ts
class AIService {
  private client: GoogleGenAI;
  private requestQueue: PriorityQueue<AIRequest>;
  private tokenBudget: TokenBudget;
  
  // Single entry point for ALL AI calls
  async execute<T>(request: AIRequest<T>): Promise<AIResult<T>> {
    await this.tokenBudget.reserve(request.estimatedTokens);
    await this.requestQueue.enqueue(request);
    
    try {
      const result = await this.client.generateContent(request.prompt);
      this.analytics.track(request.type, result.usage);
      return this.parse(result, request.parser);
    } catch (e) {
      return this.handleError(e, request);
    }
  }
}

// Singleton exported
export const aiService = new AIService();
```

**Migration difficulty**: Medium. You need to:
1. Create `AIService` class with queue + budget
2. Refactor `bulletPointAI.ts`, `summaryAI.ts`, `jobMatchAI.ts`, `resumeParser.ts`, `chatParser.ts` to call `aiService.execute()` instead of raw `callAIText()`/`callAIJson()`
3. Delete `chatParser.ts`'s duplicate singleton
4. Delete [prompts.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/prompts.ts) (duplicate of [prompts/index.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/prompts/index.ts))

#### Problem B: No Error Recovery Strategy

`callAIText` and `callAIJson` in [aiClient.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/aiClient.ts) have zero retry logic, zero timeout handling, and zero graceful degradation. The app crashes silently or shows generic errors on:
- Network timeout (common on mobile)
- Gemini rate limiting (429)
- Malformed JSON responses (common with LLMs)
- Token limit exceeded

Meanwhile, [resumeUpload.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/resumeUpload.ts) has `uploadWithRetry()` with 3 retries — but this pattern isn't used for AI calls.

**Redesign path**: Add to `AIService`:
```typescript
private async executeWithRetry<T>(
  request: AIRequest<T>, 
  retries = 2
): Promise<AIResult<T>> {
  for (let i = 0; i <= retries; i++) {
    try {
      const result = await Promise.race([
        this.rawExecute(request),
        this.timeout(request.timeoutMs ?? 15000),
      ]);
      return result;
    } catch (e) {
      if (i === retries || !this.isRetryable(e)) throw e;
      await this.backoff(i);
    }
  }
}
```

#### Problem C: No Request Cancellation

When a user navigates away from a screen while an AI call is in-flight, the call completes, the response is discarded, and tokens are wasted. With 7 AI features running concurrently, this becomes expensive.

**Solution**: Use `AbortController` in every AI call, tied to React component lifecycle.

---

### 1.2 Is prompt handling properly abstracted?

**Verdict: Partially. The `fillPrompt` template system is clean, but prompts are not versioned, not testable, and not tunable.**

The [prompts/index.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/prompts/index.ts) pattern of `{{PLACEHOLDER}}` substitution works fine for 4-5 prompts. At 15+ prompts (your planned feature set), you'll have:
- No way to A/B test prompt variants
- No way to version prompts independently of app releases
- No prompt performance tracking (which prompt generates better results?)
- No way to adjust prompts without shipping an app update

**Redesign path** (for when you add a backend):
```typescript
// Short-term: local prompt registry with version tracking
const promptRegistry = {
  'bullet-point-v2': { template: '...', model: 'gemini-2.0-flash', temperature: 0.7 },
  'summary-v1': { template: '...', model: 'gemini-2.0-flash', temperature: 0.5 },
};

// Long-term: server-delivered prompt configs
// Fetch latest prompt configs on app start, cache locally
```

**Current dead code to clean up**:
- [prompts.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/prompts.ts) — Duplicates `RESUME_PARSE_PROMPT`. Delete this file.
- [resumeChatManager.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/resumeChatManager.ts) — 127 lines of commented-out code. Delete entirely.

---

### 1.3 Hidden coupling problems

#### Coupling A: Store ↔ AI Layer

[summaryAI.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/summaryAI.ts) has `extractSummaryInput(resume)` which directly understands the `Resume` type shape. Similarly, [jobMatchAI.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/jobMatchAI.ts) takes a full `Resume` object.

This means:
- Every change to the `Resume` type requires checking all AI modules
- AI modules can't be tested without constructing full `Resume` objects
- No clean input/output contract between the UI layer and the AI layer

**Fix**: Each AI module should define its own input interface that's a minimal subset of `Resume`:
```typescript
// bulletPointAI.ts
interface BulletPointInput {
  jobTitle: string;
  company: string;
  existingBullets?: string[];
  keywords?: string[];
}

// The SCREEN maps Resume → BulletPointInput
// The AI module never sees Resume
```

#### Coupling B: Template Engine ↔ Global Types

[TemplateComposer.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/templates/engine/TemplateComposer.ts) directly reads the global `Resume` type, including `Section<T>`, `WorkItem`, etc. But the template engine also defines its own types in [templateTypes.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/templates/engine/templateTypes.ts). The boundary is blurred — is the template engine a standalone rendering library, or is it tightly coupled to the app's data model?

**Risk**: If you ever want to render resumes server-side (for thumbnails, shareable links, or web export), you'd need to port the entire `Resume` type system along with it.

#### Coupling C: Navigation ↔ Feature Flags

[FEATURE_FLAGS.ENABLE_NEW_EDITOR_NAV](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/constants/featureFlags.ts) controls whether the editor uses a slide-out preview panel. But the flag is a compile-time constant, not runtime-toggleable. This means you can't:
- A/B test the new editor nav
- Gradually roll it out
- Disable it remotely if it's buggy

---

### 1.4 What becomes difficult to maintain in 6-12 months?

| Component | Current State | 6-Month Problem | Fix |
|-----------|--------------|-----------------|-----|
| [templateDefinitions.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/templates/engine/templateDefinitions.ts) | 749 lines, 27 templates in one array | Adding template #35+ makes this file unnavigable. No visual preview of templates during development | Split into `templates/definitions/professional/`, `templates/definitions/modern/` etc. One file per template |
| [useResumeStore.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/useResumeStore.ts) | ~220 lines, `as any` casts, `@ts-ignore` | Every new section type requires touching this file + creating a new slice + updating types + updating template renderers | Extract a `SectionRegistry` that auto-discovers section configs |
| [global.d.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/types/global.d.ts) | 194 lines of global declarations | Global types pollute the namespace. No import tracking. Hard to find where types are used | Move to exported interfaces with explicit imports |
| AI feature modules | 5 separate files with no shared patterns | At 12 AI features, you'll have massive code duplication in error handling, loading states, analytics | Create `useAIFeature()` hook that wraps all AI calls with standard UX patterns |

---

### 1.5 Anti-patterns in the Zustand structure

#### Anti-pattern 1: `set: any` in slice factories

In [createSectionSlice.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/management/createSectionSlice.ts) and every slice file:
```typescript
export const createWorkSlice = (set: any) => ...
```

The `any` type means:
- Zero type checking on state mutations
- You can accidentally set wrong state keys with no compiler warning
- Refactoring the store shape won't surface errors

**Fix**:
```typescript
import { StoreApi } from 'zustand';
type ResumeStoreSetter = StoreApi<ResumeStoreState>['setState'];

export const createWorkSlice = (set: ResumeStoreSetter) => ({
  // Now TypeScript validates every set() call
});
```

#### Anti-pattern 2: `as any` and `@ts-ignore` in store composition

[useResumeStore.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/useResumeStore.ts) line 208 uses `as any` when spreading slices, and line 169 uses `@ts-ignore` in `deleteSection`. These are type-safety escape hatches that hide real bugs.

#### Anti-pattern 3: No selector memoization

[resumeSelectors.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/selectors/resumeSelectors.ts) defines 10 selectors, but `selectActiveResume` uses `.find()`:
```typescript
export const selectActiveResume = (state) => 
  state.resumes.find(r => r.metadata.id === state.activeResumeId);
```

`.find()` returns a new reference every call (even if the same resume is found), which means **every component using any selector re-renders on any store change**, because the intermediate `selectActiveResume` always returns a "new" object reference from React's perspective.

**Fix**: Use a Map instead of an Array for `resumes`:
```typescript
// Instead of: resumes: Resume[]
// Use:        resumes: Record<string, Resume>

// Selector becomes O(1) and referentially stable:
export const selectActiveResume = (state) => 
  state.resumes[state.activeResumeId];
```

This is a **high-impact, medium-effort** refactor that will dramatically reduce unnecessary re-renders across the entire app.

---

### 1.6 Template engine flexibility

**Verdict: The data-driven refactor was excellent engineering. But it has limits.**

The current architecture in [TemplateComposer.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/templates/engine/TemplateComposer.ts) supports:
- ✅ Single-column layouts
- ✅ Two-column / sidebar layouts
- ✅ 27 template themes via config objects
- ✅ Google Fonts integration
- ✅ Section reordering via `sectionOrder`

But it will struggle with:
- ❌ **Asymmetric layouts** (e.g., timeline-style work history, or skills as tags in a cloud)
- ❌ **Per-section styling overrides** (e.g., different background colors for different sections in the same template)
- ❌ **Interactive template previews** (thumbnails rendered without full WebView)
- ❌ **Custom CSS injection** by users (for power-user customization)

**For now**: The engine is more than sufficient for 27-50 templates. Don't over-engineer it. The biggest improvement would be adding **template thumbnail generation** — currently you likely show the same preview for all templates until the user applies one, which is a poor selection UX.

---

### 1.7 WebView sustainability

**Verdict: Sustainable for rendering and export. Problematic for live editing.**

WebView is the correct choice for:
- ✅ Resume preview (static HTML rendering)
- ✅ PDF export (HTML-to-PDF is the cleanest approach)
- ✅ Complex CSS layouts (grid, flexbox, print media queries)

WebView is the wrong choice for:
- ❌ Real-time editing feedback (communication lag between RN bridge and WebView)
- ❌ Interactive template selection (spinning up 27 WebViews for thumbnails is expensive)

**The debounce in [useResumeHTML.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/hooks/useResumeHTML.ts)** (500ms default) papers over this — it means preview updates are always at least 500ms behind edits. For "AI-native" editing, this latency will feel sluggish.

**Long-term path**: Keep WebView for preview/export. For template thumbnails, generate them server-side once per template (or capture screenshots on first render and cache them).

---

### 1.8 Modules that should become plugins

| Module | Current | Should Become |
|--------|---------|---------------|
| Each AI feature (bullet, summary, job match, etc.) | Standalone files in `utils/ai/` | Plugin-style modules with a standard interface: `{ id, name, execute, getUI }` |
| Template definitions | One massive array | Individually loadable template packs |
| Section types (work, education, etc.) | Hardcoded in store + types + templates | Declarative section definitions that auto-register in store, forms, and templates |

---

## PART 2 — AI FEATURE STRATEGY

### 2A. Inline Grammarly-Style Analysis

#### Can TipTap/10tap support this?

**Yes, with significant effort.** TipTap (the web editor underneath 10tap) supports [Decorations](https://tiptap.dev/docs/editor/api/decorations) — inline markers that render underlines, highlights, or inline widgets. However, `@10play/tentap-editor` is a **React Native bridge** to TipTap running inside a WebView. This means:

1. **TipTap decorations work** inside the WebView (the editor itself)
2. **But you control them from React Native** via the bridge, which adds latency
3. **Custom extensions** need to be injected into the WebView's TipTap instance

**Architecture recommendation**:

```
┌─────────────────────────────────────────┐
│          React Native Layer              │
│                                          │
│  ┌──────────────┐  ┌────────────────┐   │
│  │ AnalysisHook │  │ AnalysisStore  │   │
│  │ (debounced)  │→ │ (issues array) │   │
│  └──────┬───────┘  └───────┬────────┘   │
│         │                  │             │
│         ▼                  ▼             │
│  ┌─────────────────────────────────┐    │
│  │  Bridge: postMessage to WebView │    │
│  └─────────────┬───────────────────┘    │
│                │                         │
├────────────────┼─────────────────────────┤
│  WebView       ▼                         │
│  ┌─────────────────────────────────┐    │
│  │ TipTap + Custom Extension       │    │
│  │ • Receives issues via message   │    │
│  │ • Applies Decoration marks      │    │
│  │ • Renders underlines + tooltips │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

**Three tiers of analysis** (critical distinction):

| Tier | Method | Latency | Cost | Examples |
|------|--------|---------|------|----------|
| **Tier 1: Rule-based** | Regex + heuristics, runs on-device | <50ms | $0 | Passive voice detection, weak verb detection, sentence length, "responsible for" detection, bullet count per role |
| **Tier 2: Keyword-based** | Pre-built word lists, runs on-device | <100ms | $0 | Action verb coaching (replace "helped" → "orchestrated"), filler word detection ("various", "multiple"), quantification prompts (detect bullets without numbers) |
| **Tier 3: LLM-based** | Gemini API call | 2-5s | ~$0.001/call | Vague impact detection, industry-specific jargon scoring, suggestion rewrites, tone analysis |

**Implementation strategy**:
1. **Start with Tier 1 + 2 only** — these are free, fast, and run offline. This gives you 80% of the Grammarly experience at 0% of the cost.
2. Tier 3 should be **on-demand only** (user taps an underlined phrase → "Get AI suggestion")
3. Never run Tier 3 analysis on every keystroke — it's cost-prohibitive and slow

**Specific rule-based checks to implement**:
```typescript
const resumeRules: AnalysisRule[] = [
  {
    id: 'passive-voice',
    regex: /\b(was|were|been|being|is|are|am)\s+(\w+ed|built|made|done)\b/gi,
    severity: 'warning',
    message: 'Passive voice detected. Use active voice for stronger impact.',
    suggestion: (match) => `Consider: "${suggestActiveVoice(match)}"`,
  },
  {
    id: 'weak-start',
    regex: /^(Responsible for|Helped|Assisted|Participated in|Worked on)/i,
    severity: 'error',
    message: 'Weak bullet point opening. Start with a strong action verb.',
    suggestions: ['Led', 'Designed', 'Implemented', 'Orchestrated', 'Delivered'],
  },
  {
    id: 'no-quantification',
    regex: /^(?!.*\d).*$/,  // No numbers in the bullet
    severity: 'info',
    message: 'This bullet has no quantified impact. Add metrics where possible.',
    suggestion: 'Try: "Increased X by Y%" or "Managed team of N"',
  },
  {
    id: 'too-long',
    test: (text) => text.length > 150,
    severity: 'warning',
    message: 'This bullet is too long. ATS scanners and recruiters prefer concise bullets.',
  },
];
```

**Performance risk**: Running analysis on every keystroke in TipTap, even rule-based, can cause jank. **Debounce at 300ms** and run analysis in a separate thread if possible (Web Worker inside the WebView, or `InteractionManager.runAfterInteractions()` in RN).

---

### 2B. Floating AI Toolbar (Quillbot-Style)

#### UX Design

When the user selects text in the editor:
1. A floating toolbar appears above the selection (like iOS copy/paste menu, but custom)
2. Actions: **Shorten** | **Expand** | **Quantify** | **Rewrite** | **ATS Optimize**
3. Tapping an action shows a loading state in-place, then replaces the selected text

**Critical UX decision**: Transformations should be **blocking with preview**, not optimistic.
- Show a bottom sheet with: Original → AI Result → [Accept] [Reject] [Try Again]
- Do NOT replace text automatically — users need to see the change before it's applied
- This is how Quillbot, Grammarly, and every successful writing tool handles it

#### Architecture

```typescript
// src/hooks/useAITransform.ts
interface TransformRequest {
  selectedText: string;
  action: 'shorten' | 'expand' | 'quantify' | 'rewrite' | 'ats-optimize';
  context: {
    sectionType: string;       // 'work', 'summary', etc.
    jobTitle?: string;
    targetKeywords?: string[];  // For ATS optimize
  };
}

interface TransformResult {
  original: string;
  transformed: string;
  explanation: string;  // Why this change was made
  confidence: number;
}

function useAITransform() {
  const [state, setState] = useState<'idle' | 'loading' | 'preview'>('idle');
  const [result, setResult] = useState<TransformResult | null>(null);

  const transform = async (request: TransformRequest) => {
    setState('loading');
    const result = await aiService.execute({
      type: 'text-transform',
      prompt: buildTransformPrompt(request),
      parser: parseTransformResult,
    });
    setResult(result);
    setState('preview');
  };

  const accept = () => {
    // Apply transformed text to editor
    editor.chain().focus().deleteSelection().insertContent(result.transformed).run();
    setState('idle');
  };

  return { state, result, transform, accept, reject: () => setState('idle') };
}
```

#### Prompt Structure

```typescript
const TRANSFORM_PROMPTS = {
  shorten: `Shorten the following resume text while preserving key achievements and metrics.
Original: "{{TEXT}}"
Context: This is from the {{SECTION_TYPE}} section.
Rules:
- Keep all numbers and metrics
- Maintain professional tone
- Reduce by 30-50%
- Return only the shortened text`,

  quantify: `Add specific metrics and quantification to this resume bullet point.
Original: "{{TEXT}}"
Context: Role: {{JOB_TITLE}}
Rules:
- Add realistic but impressive metrics
- Use formats like: X%, $XM, Xh saved, X team members
- Don't fabricate specific company data
- Return only the improved text`,
};
```

#### Integration with 10tap

The main challenge is **detecting text selection** in the WebView-based editor and surfacing it to React Native. 10tap's `EditorBridge` should expose selection events. If it doesn't natively, you'll need a custom TipTap extension:

```typescript
// Custom TipTap extension (runs in WebView)
const SelectionMenu = Extension.create({
  name: 'selectionMenu',
  onSelectionUpdate({ editor }) {
    const { from, to } = editor.state.selection;
    if (from !== to) {
      const text = editor.state.doc.textBetween(from, to);
      // Post to React Native
      window.ReactNativeWebView?.postMessage(JSON.stringify({
        type: 'selection',
        text,
        from,
        to,
      }));
    }
  },
});
```

---

### 2C. Ghost Text Completion (Copilot-Style)

#### Viability Assessment

**Verdict: Marginally viable on mobile. Not recommended as a launch feature.**

| Factor | Assessment |
|--------|------------|
| **Latency** | Gemini `2.0-flash` returns in 1-3s. For ghost text to feel natural, you need <500ms. This is 2-6x too slow for real-time completion. |
| **Streaming** | React Native doesn't support `ReadableStream` natively. You'd need WebSocket or SSE via a backend proxy. Without a backend, streaming is not viable client-side. |
| **Debounce** | You'd debounce at 500ms+ after the user stops typing. Total latency: 500ms (debounce) + 1500ms (API) = 2s minimum. Too slow for "ghost text" but acceptable for a "suggestion chip" UI. |
| **Token cost** | Every pause-in-typing triggers a completion call. At ~100 pauses per session, that's ~100 API calls per resume. At $0.001/call, that's $0.10/resume. Fine for premium, expensive for free tier. |
| **Hallucination** | Ghost text will suggest company names, project names, and metrics the user never provided. This is dangerous for resumes — factual accuracy is critical. |

**Alternative approach**: Instead of ghost text, implement **"AI Suggestion Chips"**:
- After the user finishes a bullet point and hits Enter
- Show 2-3 clickable suggestion chips below the cursor
- e.g., `"Increased team productivity by..."` | `"Reduced operational costs..."` | `"Implemented automated testing..."`
- Tapping a chip inserts it as a starting point

This is:
- Lower latency requirement (1-2s is acceptable because it appears after the user stops)
- Lower hallucination risk (users consciously choose to insert)
- Much cheaper (1 call per bullet, not 100 per session)
- Better mobile UX (chips are tappable, ghost text is hard to accept on mobile)

```typescript
// src/hooks/useAISuggestions.ts
function useAISuggestions(editor: EditorBridge) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  useEffect(() => {
    const onNewLine = debounce(async (context: EditorContext) => {
      if (context.lastBullet && context.sectionType === 'work') {
        const chips = await aiService.execute({
          type: 'bullet-continuation',
          prompt: buildContinuationPrompt(context),
          parser: parseSuggestionChips,
        });
        setSuggestions(chips);
      }
    }, 800);

    editor.on('newline', onNewLine);
    return () => editor.off('newline', onNewLine);
  }, [editor]);

  return { suggestions, clearSuggestions: () => setSuggestions([]) };
}
```

---

### 2D. Real-Time ATS Scoring

#### What can be rule-based (do this first)

1. **Keyword density**: Count occurrences of target keywords in the resume. No API call needed.
2. **Section presence scoring**: Does the resume have a summary? Skills? Work experience? Quantified bullets?
3. **Formatting checks**: Are bullet points used? Is there excessive formatting? Are there URL links?
4. **Length checks**: Is the resume too short (<300 words) or too long (>1000 words for 1 page)?

You already have [resumeCompleteness.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/resumeCompleteness.ts) which does offline scoring. **Extend this** — don't create a separate system.

```typescript
// Extend CompletenessResult with ATS-specific metrics
interface ATSScore extends CompletenessResult {
  keywordMatch: {
    found: string[];
    missing: string[];
    density: number;
    score: number;  // 0-100
  };
  formatting: {
    hasBulletPoints: boolean;
    hasQuantifiedBullets: number;
    readabilityScore: number;
  };
  overallATSScore: number;  // Weighted composite
}
```

#### What requires embeddings (defer this)

- **Semantic keyword matching**: e.g., "project management" should match "led cross-functional initiatives" even though the words don't overlap.
- **Job description → resume alignment**: Measuring how well the resume's content aligns with a JD beyond exact keyword matching.

This requires either:
- A backend with an embedding model (cheaper per-call than LLM)
- Or a significant client-side model (not viable on mobile)

**Recommendation**: Skip embeddings for now. Exact keyword matching gets you 70% of the value at 0% of the cost. Add semantic matching when you have a backend.

#### What should NOT be real-time

- **Full LLM-based ATS analysis** (current [jobMatchAI.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/jobMatchAI.ts)) — this should be **on-demand only** (user taps "Analyze ATS Score")
- **Rewriting suggestions** — trigger only when user requests them
- **Industry-specific scoring** — too expensive for real-time

**Recommended UX**: Show a persistent ATS score badge (rule-based, updates in real-time) in the editor toolbar. Tapping it opens a detailed analysis (LLM-powered, on-demand).

---

## PART 3 — FEATURE GAP ANALYSIS

### Top 15 Missing Features

| Rank | Feature | User Impact | Engineering Complexity | Monetization | Free/Premium |
|------|---------|-------------|----------------------|--------------|-------------|
| 1 | **AI Resume Coach (Guided Interview)** | 🔴 Critical | Medium | 🔴 High | Free (drives activation) |
| 2 | **Job Description Paste → Auto-Tailor** | 🔴 Critical | Low (you have `jobMatchAI.ts`) | 🔴 High | Premium |
| 3 | **Inline Writing Analysis (Tier 1+2)** | 🔴 Critical | Medium | 🟡 Medium | Free (differentiator) |
| 4 | **Floating AI Toolbar (Selection Actions)** | 🟡 High | Medium | 🔴 High | Premium |
| 5 | **Multiple Resume Versions per Job** | 🟡 High | Low | 🟡 Medium | Free (2 versions) / Premium (unlimited) |
| 6 | **Resume Score Dashboard** | 🟡 High | Low | 🟡 Medium | Free |
| 7 | **Template Thumbnail Previews** | 🟡 High | Medium | Low | Free |
| 8 | **AI Cover Letter Generation** | 🟡 High | Medium | 🔴 High | Premium |
| 9 | **Export Formats (DOCX, plain text)** | 🟡 High | Medium | 🟡 Medium | Premium |
| 10 | **Cloud Backup / Restore** | 🟡 High | High (needs backend) | 🟡 Medium | Premium |
| 11 | **Resume Sharing (Link / QR)** | 🟡 Medium | High (needs backend) | 🟡 Medium | Premium |
| 12 | **Suggestion Chips (After Bullet)** | 🟡 Medium | Medium | 🔴 High | Premium |
| 13 | **Import from LinkedIn Profile** | 🟡 Medium | High (scraping is fragile) | 🟡 Medium | Premium |
| 14 | **Undo/Redo History with AI Changes** | 🟡 Medium | Medium | Low | Free |
| 15 | **AI Keyword Optimizer for Specific Roles** | 🟡 Medium | Low | 🔴 High | Premium |

---

### Detailed Breakdown of Top 5

#### #1. AI Resume Coach (Guided Interview)

**Why users care**: The #1 problem with resume builders is the **blank page problem**. Users open the app and stare at empty fields. An AI coach that interviews them ("What was your biggest achievement at Company X?") and generates resume content from answers is the most impactful feature you can build.

**Implementation strategy**:
- Chat-based UI (you already have [AIChat/](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/screens/AIChat/) scaffolding)
- Section-by-section flow: Start with basics → work experience → education → skills
- For each work experience: Ask 3-4 questions, generate bullets from answers
- Use [chatParser.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/chatParser.ts) patterns (it already has section-specific prompts)

**Affected files**: `screens/AIChat/`, `utils/ai/chatParser.ts`, `store/useResumeStore.ts` (to populate sections from chat output)

**AI cost**: ~5-8 API calls per resume build = ~$0.005-0.008 per resume. Very affordable.

**Verdict**: This should be your #1 feature. It transforms the app from "fill in forms" to "AI builds your resume through conversation." Make it free — it's your activation driver.

#### #2. Job Description Paste → Auto-Tailor

**Why users care**: Users apply to dozens of jobs. Tailoring a resume for each is exhausting. Paste a JD → get a tailored version is the killer feature of Rezi and Teal.

**Implementation strategy**: You already have [jobMatchAI.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/jobMatchAI.ts) with `tailorResumeForJob()`. The missing piece is:
1. A "Tailor for Job" screen where users paste a JD
2. Auto-generate a **new resume copy** with tailored bullets and summary
3. Show a diff view: original vs tailored, with keyword highlighting

**Affected files**: New screen `screens/TailorResume/` (partially exists), `utils/ai/jobMatchAI.ts`, `store/useResumeStore.ts` (clone resume)

**AI cost**: 1 API call per tailoring = ~$0.002. Make this premium — users will pay for it.

#### #3. Inline Writing Analysis (Rule-Based)

**Why users care**: Real-time feedback while writing makes users feel guided, not alone. It's the difference between a text editor and a writing assistant.

**Implementation strategy**: See Section 2A above. Start with Tier 1+2 rule-based checks only.

**Affected files**: New `utils/analysis/resumeRules.ts`, new TipTap extension, [RichTextEditor component](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/components/RichTextEditor/)

**AI cost**: $0 (all rule-based)

**Verdict**: Make this free. It's your core differentiator — "the Grammarly for resumes."

#### #4. Floating AI Toolbar

See Section 2B above.

**AI cost**: ~$0.001 per transformation. Premium-worthy because each action is a deliberate AI call.

#### #5. Multiple Resume Versions per Job

**Why users care**: Power users have 3-5 resume versions targeted at different roles. Currently, [useResumeStore](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/store/useResumeStore.ts) supports multiple resumes, but there's no concept of "versions" or "variants" of the same base resume.

**Implementation strategy**:
- Add `parentId?: string` to `Resume.metadata`
- Add a "Duplicate & Tailor" action on each resume
- Show grouped resumes in the dashboard (parent + variants)

**Affected files**: `types/global.d.ts` (add `parentId`), `store/slices/resumeSlice.ts` (add `duplicateResume()`), `screens/Dashboard/` (grouped UI)

**AI cost**: $0 (organizational feature, no AI needed)

---

## PART 4 — UX REVIEW

### What Feels Outdated

1. **Form-first editing**: The primary editing experience is filling in forms (Personal Info, Work Experience, Education...). This is the 2015 resume builder pattern. Modern users expect to see their resume while editing, not a form that generates a resume they can preview later.

   **Fix**: Implement a **split-pane editor** on tablets and a **swipe-to-preview** on phones. The [FEATURE_FLAGS.ENABLE_NEW_EDITOR_NAV](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/constants/featureFlags.ts) suggests you're already exploring this. Push further — the preview should be visible at all times, updating live.

2. **AI as buttons, not as ambient intelligence**: Currently, AI features are explicit actions ("Generate Bullet Points", "Generate Summary"). This is "AI bolted on", not "AI-native." In an AI-native experience, AI is always working in the background — analyzing, suggesting, coaching — without the user having to invoke it.

3. **Template selection as a separate step**: Users should see their actual resume data rendered in different templates during selection, not generic previews. This requires template thumbnails (see Feature #7 above).

### What Feels Modern

1. **The template engine architecture** — the data-driven approach with 27 templates is genuinely impressive for a solo dev project. This is production-grade engineering.

2. **Resume completeness scoring** in [resumeCompleteness.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/resumeCompleteness.ts) — offline, instant, weighted by section importance. This is smart product thinking.

3. **Zustand with factory pattern** — the `createSectionSlice<T>` pattern in the store is clean and avoids boilerplate.

### What Feels Enterprise

1. **Sentry integration** — error tracking from day one is unusual for a solo project. Shows maturity.
2. **PostHog analytics** — (though it's currently broken in production — see bugs below)
3. **Storybook integration** — component-driven development
4. **Feature flags** — even if they're compile-time constants, the pattern is there

### AI Discoverability Problem

Users won't discover your AI features unless you solve these UX issues:

1. **AI features are buried in tabs**: The "Improve" tab in the ResumeEditor is where AI lives. But users spend 90% of their time in the "Form" tab. AI should be **where the user is typing**, not in a separate tab.

2. **No progressive disclosure**: A first-time user sees the same UI as a power user. There should be:
   - Contextual AI hints ("✨ AI can improve this bullet point")
   - First-time tooltips on AI features
   - A "tour" of AI capabilities on first resume creation

3. **No feedback loop**: After AI generates a bullet point or summary, there's no way for the user to say "this is bad, try again" or "I like this but change X." The interaction is one-shot: generate → accept or ignore.

### Mobile Editing Ergonomics

1. **Keyboard covers input fields**: On Android, the keyboard often covers the bottom of the screen. Your form inputs may be partially hidden. Are you using `KeyboardAvoidingView` or `KeyboardAwareScrollView` consistently?

2. **Rich text editing on mobile is painful**: The 10tap editor is the best option in React Native, but mobile users struggle with:
   - Precise text selection (especially for the AI toolbar feature)
   - Formatting buttons competing for screen space with the keyboard
   - Losing context of what section they're editing

3. **No haptic feedback**: Modern mobile apps use subtle haptics for interactions (button taps, successful AI generation, swipe actions). This is a cheap way to make the app feel premium.

### Cognitive Overload

The `FormHome` screen shows 10+ sections (Personal Info, Work Experience, Education, Skills, Projects, Certifications, Hobbies, Strengths, References, Languages). This is overwhelming for first-time users.

**Fix**: Show only essential sections by default (Personal Info, Work Experience, Education, Skills). Move the rest to "Add Section" with descriptions of when each is useful.

The [AddSections](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/screens/ResumeEditor/screens/AddSections/) screen exists for this purpose — make it the default path for optional sections instead of showing everything upfront.

---

## PART 5 — PERFORMANCE & SCALABILITY

### 5.1 What Breaks First

#### Selector Re-render Storm (breaks now)

As described in 1.5, `selectActiveResume` returns a new reference on every call. This means:
- Every component using `useResumeStore(selectActiveResume)` re-renders on ANY store change
- Every component using derived selectors (e.g., `selectWork`) also re-renders because they depend on `selectActiveResume`
- When AI generates new bullet points, the entire editor re-renders, not just the work section

**Impact**: Noticeable jank during AI-assisted editing, especially on mid-range Android devices.

**Fix** (high priority):
```typescript
// Option 1: Use Record<string, Resume> instead of Resume[]
// Option 2: Use Zustand's shallow equality check
import { useShallow } from 'zustand/react/shallow';

const work = useResumeStore(
  useShallow((state) => selectWork(state))
);
```

#### WebView Memory Pressure (breaks at 5+ resumes open)

Each resume preview creates a WebView. WebViews are heavy (~30-50MB each on Android). If users switch between resumes without the previous WebViews being properly disposed, memory climbs.

**Fix**: Ensure WebViews are unmounted (not just hidden) when navigating away from preview. Use `React.lazy()` or conditional rendering for the preview screen.

#### Template HTML Generation on Main Thread (breaks with complex templates)

[useResumeHTML.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/hooks/useResumeHTML.ts) runs `getHTML(resumeData)` on the main JS thread. For a 27-section resume with a complex sidebar template, this can take 50-100ms — enough to cause frame drops during debounced re-renders.

**Fix**: Move HTML generation to `InteractionManager.runAfterInteractions()`:
```typescript
const generateHTML = useCallback(async (data, templateId) => {
  await InteractionManager.runAfterInteractions();
  const template = getTemplateById(templateId);
  return template.getHTML(data);
}, []);
```

### 5.2 AI Request Concurrency

Currently, nothing prevents multiple AI calls from firing simultaneously. Scenario:
1. User taps "Generate Bullet Points" for Work Item 1
2. While it's loading, user navigates to Work Item 2 and taps again
3. Two Gemini API calls are now in-flight concurrently
4. Both resolve and try to update different parts of the store

**Risks**:
- Race conditions in store updates
- Gemini rate limiting (free tier: 15 RPM for `gemini-2.0-flash`)
- Wasted tokens on abandoned results

**Fix**: Request queue with cancellation (see AIService design in 1.1).

### 5.3 Caching Strategy

**AI responses should be cached.** Identical inputs should not trigger new API calls:

```typescript
// Simple in-memory cache
const aiCache = new Map<string, { result: any; timestamp: number }>();

function getCacheKey(type: string, input: object): string {
  return `${type}:${JSON.stringify(input)}`;
}

// In AIService.execute():
const cacheKey = getCacheKey(request.type, request.input);
const cached = aiCache.get(cacheKey);
if (cached && Date.now() - cached.timestamp < 3600000) { // 1hr TTL
  return cached.result;
}
```

**AI responses should also be persisted** to AsyncStorage for cross-session reuse. When a user re-opens a resume, previously generated suggestions should still be available.

---

## PART 6 — MONETIZATION STRATEGY

> [!IMPORTANT]
> **Critical blocker**: You're currently shipping your Gemini API key in the app bundle. Anyone can decompile your APK, extract the key, and use it for their own purposes — or rack up charges on your account. **This must be fixed before launch**, regardless of monetization model.

### The API Key Problem

**Short-term fix (no backend needed)**:
- Use Google Cloud's **API key restrictions**: Restrict the key to your app's Android package name and SHA-1 fingerprint
- Set **per-key quotas** in Google Cloud Console (e.g., 1000 requests/day)
- This doesn't prevent extraction, but limits damage

**Medium-term fix (minimal backend)**:
- Deploy a simple proxy on Cloudflare Workers (free tier: 100K requests/day)
- The proxy holds the API key, validates requests (rate limiting per device ID), and forwards to Gemini
- Cost: $0/month on free tier, ~$5/month at scale
- This is the **minimum viable backend** and enables monetization enforcement

### Free Tier Strategy

Make these free (drives retention and word-of-mouth):
- ✅ Unlimited resume creation and editing
- ✅ All 27 templates
- ✅ Offline editing
- ✅ Rule-based writing analysis (Tier 1+2)
- ✅ Resume completeness score
- ✅ PDF export (with small "Made with HustryCV" watermark)
- ✅ AI Resume Coach (guided interview — 2 resumes)
- ✅ 5 AI generations per day (bullet points, summary, etc.)

### Premium Tier ($4.99/month or $29.99/year)

- ✅ Unlimited AI generations
- ✅ Floating AI toolbar (rewrite, shorten, expand, quantify)
- ✅ Job Description → Auto-Tailor
- ✅ AI Cover Letter generation
- ✅ LLM-based writing analysis (Tier 3)
- ✅ DOCX export
- ✅ No watermark on PDF
- ✅ Priority AI (faster model, longer outputs)
- ✅ Cloud backup (when backend is ready)

### Upgrade Triggers (When to Show the Paywall)

The best upgrade triggers are **moments of high motivation**:

1. **After the 5th free AI generation**: "You've used all free AI credits today. Upgrade for unlimited." (High conversion — user is actively engaged)
2. **After ATS analysis shows <70% score**: "Upgrade to auto-tailor your resume for this job." (Pain point trigger)
3. **During PDF export**: "Remove the HustryCV watermark with Premium." (Final step — user is committed)
4. **After AI Coach generates a great resume**: "Save unlimited AI-crafted resumes with Premium." (Delight trigger)

### AI Credit System (Alternative to Subscription)

If subscription feels too aggressive for your market:
- 10 free AI credits per day (each AI action = 1 credit)
- Purchase credits: 50 credits for $1.99, 200 credits for $4.99
- Daily free credits encourage daily engagement

### Analytics Events to Track

```typescript
// Funnel events
'onboarding_completed'
'first_resume_created'
'first_ai_feature_used'
'first_pdf_exported'
'upgrade_prompt_shown'
'upgrade_prompt_converted'

// AI engagement
'ai_bullet_generated'      // { section, wordCount, accepted: boolean }
'ai_summary_generated'     // { wordCount, accepted: boolean }
'ai_transform_used'        // { action, sectionType }
'ai_coach_started'         // { fromScreen }
'ai_coach_completed'       // { sectionsCompleted }
'ats_analysis_run'         // { score, keywordsFound }

// Retention
'resume_editing_session'   // { durationMs, sectionsEdited }
'template_changed'         // { fromTemplate, toTemplate }
'resume_shared'            // { method: 'pdf' | 'link' }
```

> [!WARNING]
> **Fix the PostHog bug first**: In [PostHog.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/analytics/posthog/PostHog.ts), `disabled: !__DEV__` means analytics are **disabled in production and enabled in development** — the exact opposite of what you want. Fix to `disabled: __DEV__`.

---

## PART 7 — FUTURE TECHNICAL ROADMAP

### Month 1-3: "AI-Native Foundation"

**Goal**: Launch with a differentiated AI experience that makes users say "this is not just another resume builder."

| Week | Task | Impact |
|------|------|--------|
| 1-2 | 🔴 **Fix critical bugs**: PostHog inverted logic, API key security (add restrictions + quotas), duplicate `RESUME_PARSE_PROMPT`, delete dead code (`resumeChatManager.ts`, `social.types.ts`, `prompts.ts`) | Foundation |
| 2-3 | **Refactor store selectors**: Switch `resumes: Resume[]` → `Record<string, Resume>`, add `useShallow`, fix `set: any` types | Performance |
| 3-4 | **Build AIService class**: Centralized AI layer with queue, retry, cancellation, caching | Architecture |
| 4-6 | **Build AI Resume Coach**: Chat-based guided interview → auto-generate resume. Use existing `chatParser.ts` patterns | 🔴 #1 feature |
| 6-8 | **Build rule-based writing analysis**: Passive voice, weak verbs, quantification prompts. TipTap decorations for underlines | Core differentiator |
| 8-10 | **Build floating AI toolbar**: Selection → shorten/expand/quantify/rewrite/ATS optimize | Premium feature |
| 10-12 | **Deploy Cloudflare Worker proxy**: Move API key server-side. Add rate limiting per device | Security + monetization enablement |

### Month 4-6: "Monetization & Polish"

| Week | Task | Impact |
|------|------|--------|
| 13-14 | **Implement premium tier**: In-app purchase (Google Play Billing), usage tracking, paywall screens | Revenue |
| 14-16 | **Job Description → Auto-Tailor**: Full flow with diff view, new resume variant creation | Premium feature |
| 16-18 | **AI Suggestion Chips**: Post-bullet completion suggestions | Engagement |
| 18-20 | **Template thumbnails**: Pre-rendered previews with user's actual data | UX polish |
| 20-22 | **DOCX export**: HTML → DOCX conversion (via backend or client-side library) | Premium feature |
| 22-24 | **Onboarding redesign**: Progressive disclosure, AI feature tour, contextual hints | Activation |

### "What I Would Refactor First If I Joined The Company"

**Day 1-3**: Fix the 3 critical bugs that would embarrass you in a code review:
1. PostHog `disabled: !__DEV__` (analytics broken in production)
2. `publications.type = 'awards'` bug in [resume.types.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/types/common/resume.types.ts)
3. Delete all dead code (`resumeChatManager.ts`, duplicate `prompts.ts`, commented-out `social.types.ts`, test code in `urlUtils.ts`)

**Week 1**: Refactor the Zustand store:
- `resumes: Resume[]` → `Record<string, Resume>` (eliminates O(n) find, fixes selector re-renders)
- `set: any` → proper typing on all slices
- Remove `as any` and `@ts-ignore`

**Week 2**: Build the `AIService` class:
- Single entry point for all AI calls
- Request queue with priority (user-initiated > background)
- Retry with exponential backoff
- Request cancellation via AbortController
- Response caching (in-memory + AsyncStorage)
- Usage tracking for future monetization

**Week 3-4**: Build the AI Resume Coach. This is the single highest-leverage feature because:
- It solves the blank page problem (the #1 reason users abandon resume builders)
- It exercises the entire AI pipeline end-to-end
- It generates organic sharing ("I built my resume by chatting with AI")
- It's a natural premium upgrade trigger ("Build unlimited resumes with AI Coach")

---

## APPENDIX: Critical Bugs Found

| Bug | Severity | File | Line | Fix |
|-----|----------|------|------|-----|
| PostHog analytics disabled in production | 🔴 Critical | [PostHog.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/analytics/posthog/PostHog.ts) | — | Change `disabled: !__DEV__` → `disabled: __DEV__` |
| `publications.type` set to `'awards'` | 🔴 Bug | [resume.types.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/types/common/resume.types.ts) | 91 | Change to `type: 'publications'` |
| API key shipped in app bundle | 🟡 Security | [apiKeys.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/apiKeys.ts) | — | Add API key restrictions + deploy proxy |
| Test code running at module level | 🟡 Medium | [urlUtils.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/urlUtils.ts) | — | Remove `console.log` test statements |
| Hardcoded changelog version | 🟡 Medium | [changelogUtils.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/changelogUtils.ts) | — | Derive from `package.json` or app version |
| Duplicate `RESUME_PARSE_PROMPT` | 🟡 Medium | [prompts.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/prompts.ts) | — | Delete `prompts.ts`, keep only `prompts/index.ts` |
| Dead code: `resumeChatManager.ts` | 🟡 Medium | [resumeChatManager.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/utils/ai/resumeChatManager.ts) | all | Delete entire file |
| Dead code: `social.types.ts` | 🟢 Low | [social.types.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/types/common/social.types.ts) | all | Delete entire file |
| Legacy unused styles | 🟢 Low | [resumeStyles.ts](file:///Users/kishantalekar/Desktop/CODE_PG/WEB/hustrycv/src/templates/styles/resumeStyles.ts) | — | Verify unused, then delete |

---

## Summary: The Honest Assessment

**What you've built well:**
- The template engine refactor (27 templates from config objects) is genuinely impressive
- The Zustand factory pattern (`createSectionSlice<T>`) is clean architecture
- The offline completeness scoring shows smart product thinking
- Sentry + PostHog + Storybook from day one shows engineering maturity

**What needs immediate attention:**
- API key security (before launch)
- PostHog inverted logic (you have zero production analytics)
- Store selector performance (re-render storm)

**What will differentiate you:**
- AI Resume Coach (guided interview) — your #1 feature to build
- Rule-based writing analysis — your "Grammarly for resumes" moat
- Mobile-first AI experience — most competitors are web-only

**What's NOT worth building now:**
- Ghost text / autocomplete (latency and cost prohibitive on mobile without backend)
- Semantic embeddings for ATS (needs backend, marginal improvement over keyword matching)
- Cloud sync (needs backend and auth, defer until PMF)
- DOCX export (nice-to-have, not a differentiator)

**The single most important insight:**
Your app currently presents as "fill in forms → AI generates text → preview." The transformation to "AI-native" means inverting this: **AI should be the primary interface, forms should be the fallback.** The AI Resume Coach feature embodies this inversion. Build it first.
